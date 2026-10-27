import { Injectable } from '@angular/core';
import { LocalEntityStoreService } from './local-entity-store.service';

@Injectable({ providedIn: 'root' })
export class LocalCustomActionsService {
  constructor(private store:LocalEntityStoreService){}

  generateAttendance(teamId:string,trainingSessionId:string):number {
    const memberships=this.store.list('SportsPlayerTeam',{filters:{team:teamId,status:'Active'},pageSize:1000}).data;
    const existing=this.store.list('TrainingAttendance',{filters:{trainingSession:trainingSessionId},pageSize:1000}).data;
    let created=0;
    for(const membership of memberships){if(existing.some(item=>item.player===membership.player))continue;this.store.create('TrainingAttendance',{name:`Attendance ${membership.player}`,user:'user-coach',trainingSession:trainingSessionId,player:membership.player,organization:String(membership.organization),attendanceStatus:'Pending'});created++;}
    return created;
  }

  addVideoComment(videoId:string,comment:string,timeSecond=0){return this.store.create('VideoComment',{name:`Comment ${new Date().toISOString()}`,video:videoId,organization:'org-future',user:'user-coach',timeSecond,commentType:'General',comment,visibility:'Team',status:'Active'});}

  createLoginAccount(entityType:'SportsPlayer'|'SportsCoach'|'SportsStaff',recordId:string){const record=this.store.get(entityType,recordId);if(!record)throw new Error('Source sports record was not found.');const temporaryPassword=`Sports-${Math.random().toString(36).slice(2,8).toUpperCase()}`;const user=this.store.create('User',{userTypes:entityType==='SportsPlayer'?'Player':entityType==='SportsCoach'?'Coach':'TeamManager',organization:String(record['organization']||''),sportsStatus:'Active'});return {userId:user.id,temporaryPassword};}

  submitOwnWellness(values:Record<string,unknown>){return this.store.create('PlayerWellness',{...values,name:`Self wellness ${new Date().toISOString().slice(0,10)}`,user:'user-player',player:'player-ahmed',organization:'org-future',recordDate:new Date().toISOString().slice(0,10)});}
}
