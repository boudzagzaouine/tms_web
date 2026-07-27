import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
    constructor(private router: Router) {}

    canActivate() {
        // Authenticated only when both a JWT and a loaded user profile are present.
        if (sessionStorage.getItem('jwt') && sessionStorage.getItem('currentUser')) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
