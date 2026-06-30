import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { JWT_TOKEN } from '../../shared/utils/constants';

/**
 * Restricts a route to users whose JWT carries one of the roles listed in the route's
 * `data.roles` (e.g. `{ path: 'admin', canActivate: [RoleGuard], data: { roles: ['ADMIN'] } }`).
 * Roles are read from the JWT `roles` claim (which includes habilitation codes plus USER/ADMIN).
 */
@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const required: string[] = (route.data && route.data['roles']) || [];
    const roles = this.rolesFromToken();

    if (required.length === 0 || required.some(r => roles.indexOf(r) !== -1)) {
      return true;
    }
    this.router.navigate(['/core']);
    return false;
  }

  private rolesFromToken(): string[] {
    const token = sessionStorage.getItem(JWT_TOKEN);
    if (!token) {
      return [];
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Array.isArray(payload.roles) ? payload.roles : [];
    } catch (e) {
      return [];
    }
  }
}
