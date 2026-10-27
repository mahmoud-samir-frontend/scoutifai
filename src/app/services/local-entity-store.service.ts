import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ENTITY_DEFINITIONS } from '../models/generated/entity-metadata';
import { DocumentedEntity, DocumentedEntityName, EntityTypeMap } from '../models/generated/entities';
import { EntityDefinition, ValidationIssue } from '../models/entity-metadata.model';

export interface LocalQuery {
  search?: string;
  filters?: Record<string, unknown>;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface LocalPage<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable({ providedIn: 'root' })
export class LocalEntityStoreService {
  private readonly prefix = 'scoutifai:';
  private readonly changes = new BehaviorSubject<{ entity: DocumentedEntityName; action: string } | null>(null);
  readonly changes$ = this.changes.asObservable();

  definition(entity: DocumentedEntityName): EntityDefinition {
    return ENTITY_DEFINITIONS[entity];
  }

  list<K extends DocumentedEntityName>(entity: K, query: LocalQuery = {}): LocalPage<EntityTypeMap[K]> {
    let records = this.read<K>(entity);
    const definition = this.definition(entity);
    if (query.search) {
      const term = query.search.toLowerCase();
      const searchable = definition.fields.filter(field => field.list || field.filter).map(field => field.key);
      records = records.filter(record => searchable.some(key => String(record[key] ?? '').toLowerCase().includes(term)));
    }
    for (const [key, value] of Object.entries(query.filters || {})) {
      if (value !== '' && value !== null && value !== undefined) records = records.filter(record => record[key] === value);
    }
    if (query.sortBy) {
      const direction = query.sortDirection === 'desc' ? -1 : 1;
      const field = definition.fields.find(item => item.key === query.sortBy);
      records = [...records].sort((a, b) => this.compareValues(a[query.sortBy!], b[query.sortBy!], field?.type) * direction);
    }
    const page = Math.max(1, query.page || 1);
    const pageSize = Math.max(1, query.pageSize || 10);
    const start = (page - 1) * pageSize;
    return { data: records.slice(start, start + pageSize), total: records.length, page, pageSize };
  }

  get<K extends DocumentedEntityName>(entity: K, id: string): EntityTypeMap[K] | undefined {
    return this.read<K>(entity).find(record => record.id === id);
  }

  create<K extends DocumentedEntityName>(entity: K, values: Partial<EntityTypeMap[K]>): EntityTypeMap[K] {
    this.assertValid(entity, values);
    const now = new Date().toISOString();
    const record = { ...values, id: crypto.randomUUID(), createdAt: now, modifiedAt: now } as EntityTypeMap[K];
    const records = this.read<K>(entity);
    records.unshift(record);
    this.write(entity, records);
    this.changes.next({ entity, action: 'create' });
    return record;
  }

  update<K extends DocumentedEntityName>(entity: K, id: string, values: Partial<EntityTypeMap[K]>): EntityTypeMap[K] {
    const records = this.read<K>(entity);
    const index = records.findIndex(record => record.id === id);
    if (index < 0) throw new Error(`${entity} record ${id} was not found.`);
    const updated = { ...records[index], ...values, id, modifiedAt: new Date().toISOString() } as EntityTypeMap[K];
    this.assertValid(entity, updated);
    records[index] = updated;
    this.write(entity, records);
    this.changes.next({ entity, action: 'update' });
    return updated;
  }

  remove<K extends DocumentedEntityName>(entity: K, id: string): void {
    this.write(entity, this.read<K>(entity).filter(record => record.id !== id));
    this.changes.next({ entity, action: 'delete' });
  }

  seed<K extends DocumentedEntityName>(entity: K, records: EntityTypeMap[K][]): void {
    const existing = this.read<K>(entity);
    const incoming = new Map(records.map(record => [record.id, record]));
    const merged = existing.map(record => record.id.startsWith('demo-') && incoming.has(record.id) ? incoming.get(record.id)! : record);
    const existingIds = new Set(existing.map(record => record.id));
    merged.push(...records.filter(record => !existingIds.has(record.id)));
    if (records.length) this.write(entity, merged);
  }

  observe<K extends DocumentedEntityName>(entity: K): Observable<EntityTypeMap[K][]> {
    return new Observable(subscriber => {
      subscriber.next(this.read<K>(entity));
      const subscription = this.changes$.subscribe(change => {
        if (change?.entity === entity) subscriber.next(this.read<K>(entity));
      });
      return () => subscription.unsubscribe();
    });
  }

  validate<K extends DocumentedEntityName>(entity: K, values: Partial<EntityTypeMap[K]>): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    for (const field of this.definition(entity).fields.filter(item => item.edit)) {
      const value = values[field.key];
      const empty = value === undefined || value === null || value === '' || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.length === 0);
      if (field.required && empty) issues.push({ field: field.key, message: `${field.label} is required.` });
      if (!empty) {
        if (field.options?.length && !field.options.includes(String(value))) issues.push({ field: field.key, message: `${field.label} must be one of: ${field.options.join(', ')}.` });
        if ((field.type === 'int' || field.type === 'float') && Number.isNaN(Number(value))) issues.push({ field: field.key, message: `${field.label} must be numeric.` });
        if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(String(value))) issues.push({ field: field.key, message: `${field.label} must be a valid email.` });
      }
    }
    return issues;
  }

  reset(entity?: DocumentedEntityName): void {
    if (entity) localStorage.removeItem(this.key(entity));
    else Object.keys(ENTITY_DEFINITIONS).forEach(name => localStorage.removeItem(this.key(name as DocumentedEntityName)));
  }

  private assertValid<K extends DocumentedEntityName>(entity: K, values: Partial<EntityTypeMap[K]>): void {
    const issues = this.validate(entity, values);
    if (issues.length) throw new Error(issues.map(issue => issue.message).join(' '));
  }

  private read<K extends DocumentedEntityName>(entity: K): EntityTypeMap[K][] {
    try { return JSON.parse(localStorage.getItem(this.key(entity)) || '[]') as EntityTypeMap[K][]; }
    catch { return []; }
  }

  private write<K extends DocumentedEntityName>(entity: K, records: EntityTypeMap[K][]): void {
    localStorage.setItem(this.key(entity), JSON.stringify(records));
  }

  private compareValues(left: unknown, right: unknown, type?: string): number {
    if (left === right) return 0;
    if (left === null || left === undefined || left === '') return 1;
    if (right === null || right === undefined || right === '') return -1;
    if (type === 'int' || type === 'float') return Number(left) - Number(right);
    if (type === 'date' || type === 'datetime') return new Date(String(left)).getTime() - new Date(String(right)).getTime();
    if (type === 'bool') return Number(Boolean(left)) - Number(Boolean(right));
    return String(left).localeCompare(String(right), undefined, { numeric: true, sensitivity: 'base' });
  }

  private key(entity: DocumentedEntityName): string { return `${this.prefix}${entity}`; }
}
