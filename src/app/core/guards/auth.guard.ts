import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PermissionService } from '../../services/permission.service';
import { DocumentedEntityName } from '../../models/generated/entities';
export const authGuard: CanActivateFn = (route,state) => {
  const router=inject(Router);
  if(!localStorage.getItem('sports_token')) return router.createUrlTree(['/login']);
  try {
    const user=JSON.parse(localStorage.getItem('sports_user')||'');
    if(state.url==='/roles'&&!['SuperAdmin','OrganizationAdmin','ClubAdmin'].includes(user.role))
      return router.createUrlTree([inject(PermissionService).firstAccessiblePath(user.role)]);
    const match=state.url.match(/^\/pages\/([^/?]+)/);
    if(match){
      const entity=match[1].split('-').map((part:string)=>part[0].toUpperCase()+part.slice(1)).join('') as DocumentedEntityName;
      const permission=inject(PermissionService);
      if(!permission.canView(entity))return router.createUrlTree([permission.firstAccessiblePath(user.role)]);
    }
    return true;
  } catch { return router.createUrlTree(['/login']); }
};
