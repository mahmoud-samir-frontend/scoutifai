import { Injectable } from '@angular/core';
import { ENTITY_METADATA } from '../models/generated/entity-metadata';
import { DocumentedEntityName } from '../models/generated/entities';
import { LocalEntityStoreService } from './local-entity-store.service';

@Injectable({ providedIn: 'root' })
export class LocalDemoDataService {
  constructor(private store: LocalEntityStoreService) {}

  initialize(): void {
    for (const entity of ENTITY_METADATA) this.store.seed(entity.name as DocumentedEntityName, [] as never[]);
    const savedFootball=this.store.get('Sport','sport-football');
    if(savedFootball?.category==='Team')this.store.update('Sport','sport-football',{category:'TeamSport'});
    this.store.seed('SportsOrganization', [this.record('org-future', { name:'Future Stars Academy', code:'FSA', organizationType:'Academy', status:'Active', subscriptionPlan:'Professional', maximumPlayers:250, maximumTeams:20, maximumStorageGb:100 })]);
    this.store.seed('SportsClub', [this.record('club-future', { name:'Future Stars FC', code:'FSFC', organization:'org-future', clubType:'Professional', status:'Active', addressCity:'Cairo', addressCountry:'Egypt' })]);
    this.store.seed('Sport', [this.record('sport-football', { name:'Football', code:'FB', organization:'org-future', category:'TeamSport', status:'Active' })]);
    this.store.seed('SportPosition', [
      this.record('position-forward',{name:'Forward',code:'FW',sport:'sport-football',status:'Active'}),
      this.record('position-midfielder',{name:'Midfielder',code:'MF',sport:'sport-football',status:'Active'}),
      this.record('position-defender',{name:'Defender',code:'DF',sport:'sport-football',status:'Active'}),
      this.record('position-goalkeeper',{name:'Goalkeeper',code:'GK',sport:'sport-football',status:'Active'})
    ]);
    this.store.seed('SportsTeam', [
      this.record('team-u21',{name:'U21 Team',code:'U21',organization:'org-future',club:'club-future',sport:'sport-football',ageGroup:'U21',season:'2026/2027',gender:'Male',level:'Elite',status:'Active',trainingLocation:'Field 1'}),
      this.record('team-u18',{name:'U18 Team',code:'U18',organization:'org-future',club:'club-future',sport:'sport-football',ageGroup:'U18',season:'2026/2027',gender:'Male',level:'Academy',status:'Active',trainingLocation:'Field 2'})
    ]);
    this.store.seed('User', [
      this.record('user-player',{name:'Omar Hassan',userTypes:'Player',organization:'org-future',club:'club-future',sport:'sport-football',primaryPosition:'position-midfielder',sportsStatus:'Active'}),
      this.record('user-coach',{name:'Ahmed Mohamed',userTypes:'Coach',organization:'org-future',club:'club-future',sport:'sport-football',sportsStatus:'Active'}),
      this.record('user-doctor',{name:'Dr. Tarek Hassan',userTypes:'Doctor',organization:'org-future',club:'club-future',sportsStatus:'Active'}),
      this.record('user-parent',{name:'Mahmoud Parent',userTypes:'Parent',organization:'org-future',club:'club-future',sportsStatus:'Active'}),
      this.record('user-physio',{name:'Dr. Sara Ali',userTypes:'Physiotherapist',organization:'org-future',club:'club-future',sportsStatus:'Active'})
    ]);
    this.store.seed('SportsPlayer', [
      this.player('player-ahmed','Ahmed','Mohamed','ahmed@sports.com','team-u21','position-forward',10,'2004-05-12'),
      this.player('player-omar','Omar','Hassan','omar@sports.com','team-u21','position-midfielder',8,'2004-11-01'),
      this.player('player-youssef','Youssef','Ali','youssef@sports.com','team-u21','position-defender',4,'2005-03-22'),
      this.player('player-karim','Karim','Khaled','karim@sports.com','team-u18','position-goalkeeper',1,'2006-06-17')
    ]);
    this.store.seed('SportsPlayerTeam', [
      this.record('membership-ahmed',{name:'Ahmed Mohamed - U21',player:'player-ahmed',team:'team-u21',organization:'org-future',startDate:'2024-08-10',status:'Active',shirtNumber:10,position:'position-forward',isCaptain:true}),
      this.record('membership-omar',{name:'Omar Hassan - U21',player:'player-omar',team:'team-u21',organization:'org-future',startDate:'2024-08-10',status:'Active',shirtNumber:8,position:'position-midfielder',isCaptain:false})
    ]);
    this.store.seed('TrainingSession', [this.record('session-strength',{name:'Strength Training',organization:'org-future',club:'club-future',team:'team-u21',coach:'user-coach',startDateTime:'2026-08-10T18:00:00',endDateTime:'2026-08-10T19:30:00',location:'Field 1',sessionType:'Strength',intensity:'High',objectives:'Strength and conditioning',status:'Completed'})]);
    this.store.seed('SportsMatch', [this.record('match-ahly',{name:'U21 vs Al Ahly U21',organization:'org-future',team:'team-u21',opponentName:'Al Ahly U21',competitionName:'League',season:'2026/2027',matchDateTime:'2026-08-10T20:00:00',location:'Cairo Stadium',venueType:'Home',matchStatus:'Completed',teamScore:2,opponentScore:1,result:'Win'})]);
    this.store.seed('PlayerMeasurement', [this.record('measure-ahmed-aug',{name:'Ahmed Mohamed - 10 Aug 2026',user:'user-coach',player:'player-ahmed',organization:'org-future',measurementDate:'2026-08-10',heightCm:180,weightKg:75,bmi:23.1,source:'Manual',notes:'Pre-season'})]);
    this.store.seed('PlayerWellness', [this.record('wellness-ahmed-aug',{name:'Ahmed Mohamed - 10 Aug',user:'user-player',player:'player-ahmed',organization:'org-future',recordDate:'2026-08-10',sleepHours:8,sleepQuality:8,fatigueLevel:4,musclePainLevel:3,stressLevel:2,moodLevel:9,readinessLevel:8,hasPain:false,wellnessStatus:'Good'})]);
    this.store.seed('PlayerInjury', [this.record('injury-ahmed',{name:'Ahmed Mohamed Hamstring Injury',user:'user-doctor',player:'player-ahmed',organization:'org-future',team:'team-u21',injuryDate:'2026-08-10',injuryType:'Muscle',bodyArea:'Hamstring',side:'Left',severity:'Moderate',injuryStatus:'Active',diagnosis:'Grade 1 strain',cause:'Training overload',doctor:'user-doctor',expectedReturnDate:'2026-08-30',trainingAvailability:'Unavailable',confidentialNotes:'Medical staff only'})]);
    this.store.seed('RehabilitationPlan', [this.record('rehab-ahmed',{name:'Ahmed Hamstring Recovery',user:'user-physio',injury:'injury-ahmed',player:'player-ahmed',organization:'org-future',responsibleStaff:'user-physio',startDate:'2026-08-10',expectedEndDate:'2026-08-30',status:'Active',objectives:'Return to full training',instructions:'Progressive mobility and strength',progressPercentage:55})]);
    this.store.seed('SportsVideo', [this.record('video-training',{name:'U21 Strength Training',user:'user-coach',organization:'org-future',uploader:'user-coach',sport:'sport-football',team:'team-u21',trainingSession:'session-strength',videoType:'Training',externalUrl:'https://example.com/demo-training.mp4',durationSeconds:3120,fileSizeBytes:0,processingStatus:'Ready',visibility:'Team',status:'Active'})]);
    this.store.seed('SportsNotification', [this.record('notice-training',{name:'New Training Session',organization:'org-future',recipientUser:'user-player',notificationType:'Training',title:'New Training Session',message:'A training session has been created.',relatedEntityType:'TrainingSession',relatedEntityId:'session-strength',readStatus:'Unread',deliveryChannel:'In App',deliveryStatus:'Delivered',sentDate:'2026-08-10T10:00:00'})]);
    for (const entity of ENTITY_METADATA) {
      const name=entity.name as DocumentedEntityName;
      this.store.seed(name,Array.from({length:5},(_,index)=>this.demoEntity(name,entity.fields,index+1)) as never[]);
    }
  }

  private demoEntity(entity:DocumentedEntityName,fields:typeof ENTITY_METADATA[number]['fields'],index:number):any {
    const links:Record<string,string>={SportsOrganization:'org-future',SportsClub:'club-future',Sport:'sport-football',SportPosition:'position-forward',SportsTeam:'team-u21',SportsPlayer:'player-ahmed',SportsPlayerTeam:'membership-ahmed',TrainingSession:'session-strength',SportsMatch:'match-ahly',PlayerInjury:'injury-ahmed',RehabilitationPlan:'rehab-ahmed',SportsVideo:'video-training',User:index===1?'demo-user':`demo-user-${index}`,SportsCoach:index===1?'demo-sports-coach':`demo-sports-coach-${index}`,SportsStaff:index===1?'demo-sports-staff':`demo-sports-staff-${index}`};
    const people=['Ahmed Hassan','Omar Khaled','Youssef Ali','Karim Mahmoud','Mostafa Tarek'];
    const personEntities:DocumentedEntityName[]=['User','SportsPlayer','SportsCoach','SportsStaff'];
    const values:Record<string,unknown>={name:personEntities.includes(entity)?people[index-1]:`${ENTITY_METADATA.find(item=>item.name===entity)?.label||entity} ${index}`};
    for(const field of fields){
      if(field.key==='name'||['createdAt','modifiedAt','createdBy','modifiedBy'].includes(field.key))continue;
      if(field.options?.length)values[field.key]=field.options[0];
      else if(field.type==='link')values[field.key]=links[field.linkedEntity||'']||`demo-${(field.linkedEntity||field.key).toLowerCase()}`;
      else if(field.type==='linkMultiple')values[field.key]=[links[field.linkedEntity||'']||`demo-${(field.linkedEntity||field.key).toLowerCase()}`];
      else if(field.type==='bool')values[field.key]=true;
      else if(field.type==='date')values[field.key]='2026-08-18';
      else if(field.type==='datetime')values[field.key]='2026-08-18T10:00:00';
      else if(field.type==='int')values[field.key]=index*5;
      else if(field.type==='float')values[field.key]=7+index*.5;
      else if(field.key==='firstName')values[field.key]=people[index-1].split(' ')[0];
      else if(field.key==='lastName')values[field.key]=people[index-1].split(' ')[1];
      else if(field.type==='email')values[field.key]=`demo${index}@sports.com`;
      else if(field.type==='phone')values[field.key]=`+20 100 000 000${index}`;
      else if(field.type==='url')values[field.key]='https://example.com/demo';
      else if(field.type==='jsonObject')values[field.key]={demo:true};
      else values[field.key]=`${field.label} ${index}`;
    }
    const base=`demo-${entity.replace(/([a-z0-9])([A-Z])/g,'$1-$2').toLowerCase()}`;
    return this.record(index===1?base:`${base}-${index}`,values);
  }

  private player(id:string,firstName:string,lastName:string,emailAddress:string,_team:string,primaryPosition:string,playerNumber:number,birthDate:string) {
    return this.record(id,{name:`${firstName} ${lastName}`,firstName,lastName,emailAddress,organization:'org-future',club:'club-future',sport:'sport-football',primaryPosition,playerNumber,registrationNumber:`REG-${playerNumber}`,birthDate,nationality:'Egyptian',gender:'Male',heightCm:180,weightKg:75,preferredSide:'Right',joinDate:'2024-08-10',experienceYears:4,medicalStatus:'Available',playerStatus:'Active',publicProfileEnabled:true,publicProfileSlug:`${firstName}-${lastName}`.toLowerCase(),strengths:'Speed and positioning',improvementAreas:'Finishing'});
  }

  private record(id:string, values:Record<string,unknown>): any {
    return { id, ...values, createdAt:'2026-08-01T10:00:00.000Z', modifiedAt:'2026-08-16T10:00:00.000Z' };
  }
}
