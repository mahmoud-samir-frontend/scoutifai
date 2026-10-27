export type DocumentedFieldType =
  | 'bool' | 'date' | 'datetime' | 'email' | 'enum' | 'file' | 'float'
  | 'image' | 'int' | 'jsonObject' | 'link' | 'linkMultiple' | 'phone'
  | 'text' | 'url' | 'varchar';

export interface EntityFieldDefinition {
  key: string;
  label: string;
  type: DocumentedFieldType;
  required: boolean;
  linkedEntity?: string;
  options?: string[];
  list: boolean;
  detail: boolean;
  edit: boolean;
  filter: boolean;
  notes?: string;
}

export interface EntityDefinition {
  name: string;
  label: string;
  fields: EntityFieldDefinition[];
}

export interface ValidationIssue {
  field: string;
  message: string;
}
