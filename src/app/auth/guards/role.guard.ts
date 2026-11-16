import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { CURRENT_USER } from '../../shared/utils/constants';

/**
 * Restricts a route to users holding one of the roles listed in the route's `data.roles`
 * (e.g. `{ path: 'admin', canActivate: [RoleGuard], data: { roles: ['ADMIN'] } }`).
 *
 * The JWT carries identity only (sub, uid, type), so roles are derived from the stored profile with
 * the same rule as the backend's MyUserDetailsService: every user is USER, and members of a group
 * whose code contains "ADMIN" are also ADMIN. Habilitation codes are accepted as roles too.
 */
@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const required: string[] = (route.data && route.data['roles']) || [];
    const roles = this.currentRoles();

    if (required.length === 0 || required.some(r => roles.indexOf(r.toUpperCase()) !== -1)) {
      return true;
    }
    this.router.navigate(['/core']);
    return false;
  }

  private currentRoles(): string[] {
    try {
      const user: any = JSON.parse(sessionStorage.getItem(CURRENT_USER));
      if (!user) {
        return [];
      }
      const roles = ['USER'];
      const group = user.userGroup || {};
      if (group.code && String(group.code).toUpperCase().indexOf('ADMIN') !== -1) {
        roles.push('ADMIN');
      }
      for (const gh of group.groupHabilitations || []) {
        if (gh && gh.habilitation && gh.habilitation.code) {
          roles.push(String(gh.habilitation.code).toUpperCase());
        }
      }
      return roles;
    } catch (e) {
      return [];
    }
  }
}
