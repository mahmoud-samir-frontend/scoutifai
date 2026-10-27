import { Injectable } from '@angular/core';
import { DocumentedEntityName } from '../models/generated/entities';
import { AuthService, UserRole } from './auth.service';

type Access = 'none' | 'read' | 'manage';
type AclAction = 'read' | 'create' | 'edit' | 'delete';
type AclRule = boolean | Record<string,unknown>;

@Injectable({ providedIn: 'root' })
export class PermissionService {
  // Players need read access to SportsPlayer because it is the application's
  // default post-login page. Their access remains read-only.
  private readonly playerEntities: DocumentedEntityName[] = ['SportsPlayer','SportsPlayerTeam','TrainingSession','TrainingAttendance','TrainingTask','PlayerTask','SportsMatch','MatchPlayerStatistic','PlayerMeasurement','PlayerTestResult','PlayerEvaluation','PlayerEvaluationItem','PlayerWellness','PlayerInjury','RehabilitationPlan','RehabilitationSession','SportsVideo','PlayerVideoLink','VideoComment','VideoTimelineTag','SportsNotification'];
  private readonly teamManagerEntities: DocumentedEntityName[] = ['SportsTeam','SportsPlayer','SportsPlayerTeam','TrainingSession','TrainingAttendance','TrainingTask','PlayerTask','SportsMatch','MatchPlayerStatistic','PlayerMeasurement','PlayerEvaluation','PlayerEvaluationItem','SportsVideo','PlayerVideoLink','VideoComment','VideoTimelineTag','SportsNotification'];
  private readonly coachEntities: DocumentedEntityName[] = ['SportsTeam','SportsPlayer','SportsPlayerTeam','TrainingSession','TrainingAttendance','TrainingTask','PlayerTask','SportsMatch','MatchPlayerStatistic','PlayerEvaluation','PlayerEvaluationItem','SportsVideo','PlayerVideoLink','VideoComment','VideoTimelineTag','PlayerInjury','SportsNotification'];
  private readonly fitnessEntities: DocumentedEntityName[] = ['SportsPlayer','TrainingSession','TrainingTask','PlayerTask','PlayerMeasurement','SportTestDefinition','PlayerTestResult','PlayerWellness','SportsNotification'];
  private readonly medicalEntities: DocumentedEntityName[] = ['SportsPlayer','PlayerWellness','PlayerMeasurement','PlayerInjury','RehabilitationPlan','RehabilitationSession','SportsNotification'];
  private readonly scoutEntities: DocumentedEntityName[] = ['SportsPlayer','PlayerEvaluation','PlayerEvaluationItem','SportsVideo','PlayerVideoLink','VideoComment','VideoTimelineTag'];

  constructor(private auth: AuthService) {}
  access(entity: DocumentedEntityName, role: UserRole = this.auth.currentUser.role): Access {
    if (['SuperAdmin','OrganizationAdmin','ClubAdmin'].includes(role)) return 'manage';
    if (role === 'TeamManager') return this.teamManagerEntities.includes(entity) ? 'manage' : 'none';
    if (role === 'Coach') return this.coachEntities.includes(entity) ? (entity === 'PlayerInjury' ? 'read' : 'manage') : 'none';
    if (role === 'FitnessCoach') return this.fitnessEntities.includes(entity) ? 'manage' : 'none';
    if (role === 'Doctor') return this.medicalEntities.includes(entity) ? 'manage' : 'none';
    if (role === 'Physiotherapist') return this.medicalEntities.includes(entity) ? (entity === 'PlayerInjury' ? 'read' : 'manage') : 'none';
    if (role === 'Player') return this.playerEntities.includes(entity) ? (['PlayerWellness','PlayerTask','VideoComment'].includes(entity) ? 'manage' : 'read') : 'none';
    if (role === 'Parent') return ['ParentPlayerRelation','SportsPlayer','TrainingAttendance','PlayerEvaluation','PlayerInjury','SportsVideo','SportsNotification'].includes(entity) ? 'read' : 'none';
    if (role === 'Scout') return this.scoutEntities.includes(entity) ? (['PlayerEvaluation','PlayerEvaluationItem','VideoComment','VideoTimelineTag'].includes(entity) ? 'manage' : 'read') : 'none';
    if (role === 'DataAnalyst') return 'read';
    return 'none';
  }
  canView(entity: DocumentedEntityName){ return this.allowed(entity,'read'); }
  canCreate(entity: DocumentedEntityName){ return this.allowed(entity,'create'); }
  canEdit(entity: DocumentedEntityName){ return this.allowed(entity,'edit'); }
  canDelete(entity: DocumentedEntityName){ return this.allowed(entity,'delete'); }
  canManage(entity: DocumentedEntityName){ return this.canCreate(entity)||this.canEdit(entity)||this.canDelete(entity); }
  firstAccessiblePath(role:UserRole=this.auth.currentUser.role){
    return role ? '/dashboard' : '/login';
  }
  private allowed(entity:DocumentedEntityName,action:AclAction){
    let playerAllowed=false;
    if(this.auth.currentUser.role==='Player'&&action!=='read'){
      const playerActions:Partial<Record<DocumentedEntityName,AclAction[]>>={PlayerWellness:['create','edit'],PlayerTask:['edit'],SportsVideo:['create'],VideoComment:['create','edit','delete']};
      if(!playerActions[entity]?.includes(action))return false;
      playerAllowed=true;
    }
    const table=this.aclTable() || this.assignedDemoAcl();
    if(table){const rule=table[entity];if(rule===true)return true;if(rule===false||rule===undefined)return false;const value=rule[action];return value!==undefined&&value!==false&&value!=='no'&&value!=='none';}
    const fallback=this.access(entity);
    return action==='read'?fallback!=='none':playerAllowed||fallback==='manage';
  }
  private aclTable():Record<string,AclRule>|null{const saved=localStorage.getItem('sports_acl');if(!saved)return null;try{return JSON.parse(saved) as Record<string,AclRule>;}catch{return null;}}
  private assignedDemoAcl():Record<string,AclRule>|null{
    try {
      const user=this.auth.currentUser;
      const assignments=JSON.parse(localStorage.getItem('sports_demo_role_assignments')||'{}');
      const assignment=assignments[user.id||''] || assignments[user.email] || null;
      if(!assignment?.roleIds?.length)return null;
      const roles=JSON.parse(localStorage.getItem('sports_demo_roles')||'[]') as Array<{id:string;data?:Record<string,any>}>;
      const table:Record<string,Record<string,unknown>>={};
      for(const role of roles.filter(item=>assignment.roleIds.includes(item.id))){
        for(const [entity,rules] of Object.entries(role.data||{}))table[entity]={...(table[entity]||{}),...(rules as object)};
      }
      return table;
    } catch{return null;}
  }
}
