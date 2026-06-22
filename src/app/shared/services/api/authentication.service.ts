import { LOGGED_IN } from './../../utils/constants';
import { Owner } from './../../models/owner';
import { User } from './../../models/user';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxPermissionsService } from 'ngx-permissions';
import { REST_URL, CURRENT_USER, JWT_TOKEN } from '../../utils/constants';
import { Md5 } from 'ts-md5';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { PermissionsService } from '../permissions.service';
import { Console } from 'console';

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
        //  set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }


   login(email: string, password: string) {
        const pass = Md5.hashStr(password).toString();

        // 1) Obtain a signed JWT from the backend. The stored password is an MD5 hash and the
        //    backend compares it verbatim, so we send md5(password) (same value used below).
        this.subs = this.http
            .post<{ token: string; type: string; email: string }>(
                REST_URL + 'auth/login',
                { email, password: pass }
            )
            .subscribe(
                auth => {
                    sessionStorage.setItem(JWT_TOKEN, auth.token);
                    this.token = auth.token;
                    // 2) Load the full user profile (permissions, owner, ...) and enter the app.
                    this.loadProfileAndEnter(email, pass);
                },
                () => {
                    this.spinner.hide();
                    this.toast.error('information érroné', 'Erreur');
                }
            );
    }

    /** Loads the user profile via the existing endpoint, then navigates into the app. */
    private loadProfileAndEnter(email: string, pass: string) {
        this.subs.add(
            this.http
                .get<User>(
                    REST_URL +
                        'authentification?email=' +
                        email +
                        '&password=' +
                        pass
                )
                .subscribe(
                    user => {
                        this.currentUser = user;

                        if (
                            this.currentUser !== undefined &&
                            this.currentUser !== null
                        ) {
                            const permissions: string[] = [];
                            if (
                                user.userGroup &&
                                user.userGroup.groupHabilitations &&
                                user.userGroup.groupHabilitations.length
                            ) {
                                for (const gh of user.userGroup
                                    .groupHabilitations) {
                                    permissions.push(gh.habilitation.code);
                                }
                            }
                            this.permissionService.loadPermissions(permissions);
                            localStorage.setItem(LOGGED_IN, 'true');
                            sessionStorage.setItem(
                                CURRENT_USER,
                                JSON.stringify(user)
                            );
                            this.router.navigate(['/core']);
                            this.toast.success('Successfully logged in', 'Welcome');
                            this.spinner.hide();
                        } else {
                            this.toast.error('information érroné', 'Erreur');
                            this.spinner.hide();
                        }
                    },
                    () => {
                        this.toast.toastrConfig.timeOut = 1500;
                        this.spinner.hide();
                        this.toast.error(
                            'La connextion au serveur ne peut pas être établie !',
                            'Erreur de connextion'
                        );
                    }
                )
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
        // this.permissionService.removePermission(permissions);
        this.router.navigate(['/login']);
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
        // The backend now expects a signed JWT (accepted via the `token` param or a Bearer header).
        // The legacy MD5 token is no longer issued.
        return sessionStorage.getItem(JWT_TOKEN) || '';
    }

    ngOnDestroy(){
      if (this.subs != null){
        this.subs.unsubscribe();
      }
    }
}
