import { LOGGED_IN } from './../../utils/constants';
import { Owner } from './../../models/owner';
import { User } from './../../models/user';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxPermissionsService } from 'ngx-permissions';
import { REST_URL, CURRENT_USER, JWT_TOKEN, REFRESH_TOKEN, AUTH_LOGIN_URL } from '../../utils/constants';
import { AuthResponse } from '../../../auth/models/auth-response';
import { Md5 } from 'ts-md5';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { PermissionsService } from '../permissions.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy{
  private subs: Subscription = new Subscription;
  private currentUser: User;
  private  current : User;
    token: string;
    cashRegisterID: number;
    constructor(
        private http: HttpClient,
        private router: Router,
        private toast: ToastrService,
       // private permissionService: NgxPermissionsService,
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


   login(email: string, password: string) {
        // Single round-trip: POST /api/auth/login authenticates (backend MD5-hashes the plain
        // password), and returns the JWT together with the full user profile. No second call.
        this.subs = this.http
            .post<AuthResponse>(AUTH_LOGIN_URL, { email, password })
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
                            this.spinner.hide();
                            this.toast.success('Successfully logged in', 'Welcome');
                            this.router.navigate(['/core']);
                        } else {
                            this.spinner.hide();
                            this.toast.error('information érroné', 'Erreur');
                        }
                    } catch (e) {
                        this.spinner.hide();
                        this.toast.error('Login error', 'Erreur');
                    }
                },
                () => {
                    this.spinner.hide();
                    this.toast.error('Email ou mot de passe invalide', 'Erreur');
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


        const user: User = JSON.parse(sessionStorage.getItem('currentUser'));

        if (user !== undefined && user !== null) {
           //console.log(loadPermissions);

            if (loadPermissions) {
                const permissions: string[] = [];
                if (
                    user.userGroup &&
                    user.userGroup.groupHabilitations &&
                    user.userGroup.groupHabilitations.length
                ) {
                    for (const gh of user.userGroup.groupHabilitations) {
                     //    console.log(gh.habilitation.code);
                        permissions.push(gh.habilitation.code);
                    }
                }
                this.permissionService.loadPermissions(permissions);
            }
            return user;
        }
        return null;
    }

    loadPermissions(user: User) {
        const permissions: string[] = [];
        if (
            user.userGroup &&
            user.userGroup.groupHabilitations &&
            user.userGroup.groupHabilitations.length
        ) {
            for (const gh of user.userGroup.groupHabilitations) {
                // console.log(gh.habilitation.code);
                permissions.push(gh.habilitation.code);
            }
        }
        return permissions
       // this.permissionService.loadPermissions(permissions);

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

    /**
     * Re-hydrates the in-memory habilitations from the stored profile on app start / page refresh.
     * Wired as an APP_INITIALIZER so `*hasPermission` (menu items, action buttons) works immediately
     * after a reload, before any component renders. The PermissionsService is in-memory only, so
     * without this the user's permissions would be empty until something happened to reload them.
     */
    restoreSession(): void {
        const token = sessionStorage.getItem(JWT_TOKEN);
        const userStr = sessionStorage.getItem(CURRENT_USER);
        if (token && userStr) {
            try {
                const user: User = JSON.parse(userStr);
                this.token = token;
                this.currentUser = user;
                this.permissionService.loadPermissions(this.extractPermissions(user));
            } catch (e) {
                // corrupt storage -> treat as logged out
            }
        }
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

    IsJsonString(str: any) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    computeToken(): string {
        // Auth now flows through the `Authorization: Bearer` header (JwtInterceptor). Return empty
        // so the many legacy `?token=` query params carry no token (avoids leaking JWTs in URLs,
        // server logs and browser history). The backend ignores an empty `token` param.
        return '';
    }

    ngOnDestroy(){
      if (this.subs != null){
        this.subs.unsubscribe();
      }
    }
}
