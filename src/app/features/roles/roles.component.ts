import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppHeaderComponent } from '../../shared/components/app-header/app-header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ENTITY_METADATA } from '../../models/generated/entity-metadata';
import { DataModeService } from '../../services/data-mode.service';
import { SportsApi, SportsRolePayload } from '../../services/api';

interface RoleRecord extends SportsRolePayload {
  id: string;
}
interface UserRecord {
  id: string;
  name?: string;
  userName?: string;
  userTypes?: string;
}
type PermissionLevel = 'all' | 'team' | 'own' | 'no';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule, AppHeaderComponent, SidebarComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent implements OnInit {
  roles: RoleRecord[] = [];
  users: UserRecord[] = [];
  search = '';
  loading = false;
  toast = '';
  sidebarCollapsed = localStorage.getItem('sidebar_collapsed') === 'true';
  roleDialog = false;
  assignDialog = false;
  deleteTarget?: RoleRecord;
  editingId = '';
  roleName = '';
  permissionData: Record<string, Record<string, string>> = {};
  selectedPreset: '' | 'read' | 'manage' | 'clear' = '';
  selectedUserId = '';
  selectedUserType = 'Coach';
  selectedRoleIds: string[] = [];
  readonly entities = ENTITY_METADATA.filter(
    (item) =>
      !['VideoClip', 'VideoComment', 'VideoTimelineTag'].includes(item.name)
  ).map((item) => ({ name: item.name, label: item.label }));
  readonly levels: { value: PermissionLevel; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'team', label: 'Team' },
    { value: 'own', label: 'Own' },
    { value: 'no', label: 'No access' },
  ];
  readonly userTypes = [
    'Player',
    'Coach',
    'Doctor',
    'Parent',
    'Scout',
    'TeamManager',
    'FitnessCoach',
    'Physiotherapist',
    'ClubAdmin',
    'OrganizationAdmin',
    'SuperAdmin',
    'DataAnalyst',
  ];
  private readonly demoRolesKey = 'sports_demo_roles';
  private readonly demoAssignmentsKey = 'sports_demo_role_assignments';
  constructor(public dataMode: DataModeService, private api: SportsApi) {}
  ngOnInit() {
    this.load();
  }
  get filteredRoles() {
    const q = this.search.trim().toLowerCase();
    return q
      ? this.roles.filter((role) => role.name.toLowerCase().includes(q))
      : this.roles;
  }
  load() {
    if (this.dataMode.mode() === 'live') {
      this.loading = true;
      this.api
        .listRoles({ maxSize: 100, q: this.search || undefined })
        .subscribe({
          next: (result) => (this.roles = (result.list || []) as RoleRecord[]),
          error: () =>
            this.notify(
              'Roles could not be loaded. Check role read permission.'
            ),
          complete: () => (this.loading = false),
        });
      return;
    }
    const saved = localStorage.getItem(this.demoRolesKey);
    this.roles = saved ? JSON.parse(saved) : this.defaultDemoRoles();
    if (!saved) this.saveDemoRoles();
  }
  openCreate() {
    this.editingId = '';
    this.roleName = '';
    this.permissionData = {};
    this.selectedPreset = 'clear';
    this.roleDialog = true;
  }
  openEdit(role: RoleRecord) {
    this.editingId = role.id;
    this.roleName = role.name;
    this.permissionData = structuredClone(role.data || {}) as Record<
      string,
      Record<string, string>
    >;
    this.selectedPreset = this.detectPreset();
    this.roleDialog = true;
  }
  permission(entity: string, action: string) {
    return this.permissionData[entity]?.[action] || 'no';
  }
  setPermission(entity: string, action: string, value: string) {
    this.permissionData[entity] ??= {};
    this.permissionData[entity][action] = value;
    this.selectedPreset = this.detectPreset();
  }
  applyPreset(preset: 'read' | 'manage' | 'clear') {
    this.selectedPreset = preset;
    for (const entity of this.entities) {
      this.permissionData[entity.name] = {
        read: preset === 'clear' ? 'no' : 'all',
        stream: preset === 'clear' ? 'no' : 'all',
        edit: preset === 'manage' ? 'all' : 'no',
        delete: preset === 'manage' ? 'all' : 'no',
        create: preset === 'manage' ? 'yes' : 'no',
      };
    }
  }
  saveRole() {
    if (!this.roleName.trim()) {
      this.notify('Role name is required.');
      return;
    }
    const body: SportsRolePayload = {
      name: this.roleName.trim(),
      data: this.permissionData,
      fieldData: {},
      assignmentPermission: 'no',
      userPermission: 'no',
      exportPermission: 'no',
      massUpdatePermission: 'no',
    };
    if (this.dataMode.mode() === 'live') {
      const request = this.editingId
        ? this.api.updateRole(this.editingId, body)
        : this.api.createRole(body);
      request.subscribe({
        next: () => {
          this.roleDialog = false;
          this.load();
          this.notify(this.editingId ? 'Role updated.' : 'Role created.');
        },
        error: (error) =>
          this.notify(error?.error?.message || 'Role could not be saved.'),
      });
      return;
    }
    if (this.editingId) {
      const index = this.roles.findIndex((role) => role.id === this.editingId);
      if (index >= 0) this.roles[index] = { id: this.editingId, ...body };
    } else this.roles.unshift({ id: `demo-role-${Date.now()}`, ...body });
    this.saveDemoRoles();
    this.roleDialog = false;
    this.notify(this.editingId ? 'Role updated.' : 'Role created.');
  }
  removeRole(role: RoleRecord) {
    this.deleteTarget = role;
  }
  confirmRoleDelete() {
    const role = this.deleteTarget;
    if (!role) return;
    if (this.dataMode.mode() === 'live') {
      this.api.deleteRole(role.id).subscribe({
        next: () => {
          this.deleteTarget = undefined;
          this.load();
          this.notify('Role deleted.');
        },
        error: () => this.notify('Role could not be deleted.'),
      });
      return;
    }
    this.roles = this.roles.filter((item) => item.id !== role.id);
    this.deleteTarget = undefined;
    this.saveDemoRoles();
    this.notify('Role deleted.');
  }
  openAssign() {
    this.assignDialog = true;
    this.selectedUserId = '';
    this.selectedRoleIds = [];
    if (this.dataMode.mode() === 'live') {
      this.api.listAllSportsUsers().subscribe({
        next: (result) => (this.users = result as UserRecord[]),
        error: () => this.notify('Users could not be loaded.'),
      });
      return;
    }
    this.users = [
      {
        id: 'user-admin',
        name: 'System Admin',
        userName: 'admin',
        userTypes: 'SuperAdmin',
      },
      {
        id: 'user-coach',
        name: 'Ahmed Mohamed',
        userName: 'coach',
        userTypes: 'Coach',
      },
      {
        id: 'user-player',
        name: 'Omar Hassan',
        userName: 'player',
        userTypes: 'Player',
      },
    ];
  }
  loadUserRoles() {
    if (!this.selectedUserId) {
      this.selectedRoleIds = [];
      return;
    }
    if (this.dataMode.mode() === 'live') {
      this.api.getUserRoles(this.selectedUserId).subscribe({
        next: (result: any) => {
          this.selectedUserType = result.userTypes || 'Coach';
          this.selectedRoleIds = (result.roles || []).map(
            (role: any) => role.id
          );
        },
        error: () => this.notify('User roles could not be loaded.'),
      });
      return;
    }
    const assignments = JSON.parse(
      localStorage.getItem(this.demoAssignmentsKey) || '{}'
    );
    const user = this.users.find((item) => item.id === this.selectedUserId);
    this.selectedUserType =
      assignments[this.selectedUserId]?.userTypes || user?.userTypes || 'Coach';
    this.selectedRoleIds = assignments[this.selectedUserId]?.roleIds || [];
  }
  toggleRole(id: string, checked: boolean) {
    this.selectedRoleIds = checked
      ? [...new Set([...this.selectedRoleIds, id])]
      : this.selectedRoleIds.filter((roleId) => roleId !== id);
  }
  saveAssignment() {
    if (!this.selectedUserId) {
      this.notify('Select a user first.');
      return;
    }
    if (this.dataMode.mode() === 'live') {
      this.api
        .setUserRoles(this.selectedUserId, {
          userTypes: this.selectedUserType,
          roleIds: this.selectedRoleIds,
        })
        .subscribe({
          next: () => {
            this.assignDialog = false;
            this.notify('User roles updated.');
          },
          error: (error) =>
            this.notify(
              error?.error?.message || 'User roles could not be updated.'
            ),
        });
      return;
    }
    const assignments = JSON.parse(
      localStorage.getItem(this.demoAssignmentsKey) || '{}'
    );
    assignments[this.selectedUserId] = {
      userTypes: this.selectedUserType,
      roleIds: this.selectedRoleIds,
    };
    localStorage.setItem(this.demoAssignmentsKey, JSON.stringify(assignments));
    this.assignDialog = false;
    this.notify('User roles updated.');
  }
  userLabel(user: UserRecord) {
    return user.name || user.userName || user.id;
  }
  private defaultDemoRoles(): RoleRecord[] {
    return [
      {
        id: 'demo-coach-role',
        name: 'Academy Coach Access',
        data: {
          SportsPlayer: {
            read: 'all',
            stream: 'all',
            edit: 'all',
            delete: 'no',
            create: 'yes',
          },
          TrainingSession: {
            read: 'all',
            stream: 'all',
            edit: 'all',
            delete: 'no',
            create: 'yes',
          },
          SportsVideo: {
            read: 'all',
            stream: 'all',
            edit: 'all',
            delete: 'no',
            create: 'yes',
          },
        },
        fieldData: {},
      },
      {
        id: 'demo-medical-role',
        name: 'Medical Team Access',
        data: {
          SportsPlayer: {
            read: 'all',
            stream: 'all',
            edit: 'no',
            delete: 'no',
            create: 'no',
          },
          PlayerInjury: {
            read: 'all',
            stream: 'all',
            edit: 'all',
            delete: 'no',
            create: 'yes',
          },
          RehabilitationPlan: {
            read: 'all',
            stream: 'all',
            edit: 'all',
            delete: 'no',
            create: 'yes',
          },
        },
        fieldData: {},
      },
    ];
  }
  private saveDemoRoles() {
    localStorage.setItem(this.demoRolesKey, JSON.stringify(this.roles));
  }
  private detectPreset(): '' | 'read' | 'manage' | 'clear' {
    const matches = (preset: 'read' | 'manage' | 'clear') =>
      this.entities.every((entity) => {
        const value = this.permissionData[entity.name] || {};
        return (
          (value['read'] || 'no') === (preset === 'clear' ? 'no' : 'all') &&
          (value['stream'] || 'no') === (preset === 'clear' ? 'no' : 'all') &&
          (value['edit'] || 'no') === (preset === 'manage' ? 'all' : 'no') &&
          (value['delete'] || 'no') === (preset === 'manage' ? 'all' : 'no') &&
          (value['create'] || 'no') === (preset === 'manage' ? 'yes' : 'no')
        );
      });
    return matches('manage')
      ? 'manage'
      : matches('read')
      ? 'read'
      : matches('clear')
      ? 'clear'
      : '';
  }
  private notify(message: string) {
    this.toast = message;
    setTimeout(() => (this.toast = ''), 3000);
  }
}
