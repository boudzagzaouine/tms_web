import { LOGGED_IN } from './../../utils/constants';
import { Owner } from './../../models/owner';
import { User } from './../../models/user';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CURRENT_USER, JWT_TOKEN, REFRESH_TOKEN, AUTH_LOGIN_URL } from '../../utils/constants';
import { AuthResponse } from '../../../auth/models/auth-response';
import { LoginRequest } from '../../../auth/models/login-request';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { PermissionsService } from '../permissions.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUser: User;
    token: string;
    cashRegisterID: number;
    constructor(
        private http: HttpClient,
        private router: Router,
        private toast: ToastrService,
        private translate: TranslateService,
        private spinner: NgxSpinnerService,
        private permissionService :PermissionsService,
    ) {
        // Prefer the JWT; fall back to any legacy stored token. Must never throw here, because this
        // service is instantiated at bootstrap (APP_INITIALIZER) and a throw would blank the app.
        try {
            const jwt = sessionStorage.getItem(JWT_TOKEN);
            const raw = localStorage.getItem('currentUser');
            const legacy = raw ? JSON.parse(raw) : null;
            this.token = jwt || (legacy && legacy.token) || '';
        } catch (e) {
            this.token = '';
        }
    }


   /**
    * Single round-trip: POST /api/auth/login authenticates (backend hashes the plain password) and
    * returns the JWT together with the full user profile. `onDone` runs once the request settles,
    * success or failure, so callers can re-enable their form.
    */
   login(email: string, password: string, onDone?: () => void) {
        const body: LoginRequest = { email, password };
        this.http
            .post<AuthResponse>(AUTH_LOGIN_URL, body)
            .pipe(finalize(() => {
                this.spinner.hide();
                if (onDone) {
                    onDone();
                }
            }))
            .subscribe(
                auth => {
                    try {
                        const user: any = auth.user;
                        this.currentUser = user;
                        if (user) {
                            sessionStorage.setItem(JWT_TOKEN, auth.accessToken);
                            if (auth.refreshToken) {
                                sessionStorage.setItem(REFRESH_TOKEN, auth.refreshToken);
                            }
                            this.token = auth.accessToken;
                            sessionStorage.setItem(CURRENT_USER, JSON.stringify(user));
                            localStorage.setItem(LOGGED_IN, 'true');
                            this.permissionService.loadPermissions(this.extractPermissions(user));
                            this.toast.success(this.translate.instant('Connexion réussie'), this.translate.instant('Bienvenue'));
                            this.router.navigate(['/core']);
                        } else {
                            this.toast.error(this.translate.instant('Informations erronées'), this.translate.instant('Erreur'));
                        }
                    } catch (e) {
                        this.toast.error(this.translate.instant('Erreur de connexion'), this.translate.instant('Erreur'));
                    }
                },
                () => {
                    this.toast.error(this.translate.instant('Email ou mot de passe invalide'), this.translate.instant('Erreur'));
                }
            );
    }

   setuser(user : User){
    this.currentUser = user;
    localStorage.setItem(LOGGED_IN, 'true');
    sessionStorage.setItem(
      CURRENT_USER,
      JSON.stringify(user)
  );
   }

    getCurrentUser(loadPermissions = true) {
        let user: User = null;
        try {
            user = JSON.parse(sessionStorage.getItem(CURRENT_USER));
        } catch (e) {
            // corrupt storage -> treat as logged out
        }

        if (user !== undefined && user !== null) {
            if (loadPermissions) {
                this.permissionService.loadPermissions(this.extractPermissions(user));
            }
            return user;
        }
        return null;
    }

    loadPermissions(user: User) {
        return this.extractPermissions(user);
    }

    getDefaultOwner(): Owner {
        const user = this.getCurrentUser(false);
        if (user != null) {
            return user.owner;

        }

        return null;
    }

    logout(): void {
        //  clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem(LOGGED_IN);
        sessionStorage.removeItem(CURRENT_USER);
        sessionStorage.removeItem(JWT_TOKEN);
        sessionStorage.removeItem(REFRESH_TOKEN);
        this.permissionService.flushPermissions();
        this.router.navigate(['/login']);
    }

    /** Returns the stored JWT (empty string if none). */
    getToken(): string {
        return sessionStorage.getItem(JWT_TOKEN) || '';
    }

    /** True when a JWT and a current user profile are present. */
    isAuthenticated(): boolean {
        return !!sessionStorage.getItem(JWT_TOKEN) && !!sessionStorage.getItem(CURRENT_USER);
    }

    /** Pulls the habilitation codes (user.userGroup.groupHabilitations[].habilitation.code). */
    private extractPermissions(user: User): string[] {
        const permissions: string[] = [];
        if (user && user.userGroup && user.userGroup.groupHabilitations) {
            for (const gh of user.userGroup.groupHabilitations) {
                if (gh && gh.habilitation && gh.habilitation.code) {
                    permissions.push(gh.habilitation.code);
                }
            }
        }
        return permissions;
    }

    computeToken(): string {
        // Auth now flows through the `Authorization: Bearer` header (JwtInterceptor). Return empty
        // so the many legacy `?token=` query params carry no token (avoids leaking JWTs in URLs,
        // server logs and browser history). The backend ignores an empty `token` param.
        return '';
    }
}
