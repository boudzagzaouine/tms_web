import { REST_URL, POS_INIT_AMOUNT_STORAGE, POS_SELECTED_SALE_ORDER } from '../../utils/constants';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';
import 'rxjs/add/operator/map';
import { User } from '../../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthenticationService {
    private currentUser: User;
    token: string;

    constructor(private http: HttpClient,
                private router: Router,
                private toast: ToastrService) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(email: string, password: string) {
        const pass = Md5.hashStr(password);
        console.log(REST_URL + 'authentification?email=' + email + '&password=' + pass);

        this.http.get<User>(REST_URL + 'authentification?email=' + email + '&password=' + pass)
        .subscribe(
            user => {
                this.currentUser = user;
                if ( this.currentUser !== undefined && this.currentUser !== null ) {
                    this.currentUser.columns = '';
                    this.currentUser.agencies = null;
                    this.currentUser.saleOrders = null;
                    this.currentUser.userGroup = null;
                    console.log('current user : ');
                    console.log(this.currentUser);


                    localStorage.setItem('isLoggedin', 'true');
                    sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                    console.log(this.currentUser);
                    if (user.type === 1) {
                        this.router.navigate(['/dashboard']);
                    } else {
                        this.router.navigate(['/pos']);
                    }
                    this.toast.success('Successfully logged in', 'Welcome');
                } else {
                    this.toast.error('information érroné', 'Erreur');
                }
            },
            error => {
                this.toast.error( 'La connextion au serveur ne peut pas être établie !', 'Erreur de connextion');
                console.log(error);
        }
        );
    }

    getCurrentUser() {
       const user: User = JSON.parse(sessionStorage.getItem('currentUser'));
       if ( user !== undefined && user !== null) {
           console.log(' is user admin : ' + user.type);

        return user;
    }
    return null;
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('isLoggedin');
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem(POS_INIT_AMOUNT_STORAGE);
        localStorage.removeItem(POS_SELECTED_SALE_ORDER);
        sessionStorage.removeItem(POS_SELECTED_SALE_ORDER);
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
        if (this.getCurrentUser() !== null) {
             const times: number = Date.now() + 1000 * 60 * 60;
            const str: string = this.getCurrentUser().name + ':' + times + ':' + this.getCurrentUser().password + ':obfuscate';
            const token: string = this.getCurrentUser().email + ':' + times + ':' + Md5.hashStr(str);
            // console.log('TOKEN :        ' + token );
        return token;
        } else {
            return '';
        }

    }
}
