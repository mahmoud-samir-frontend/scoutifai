import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppHeaderComponent } from '../../../shared/components/app-header/app-header.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import {
  EntityDefinition,
  EntityFieldDefinition,
  ValidationIssue,
} from '../../../models/entity-metadata.model';
import {
  DocumentedEntity,
  DocumentedEntityName,
} from '../../../models/generated/entities';
import { ENTITY_DEFINITIONS } from '../../../models/generated/entity-metadata';
import { LocalEntityStoreService } from '../../../services/local-entity-store.service';
import { PermissionService } from '../../../services/permission.service';
import { LocalCustomActionsService } from '../../../services/local-custom-actions.service';
import { AuthService } from '../../../services/auth.service';
import { PageSearchService } from '../../../services/page-search.service';
import { DataModeService } from '../../../services/data-mode.service';
import { SportsApi, SportsUserType } from '../../../services/api';
import { LanguageService } from '../../../services/language.service';
import { AppIconComponent } from '../../../shared/components/app-icon/app-icon.component';

@Component({
  selector: 'app-entity-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, AppHeaderComponent, SidebarComponent, AppIconComponent],
  templateUrl: './entity-crud.component.html',
  styleUrl: './entity-crud.component.scss',
})
export class EntityCrudComponent implements OnInit, OnDestroy {
  private readonly userAccountFields: EntityFieldDefinition[] = [
    {
      key: 'firstName',
      label: 'First Name',
      type: 'varchar',
      required: false,
      list: false,
      detail: true,
      edit: true,
      filter: false,
    },
    {
      key: 'lastName',
      label: 'Last Name',
      type: 'varchar',
      required: false,
      list: false,
      detail: true,
      edit: true,
      filter: false,
    },
    {
      key: 'userName',
      label: 'Username',
      type: 'varchar',
      required: true,
      list: true,
      detail: true,
      edit: true,
      filter: true,
    },
    {
      key: 'emailAddress',
      label: 'Login Email',
      type: 'email',
      required: false,
      list: true,
      detail: true,
      edit: true,
      filter: true,
    },
    {
      key: 'loginPassword',
      label: 'Login Password',
      type: 'varchar',
      required: false,
      list: false,
      detail: false,
      edit: true,
      filter: false,
    },
  ];
  @Input() fixedEntity?: DocumentedEntityName;
  @Input() fixedUserType?: SportsUserType;
  @Input() entityLabel?: string;
  @Input() permissionEntity?: DocumentedEntityName;
  entity!: DocumentedEntityName;
  definition!: EntityDefinition;
  records: DocumentedEntity[] = [];
  total = 0;
  page = 1;
  pageSize = 10;
  search = '';
  sortBy = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  filters: Record<string, unknown> = {};
  dialog: '' | 'create' | 'edit' | 'detail' = '';
  form: Record<string, any> = {};
  selected?: DocumentedEntity;
  issues: ValidationIssue[] = [];
  toast = '';
  sidebarCollapsed = localStorage.getItem('sidebar_collapsed') === 'true';
  linkOptions: Record<string, DocumentedEntity[]> = {};
  private sub?: Subscription;
  private searchSub?: Subscription;
  loading = false;
  videoUpload?: { name: string; type: string; contents: string };
  videoFileReading = false;
  showLoginPassword = false;
  deleteTarget?: DocumentedEntity;
  deleting = false;
  loadingRecordId = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public store: LocalEntityStoreService,
    public permission: PermissionService,
    private actions: LocalCustomActionsService,
    private auth: AuthService,
    private pageSearch: PageSearchService,
    private dataMode: DataModeService,
    private api: SportsApi,
    public language: LanguageService
  ) {}
  ngOnInit() {
    this.searchSub = this.pageSearch.changes.subscribe((value) => {
      this.search = value;
      this.page = 1;
      this.load();
    });
    if (this.fixedEntity) {
      this.activateEntity(this.fixedEntity);
      return;
    }
    this.sub = this.route.paramMap.subscribe((params) =>
      this.activateEntity(params.get('entity') as DocumentedEntityName)
    );
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.searchSub?.unsubscribe();
  }
  get listFields() {
    const hiddenTableFields = new Set([
      'user',
      'parentUser',
      'assignedUser',
      'createdBy',
      'modifiedBy',
      'code',
    ]);
    return this.visibleFields
      .filter(
        (field) =>
          field.list &&
          !hiddenTableFields.has(field.key) &&
          !/Ids?$/i.test(field.key)
      )
      .slice(0, 9);
  }
  get filterFields() {
    return this.definition.fields
      .filter((f) => f.filter && !['createdAt', 'modifiedAt'].includes(f.key))
      .slice(0, 5);
  }
  get editFields() {
    return this.visibleFields.filter(
      (f) =>
        f.edit &&
        !['createdAt', 'modifiedAt', 'createdBy', 'modifiedBy'].includes(f.key)
    );
  }
  get formFields() {
    return this.editFields.filter(
      (field) =>
        !this.isContextField(field) &&
        !(
          this.dialog === 'create' &&
          this.usesFixedCreateUserType &&
          field.key === 'userTypes'
        )
    );
  }
  linkSelected(fieldKey: string, id: string) {
    return (
      Array.isArray(this.form[fieldKey]) && this.form[fieldKey].includes(id)
    );
  }
  toggleLinkedOption(fieldKey: string, id: string, checked: boolean) {
    const values = Array.isArray(this.form[fieldKey])
      ? [...this.form[fieldKey]]
      : [];
    this.form[fieldKey] = checked
      ? [...new Set([...values, id])]
      : values.filter((value) => value !== id);
  }
  onFieldChange(field: EntityFieldDefinition) {
    if (this.createsUserAccount && field.key === 'userTypes') {
      this.loadLinks();
    }
  }
  get detailFields() {
    return this.visibleFields.filter((f) => f.detail);
  }
  get pageCount() {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }
  get canCreate() {
    return this.permission.canCreate(this.permissionEntity || this.entity);
  }
  get canEdit() {
    return this.permission.canEdit(this.permissionEntity || this.entity);
  }
  get canDelete() {
    return this.permission.canDelete(this.permissionEntity || this.entity);
  }
  load() {
    const query = {
      search: this.search,
      filters: this.filters,
      sortBy: this.sortBy,
      sortDirection: this.sortDirection,
      page: this.page,
      pageSize: this.pageSize,
    };
    if (this.dataMode.mode() === 'live') {
      this.loading = true;
      const request = this.listUserType
        ? this.api.listSportsUsers(this.listUserType, query)
        : this.api.list(this.entity, query);
      request.subscribe({
        next: (result) => {
          this.records = result.data;
          this.total = result.total;
        },
        error: () => this.notify('Live API request failed.'),
        complete: () => (this.loading = false),
      });
      return;
    }
    const result = this.store.list(this.entity, query);
    this.records = result.data;
    this.total = result.total;
  }
  sort(field: EntityFieldDefinition) {
    if (this.sortBy === field.key)
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    else {
      this.sortBy = field.key;
      this.sortDirection = 'asc';
    }
    this.load();
  }
  setPage(page: number) {
    this.page = Math.max(1, Math.min(this.pageCount, page));
    this.load();
  }
  resetFilters() {
    this.search = '';
    this.filters = {};
    for (const field of this.filterFields) this.filters[field.key] = '';
    this.page = 1;
    this.load();
  }
  openCreate() {
    if (!this.canCreate) return;
    this.selected = undefined;
    this.videoUpload = undefined;
    this.showLoginPassword = false;
    this.form = {};
    this.dialog = 'create';
    if (this.createsUserAccount)
      this.form['userTypes'] = this.defaultCreateUserType;
    for (const field of this.editFields) {
      if (field.type === 'bool') this.form[field.key] = false;
      else if (
        field.options?.length &&
        this.form[field.key] === undefined
      )
        this.form[field.key] = field.options[0];
    }
    if (this.createsUserAccount) this.form['sportsStatus'] = 'Active';
    this.applyUserContext();
    this.issues = [];
  }
  openEdit(record: DocumentedEntity) {
    if (!this.canEdit) return;
    if (this.dataMode.mode() === 'live' && this.isUserDirectoryEntity) {
      this.loadingRecordId = record.id;
      this.api.getUserById(record.id).subscribe({
        next: (user) => this.showEditDialog(user),
        error: (error) => {
          this.loadingRecordId = '';
          this.notify(
            error?.error?.message || 'User details could not be loaded.'
          );
        },
        complete: () => (this.loadingRecordId = ''),
      });
      return;
    }
    this.showEditDialog(record);
  }
  private showEditDialog(record: DocumentedEntity) {
    this.selected = record;
    this.videoUpload = undefined;
    this.showLoginPassword = false;
    this.form = { ...record };
    this.applyUserContext();
    this.issues = [];
    this.dialog = 'edit';
  }
  openDetail(record: DocumentedEntity) {
    this.selected = record;
    this.dialog = 'detail';
  }
  submit() {
    const editing = this.dialog === 'edit' && Boolean(this.selected);
    if (
      (editing && !this.canEdit) ||
      (!editing && !this.canCreate)
    ) {
      this.dialog = '';
      this.notify('You do not have permission for this action.');
      return;
    }
    if (this.videoFileReading) {
      this.notify('Please wait for the video file to finish loading.');
      return;
    }
    this.applyUserContext();
    const userAccountCreation = this.createsUserAccount;
    this.issues = this.store.validate(
      userAccountCreation ? 'User' : this.entity,
      this.form
    );
    for (const field of this.formFields) {
      const value = this.form[field.key];
      if (
        this.isRequired(field) &&
        (value === '' || value === null || value === undefined ||
          (Array.isArray(value) && !value.length)) &&
        !this.issues.some((issue) => issue.field === field.key)
      )
        this.issues.push({field: field.key, message: 'This field is required.'});
    }
    if (userAccountCreation) {
      if (!editing) {
        for (const key of ['userName', 'userTypes', 'loginPassword']) {
          if (
            !String(this.form[key] || '').trim() &&
            !this.issues.some((issue) => issue.field === key)
          ) {
            this.issues.push({
              field: key,
              message: 'This field is required.',
            });
          }
        }
      }
      const userName = String(this.form['userName'] || '').trim();
      if (userName && !/^[A-Za-z0-9._@ -]+$/.test(userName)) {
        this.issues.push({
          field: 'userName',
          message:
            'Username can only contain letters, numbers, spaces, dots, dashes, underscores and @.',
        });
      }
      this.form['userName'] = userName;
    }
    if (this.issues.length) {
      this.notify('Please correct the highlighted fields.');
      setTimeout(() =>
        document
          .querySelector<HTMLElement>('.modal-card .field-invalid')
          ?.focus()
      );
      return;
    }
    if (this.dataMode.mode() === 'live') {
      // Keep managed context fields (such as the logged-in user's organization)
      // in the payload even when they are hidden from the form.
      const allowedKeys = new Set(this.editFields.map((field) => field.key));
      const values = userAccountCreation
        ? Object.fromEntries(
            Object.entries(this.form).filter(([key]) => allowedKeys.has(key))
          )
        : { ...this.form };
      if (this.entity === 'SportsVideo') delete values['videoFile'];
      if (userAccountCreation) {
        const password = String(values['loginPassword'] || '');
        delete values['loginPassword'];
        if (password) values['password'] = password;
      }
      const selfWellness =
        !editing &&
        this.entity === 'PlayerWellness' &&
        this.auth.currentUser.role === 'Player';
      const request = selfWellness
        ? this.api.submitSelfWellness(this.withoutManagedContext(values))
        : editing && this.selected
        ? userAccountCreation
          ? this.api.updateUser(this.selected.id, values)
          : this.api.update(this.entity, this.selected.id, values)
        : this.api.create(userAccountCreation ? 'User' : this.entity, values);
      request.subscribe({
        next: (saved: any) => {
          const id = saved?.id || this.selected?.id;
          if (this.entity === 'SportsVideo' && this.videoUpload && id) {
            this.api
              .uploadVideoFile(
                id,
                this.videoUpload.name,
                this.videoUpload.type,
                this.videoUpload.contents,
                this.form['durationSeconds']
              )
              .subscribe({
                next: () =>
                  this.finishSave(editing, ' Video uploaded and ready.'),
                error: (error) =>
                  this.notify(
                    error?.error?.message ||
                      'Video record was saved, but the file upload failed.'
                  ),
              });
            return;
          }
          this.finishSave(editing);
        },
        error: (error) =>
          this.notify(
            error?.error?.message || 'Live record could not be saved.'
          ),
      });
      return;
    }
    try {
      if (editing && this.selected)
        this.store.update(
          this.entity as any,
          this.selected.id,
          this.form as any
        );
      else if (
        this.entity === 'PlayerWellness' &&
        this.auth.currentUser.role === 'Player'
      )
        this.actions.submitOwnWellness(this.form);
      else this.store.create(this.entity as any, this.form as any);
      this.dialog = '';
      this.load();
      this.notify(
        `${this.definition.label} ${
          editing ? 'updated' : 'created'
        } successfully.`
      );
      this.selected = undefined;
    } catch (error) {
      this.notify(
        error instanceof Error ? error.message : 'Record could not be saved.'
      );
    }
  }
  onVideoFileSelected(event: Event) {
    const input = event.target as HTMLInputElement,
      file = input.files?.[0];
    this.videoUpload = undefined;
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      input.value = '';
      this.notify('Please select a valid video file.');
      return;
    }
    this.videoFileReading = true;
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      const duration = video.duration;
      URL.revokeObjectURL(video.src);
      if (!Number.isFinite(duration) || duration <= 0) {
        input.value = '';
        this.videoFileReading = false;
        this.notify('The video duration could not be detected.');
        return;
      }
      if (duration > 60.05) {
        input.value = '';
        this.videoFileReading = false;
        this.notify('Video must be one minute or shorter.');
        return;
      }
      this.form['durationSeconds'] = Math.ceil(duration);
      const reader = new FileReader();
      reader.onload = () => {
        const value = String(reader.result || '');
        this.videoUpload = {
          name: file.name,
          type: file.type || 'application/octet-stream',
          contents: value.includes(',') ? value.split(',')[1] : value,
        };
        this.videoFileReading = false;
      };
      reader.onerror = () => {
        this.videoFileReading = false;
        this.notify('The selected video file could not be read.');
      };
      reader.readAsDataURL(file);
    };
    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      input.value = '';
      this.videoFileReading = false;
      this.notify('The selected video is not valid.');
    };
    video.src = URL.createObjectURL(file);
  }
  remove(record: DocumentedEntity) {
    if (this.canDelete) this.deleteTarget = record;
  }
  confirmDelete() {
    const record = this.deleteTarget;
    if (!record || !this.canDelete) return;
    this.deleting = true;
    if (this.dataMode.mode() === 'live') {
      this.api.remove(this.isUserDirectoryEntity ? 'User' : this.entity, record.id).subscribe({
        next: () => {
          this.deleteTarget = undefined;
          this.load();
          this.notify(`${this.definition.label} deleted.`);
        },
        error: () => this.notify('Live record could not be deleted.'),
        complete: () => (this.deleting = false),
      });
      return;
    }
    this.store.remove(this.entity as any, record.id);
    this.deleteTarget = undefined;
    this.deleting = false;
    this.load();
    this.notify(`${this.definition.label} deleted.`);
  }
  isRequired(field: EntityFieldDefinition) {
    if (this.dialog === 'create' && this.createsUserAccount) {
      const commonRequired = [
        'firstName',
        'lastName',
        'userName',
        'emailAddress',
        'loginPassword',
        'userTypes',
        'organization',
        'sport',
      ];
      const roleRequired: Record<string, string[]> = {
        Player: ['heightCm', 'weightKg'],
        Coach: ['coachType'],
        FitnessCoach: ['coachType', 'experienceYears'],
        Doctor: ['specialization'],
        Physiotherapist: ['specialization'],
        Nutritionist: ['specialization'],
        Parent: ['linkedPlayers'],
        TeamManager: ['assignedSportsTeams'],
      };
      const role = String(this.form['userTypes'] || this.defaultCreateUserType);
      if (
        commonRequired.includes(field.key) ||
        (roleRequired[role] || []).includes(field.key)
      )
        return true;
      if (field.key === 'club') return false;
    }
    return (
      field.required ||
      (this.entity === 'User' &&
        this.dialog === 'create' &&
        ['userTypes', 'loginPassword'].includes(field.key))
    );
  }
  provisionLogin() {
    if (
      !this.selected ||
      !['SportsPlayer', 'SportsCoach', 'SportsStaff'].includes(this.entity)
    )
      return;
    if (this.dataMode.mode() === 'live') {
      this.api
        .createLoginAccount(
          this.entity as 'SportsPlayer' | 'SportsCoach' | 'SportsStaff',
          this.selected.id
        )
        .subscribe({
          next: (result: any) =>
            this.notify(
              `Login created.${
                result?.temporaryPassword
                  ? ' Temporary password: ' + result.temporaryPassword
                  : ''
              }`
            ),
          error: () => this.notify('Login account could not be created.'),
        });
      return;
    }
    const result = this.actions.createLoginAccount(
      this.entity as 'SportsPlayer' | 'SportsCoach' | 'SportsStaff',
      this.selected.id
    );
    this.notify(
      `Login created. Temporary password: ${result.temporaryPassword}`
    );
  }
  addComment() {
    if (!this.selected) return;
    const comment = prompt('Video comment');
    if (!comment) return;
    if (this.dataMode.mode() === 'live') {
      this.api.addVideoComment(this.selected.id, { comment }).subscribe({
        next: () => this.notify('Video comment added.'),
        error: () => this.notify('Video comment could not be added.'),
      });
      return;
    }
    this.actions.addVideoComment(this.selected.id, comment);
    this.notify('Video comment added locally.');
  }
  generateAttendance() {
    if (!this.selected) return;
    if (this.dataMode.mode() === 'live') {
      this.api
        .list('TrainingSession', {
          filters: { team: this.selected.id },
          pageSize: 1,
        })
        .subscribe({
          next: (result) => {
            const session = result.data[0];
            if (!session) {
              this.notify('Create a training session for this team first.');
              return;
            }
            this.api
              .generateAttendance(this.selected!.id, session.id)
              .subscribe({
                next: () => this.notify('Attendance records generated.'),
                error: () => this.notify('Attendance could not be generated.'),
              });
          },
          error: () => this.notify('Training sessions could not be loaded.'),
        });
      return;
    }
    const session = this.store.list('TrainingSession', {
      filters: { team: this.selected.id },
      pageSize: 1,
    }).data[0];
    if (!session)
      return this.notify('Create a training session for this team first.');
    const count = this.actions.generateAttendance(this.selected.id, session.id);
    this.notify(`${count} attendance record(s) generated.`);
  }
  issue(field: string) {
    return this.issues.find((i) => i.field === field)?.message;
  }
  display(field: EntityFieldDefinition, value: unknown) {
    if (value === null || value === undefined || value === '') return '—';
    if (field.type === 'bool') return this.language.t(value ? 'Yes' : 'No');
    if (field.type === 'link') {
      const linked = this.linkOptions[field.key]?.find((r) => r.id === value);
      return linked?.['name'] || value;
    }
    if (Array.isArray(value))
      return value.map((item) => this.language.t(String(item))).join(', ');
    if (typeof value === 'object') return JSON.stringify(value);
    return this.language.t(String(value));
  }
  trackById(_: number, item: DocumentedEntity) {
    return item.id;
  }
  private loadLinks() {
    this.linkOptions = {};
    for (const field of this.visibleFields.filter((f) => f.linkedEntity)) {
      const linked = field.linkedEntity as DocumentedEntityName;
      if (!ENTITY_DEFINITIONS[linked] || !this.permission.canView(linked))
        continue;
      const roleByField: Record<string, string> = {
        player: 'Player',
        assignedPlayers: 'Player',
        coach: 'Coach',
        headCoach: 'Coach',
        assistantCoaches: 'Coach',
        doctor: 'Doctor',
        parentUser: 'Parent',
        linkedPlayers: 'Player',
      };
      const userType =
        field.key === 'user' && this.isPlayerSubjectEntity()
          ? 'Player'
          : roleByField[field.key] || '';
      if (this.dataMode.mode() === 'live')
        (userType && linked === 'User'
          ? this.api.listSportsUsers(userType as SportsUserType, { pageSize: 100 })
          : this.api.list(linked, { pageSize: 100 })
        ).subscribe({
          next: (result) => (this.linkOptions[field.key] = result.data),
          error: () => (this.linkOptions[field.key] = []),
        });
      else
        this.linkOptions[field.key] = this.store.list(linked, {
          pageSize: 1000,
          filters: userType && linked === 'User' ? { userTypes: userType } : {},
        }).data;
    }
  }
  private isPlayerSubjectEntity() {
    return [
      'MatchPlayerStatistic',
      'PlayerEvaluation',
      'PlayerInjury',
      'PlayerMeasurement',
      'PlayerTask',
      'PlayerTestResult',
      'PlayerVideoLink',
      'PlayerWellness',
      'RehabilitationPlan',
      'RehabilitationSession',
      'TrainingAttendance',
    ].includes(this.entity);
  }
  private isContextField(field: EntityFieldDefinition) {
    if (field.key === 'player' && this.isPlayerSubjectEntity()) return true;
    const user = this.auth.currentUser;
    if (user.role === 'Player' && field.key === 'user' && Boolean(user.id))
      return true;
    if (
      !['SuperAdmin', 'OrganizationAdmin', 'ClubAdmin'].includes(user.role) &&
      field.key === 'organization' &&
      Boolean(user.organizationId)
    )
      return true;
    if (user.role === 'Player' && field.key === 'team' && Boolean(user.teamId))
      return true;
    return false;
  }
  private applyUserContext() {
    const user = this.auth.currentUser;
    if (
      user.role === 'Player' &&
      user.id &&
      this.definition.fields.some((field) => field.key === 'user')
    )
      this.form['user'] = user.id;
    if (
      user.role === 'Player' &&
      user.playerId &&
      this.definition.fields.some((field) => field.key === 'player')
    )
      this.form['player'] = user.playerId;
    if (
      !['SuperAdmin', 'OrganizationAdmin', 'ClubAdmin'].includes(user.role) &&
      user.organizationId &&
      this.definition.fields.some((field) => field.key === 'organization')
    )
      this.form['organization'] = user.organizationId;
    if (
      user.role === 'Player' &&
      user.teamId &&
      this.definition.fields.some((field) => field.key === 'team')
    )
      this.form['team'] = user.teamId;
  }
  private withoutManagedContext(values: Record<string, unknown>) {
    const result = { ...values };
    delete result['user'];
    delete result['player'];
    delete result['organization'];
    delete result['team'];
    return result;
  }
  private get visibleFields() {
    if (this.createsUserAccount) {
      const conciseKeys = new Set([
        'userTypes',
        'organization',
        'club',
        'sport',
        'sportsStatus',
      ]);
      const role = String(
        this.form['userTypes'] ||
          this.selected?.['userTypes'] ||
          this.defaultCreateUserType
      );
      const roleFields: Record<string, string[]> = {
        Player: [
          'birthDate',
          'nationality',
          'sport',
          'primaryPosition',
          'preferredFoot',
          'heightCm',
          'weightKg',
          'playerNumber',
          'publicProfileEnabled',
        ],
        Coach: [
          'sport',
          'coachType',
          'licenseNumber',
          'licenseLevel',
          'experienceYears',
          'assignedSportsTeams',
          'specialization',
        ],
        FitnessCoach: [
          'sport',
          'coachType',
          'licenseNumber',
          'licenseLevel',
          'experienceYears',
          'assignedSportsTeams',
          'specialization',
          'fitnessInformation',
        ],
        Doctor: [
          'sport',
          'assignedSportsTeams',
          'specialization',
          'licenseNumber',
        ],
        Physiotherapist: [
          'sport',
          'assignedSportsTeams',
          'specialization',
          'licenseNumber',
          'fitnessInformation',
        ],
        Parent: ['linkedPlayers'],
        Scout: [
          'sport',
          'assignedSportsTeams',
          'specialization',
          'scoutInformation',
        ],
        TeamManager: ['assignedSportsTeams'],
        DataAnalyst: ['sport', 'assignedSportsTeams', 'specialization'],
        Nutritionist: ['assignedSportsTeams', 'specialization'],
      };
      const visibleKeys = new Set([
        ...conciseKeys,
        ...(roleFields[role] || []),
      ]);
      return [
        ...this.userAccountFields,
        ...ENTITY_DEFINITIONS['User'].fields
          .filter((field) => visibleKeys.has(field.key)),
      ];
    }
    if (this.entity !== 'SportsPlayer') return this.definition.fields;
    const publicProfileIndex = this.definition.fields.findIndex(
      (field) => field.key === 'publicProfileEnabled'
    );
    const hiddenKeys = new Set([
      'firstName',
      'lastName',
      'secondaryPositions',
      'profilePhoto',
    ]);
    return this.definition.fields.filter(
      (field, index) =>
        !hiddenKeys.has(field.key) &&
        (publicProfileIndex < 0 || index < publicProfileIndex)
    );
  }
  private get createsUserAccount() {
    return (
      this.entity === 'User' ||
      (this.dataMode.mode() === 'live' && Boolean(this.listUserType)) ||
      (this.dialog === 'create' &&
        ['SportsPlayer', 'SportsCoach', 'SportsStaff'].includes(this.entity))
    );
  }
  private get defaultCreateUserType() {
    if (this.fixedUserType) return this.fixedUserType;
    if (this.entity === 'SportsCoach') return 'Coach';
    if (this.entity === 'SportsStaff') return 'Doctor';
    return 'Player';
  }
  private get listUserType(): SportsUserType | undefined {
    if (this.fixedUserType) return this.fixedUserType;
    if (this.entity === 'SportsPlayer') return 'Player';
    if (this.entity === 'SportsCoach') return 'Coach';
    if (this.entity === 'SportsStaff') return 'Doctor';
    return undefined;
  }
  private get isUserDirectoryEntity() {
    return Boolean(this.listUserType) || this.entity === 'User';
  }
  private get usesFixedCreateUserType() {
    return (
      this.dialog === 'create' &&
      (Boolean(this.fixedUserType) ||
        ['SportsPlayer', 'SportsCoach', 'SportsStaff'].includes(this.entity))
    );
  }
  private activateEntity(entity: DocumentedEntityName) {
    if (
      !ENTITY_DEFINITIONS[entity] ||
      !this.permission.canView(this.permissionEntity || entity)
    ) {
      this.router.navigateByUrl(this.permission.firstAccessiblePath(), {
        replaceUrl: true,
      });
      return;
    }
    this.entity = entity;
    this.definition = this.entityLabel
      ? { ...ENTITY_DEFINITIONS[entity], label: this.entityLabel }
      : ENTITY_DEFINITIONS[entity];
    this.page = 1;
    this.filters = {};
    this.loadLinks();
    this.load();
  }
  private notify(message: string) {
    this.toast = message;
    setTimeout(() => (this.toast = ''), 2400);
  }
  private finishSave(editing: boolean, suffix = '') {
    this.dialog = '';
    this.selected = undefined;
    this.videoUpload = undefined;
    this.load();
    this.notify(
      `${this.definition.label} ${
        editing ? 'updated' : 'created'
      } successfully.${suffix}`
    );
  }
}
