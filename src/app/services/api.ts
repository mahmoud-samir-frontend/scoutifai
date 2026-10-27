import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { DocumentedEntity, DocumentedEntityName } from '../models/generated/entities';
import { ENTITY_DEFINITIONS } from '../models/generated/entity-metadata';

export interface EspoList<T>{list:T[];total:number;}
export const SPORTS_USER_TYPES = ['Player','Coach','Doctor','Parent','Scout','TeamManager','FitnessCoach','Physiotherapist','ClubAdmin','OrganizationAdmin','SuperAdmin','DataAnalyst','Nutritionist'] as const;
export type SportsUserType = typeof SPORTS_USER_TYPES[number];
export interface SportsRolePayload{ name:string;data:Record<string,unknown>;fieldData?:Record<string,unknown>;assignmentPermission?:string;userPermission?:string;exportPermission?:string;massUpdatePermission?:string; }
export interface UserSportsRolesPayload{userTypes:string;roleIds:string[];}
export interface PublicRegistrationPayload{userName:string;password:string;firstName:string;lastName:string;emailAddress:string;userTypes:string;}
export interface PlayerVideoUploadPayload{playerId:string;fileName:string;fileData:string;contentType?:string;title?:string;organizationId?:string;sportId?:string;teamId?:string;videoType?:string;visibility?:string;description?:string;recordedDate?:string;durationSeconds?:number;roleInVideo?:string;startSecond?:number;endSecond?:number;notes?:string;}
@Injectable({providedIn:'root'})
export class SportsApi{
  readonly baseUrl='/Player_Performance/api/v1';
  constructor(private http:HttpClient){}
  setCredentials(username:string,password:string){localStorage.setItem('sports_api_auth',btoa(`${username}:${password}`));}
  clearCredentials(){localStorage.removeItem('sports_api_auth');}
  authenticate(username:string,password:string){this.setCredentials(username,password);return this.http.get<any>(`${this.baseUrl}/App/user`,{headers:this.headers()});}
  register(body:PublicRegistrationPayload){return this.http.post<any>(`${this.baseUrl}/SportsUsers/register`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})});}
  listSportsUsers(type:SportsUserType,query:{page?:number;pageSize?:number;search?:string;sortBy?:string;sortDirection?:string}={}):Observable<{data:DocumentedEntity[];total:number}>{
    const page=query.page||1,pageSize=query.pageSize||10,offset=(page-1)*pageSize;
    let params=new HttpParams().set('userId',this.currentUserId()).set('type',type).set('offset',String(offset)).set('maxSize',String(pageSize));
    if(query.search)params=params.set('q',query.search);
    params=params.set('orderBy',query.sortBy||'name').set('order',query.sortDirection==='desc'?'desc':'asc');
    return this.http.get<EspoList<any>>(`${this.baseUrl}/SportsUsers`,{headers:this.headers(),params}).pipe(map(result=>({data:(result.list||[]).map(record=>this.fromApi('User',record)),total:Number(result.total)||0})));
  }
  listAllSportsUsers(search=''):Observable<DocumentedEntity[]>{return forkJoin(SPORTS_USER_TYPES.map(type=>this.listSportsUsers(type,{pageSize:100,search}))).pipe(map(results=>Array.from(new Map(results.flatMap(result=>result.data).map(user=>[user.id,user])).values())));}
  list(entity:DocumentedEntityName,query:{page?:number;pageSize?:number;search?:string;sortBy?:string;sortDirection?:string;filters?:Record<string,unknown>}={}):Observable<{data:DocumentedEntity[];total:number}>{
    if(entity==='User'){
      const type=String(query.filters?.['userTypes']||'') as SportsUserType;
      if(SPORTS_USER_TYPES.includes(type))return this.listSportsUsers(type,query);
      return this.listAllSportsUsers(query.search).pipe(map(data=>({data,total:data.length})));
    }
    let params=new HttpParams().set('offset',String(((query.page||1)-1)*(query.pageSize||10))).set('maxSize',String(query.pageSize||10));
    if(query.search)params=params.set('q',query.search);
    if(query.sortBy)params=params.set('orderBy',query.sortBy).set('order',query.sortDirection==='desc'?'desc':'asc');
    const fields=ENTITY_DEFINITIONS[entity].fields;
    const where=Object.entries(query.filters||{}).filter(([,value])=>value!==''&&value!==null&&value!==undefined).map(([key,value])=>{const field=fields.find(item=>item.key===key);const attribute=field?.type==='link'&&!key.endsWith('Id')?`${key}Id`:field?.type==='linkMultiple'&&!key.endsWith('Ids')?`${key}Ids`:key;return {type:'equals',attribute,value};});
    where.forEach((condition,index)=>{params=params.set(`where[${index}][type]`,condition.type).set(`where[${index}][attribute]`,condition.attribute).set(`where[${index}][value]`,String(condition.value));});
    const offset=((query.page||1)-1)*(query.pageSize||10),pageSize=query.pageSize||10;
    return this.http.get<EspoList<any>>(`${this.baseUrl}/${entity}`,{headers:this.headers(),params}).pipe(map(result=>{const data=(result.list||[]).map(record=>this.fromApi(entity,record));const total=result.total>=0?result.total:offset+data.length+(data.length===pageSize?1:0);return {data,total};}));
  }
  read(entity:DocumentedEntityName,id:string){return this.http.get<any>(`${this.baseUrl}/${entity}/${id}`,{headers:this.headers()}).pipe(map(record=>this.fromApi(entity,record)));}
  getUserById(id:string){return this.read('User',id);}
  create(entity:DocumentedEntityName,values:Record<string,unknown>){return this.http.post<any>(`${this.baseUrl}/${entity}`,this.toApi(entity,values),{headers:this.headers()}).pipe(map(record=>this.fromApi(entity,record)));}
  update(entity:DocumentedEntityName,id:string,values:Record<string,unknown>){return this.http.put<any>(`${this.baseUrl}/${entity}/${id}`,this.toApi(entity,values),{headers:this.headers()}).pipe(map(record=>this.fromApi(entity,record)));}
  updateUser(id:string,values:Record<string,unknown>){return this.update('User',id,values);}
  remove(entity:DocumentedEntityName,id:string){return this.http.delete(`${this.baseUrl}/${entity}/${id}`,{headers:this.headers()});}
  uploadVideoFile(id:string,fileName:string,mimeType:string,contents:string,durationSeconds?:number){return this.http.post(`${this.baseUrl}/SportsVideo/${id}/uploadVideoFile`,{name:fileName,type:mimeType,contents,...(durationSeconds===undefined?{}:{durationSeconds})},{headers:this.headers()});}
  uploadPlayerVideo(body:PlayerVideoUploadPayload){return this.http.post<any>(`${this.baseUrl}/SportsVideos/playerUpload`,body,{headers:this.headers()});}
  listPlayerVideos(playerId:string,offset=0,maxSize=100){const params=new HttpParams().set('playerId',playerId).set('offset',String(offset)).set('maxSize',String(maxSize));return this.http.get<EspoList<any>>(`${this.baseUrl}/SportsVideos/player`,{headers:this.headers(),params});}
  getMyProfile(){return this.http.get<any>(`${this.baseUrl}/SportsUsers/me/profile`,{headers:this.headers()});}
  downloadVideo(record:Record<string,unknown>){const explicit=String(record['downloadPath']||'');const key=String(record['externalStorageKey']||record['filePath']||'');const attachmentId=String(record['attachmentId']||key.split('/').filter(Boolean).pop()||'');const appRoot=this.baseUrl.replace(/\/api\/v1$/,'');const url=explicit?(explicit.startsWith('http://')||explicit.startsWith('https://')||explicit===appRoot||explicit.startsWith(`${appRoot}/`)?explicit:`${appRoot}/${explicit.replace(/^\/+/, '')}`):`${this.baseUrl}/Attachment/file/${attachmentId}`;return this.http.get(url,{headers:this.headers(),responseType:'blob'});}
  listRoles(query:{offset?:number;maxSize?:number;q?:string;where?:Array<{type?:string;attribute?:string;value?:unknown}>}={}){let params=new HttpParams().set('offset',String(query.offset||0)).set('maxSize',String(query.maxSize||10));if(query.q)params=params.set('q',query.q);(query.where||[]).forEach((condition,index)=>{params=params.set(`where[${index}][type]`,condition.type||'equals').set(`where[${index}][attribute]`,condition.attribute||'').set(`where[${index}][value]`,String(condition.value??''));});return this.http.get<EspoList<any>>(`${this.baseUrl}/SportsRoles`,{headers:this.headers(),params});}
  createRole(body:SportsRolePayload){return this.http.post(`${this.baseUrl}/SportsRole`,body,{headers:this.headers()});}
  updateRole(id:string,body:SportsRolePayload){return this.http.put(`${this.baseUrl}/SportsRoles/${id}`,body,{headers:this.headers()});}
  deleteRole(id:string){return this.http.delete(`${this.baseUrl}/SportsRoles/${id}`,{headers:this.headers()});}
  getUserRoles(id:string){return this.http.get(`${this.baseUrl}/User/${id}/sportsRoles`,{headers:this.headers()});}
  setUserRoles(id:string,body:UserSportsRolesPayload){return this.http.put(`${this.baseUrl}/User/${id}/sportsRoles`,body,{headers:this.headers()});}
  getTeamDashboard(id:string){return this.http.get(`${this.baseUrl}/SportsTeam/${id}/dashboard`,{headers:this.headers()});}
  getPlayerDashboard(id:string){return this.http.get(`${this.baseUrl}/SportsPlayer/${id}/dashboard`,{headers:this.headers()});}
  generateAttendance(id:string,trainingSessionId:string){return this.http.post(`${this.baseUrl}/SportsTeam/${id}/generateAttendance`,{trainingSessionId},{headers:this.headers()});}
  addVideoComment(id:string,body:Record<string,unknown>){return this.http.post(`${this.baseUrl}/SportsVideos/${id}/comments`,body,{headers:this.headers()});}
  createLoginAccount(entityType:'SportsPlayer'|'SportsCoach'|'SportsStaff',id:string,body:Record<string,unknown>={}){return this.http.post(`${this.baseUrl}/${entityType}/${id}/createLoginAccount`,body,{headers:this.headers()});}
  submitSelfWellness(body:Record<string,unknown>){return this.http.post(`${this.baseUrl}/PlayerWellness/self`,body,{headers:this.headers()});}
  analyzeUser(id:string,body:Record<string,unknown>={}){return this.http.post(`${this.baseUrl}/User/${id}/intelligence/analyze`,body,{headers:this.headers()});}
  private headers(){const auth=localStorage.getItem('sports_api_auth')||'';return new HttpHeaders({'Content-Type':'application/json',Authorization:`Basic ${auth}`});}
  private currentUserId(){try{return String(JSON.parse(localStorage.getItem('sports_user')||'{}')?.id||'');}catch{return '';}}
  private fromApi(entity:DocumentedEntityName,record:any){const result={...record};for(const field of ENTITY_DEFINITIONS[entity].fields){if(field.type==='link'&&record[`${field.key}Id`]!==undefined)result[field.key]=record[`${field.key}Id`];if(field.type==='linkMultiple'&&record[`${field.key}Ids`]!==undefined)result[field.key]=record[`${field.key}Ids`];}return result;}
  private toApi(entity:DocumentedEntityName,record:Record<string,unknown>){const result={...record};for(const field of ENTITY_DEFINITIONS[entity].fields){if(field.type==='link'&&field.key in result){const value=result[field.key];delete result[field.key];if(value!==''&&value!==null&&value!==undefined)result[`${field.key}Id`]=value;else delete result[`${field.key}Id`];}if(field.type==='linkMultiple'&&field.key in result){const value=result[field.key];delete result[field.key];if(Array.isArray(value)&&value.length)result[`${field.key}Ids`]=value;else delete result[`${field.key}Ids`];}}return result;}
}
