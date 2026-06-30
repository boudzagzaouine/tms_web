import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { PermissionsService } from '../../shared/services/permissions.service';

/**
 * Route-level habilitation check (defense in depth, mirrors the backend SecurityConfig rules and the
 * `*hasPermission` menu gating). Usage:
 *
 *   { path: 'habilitation-role', canActivate: [PermissionGuard],
 *     data: { permissions: ['HABILITATION_VIEW'] } }
 *
 * Passes if the user holds ANY of the listed habilitation codes (or if none are required).
 */
@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {

  constructor(private permissions: PermissionsService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const required: string[] = (route.data && route.data['permissions']) || [];
    if (required.length === 0 || this.permissions.hasPermissions(required)) {
      return true;
    }
    this.router.navigate(['/core']);
    return false;
  }
}
