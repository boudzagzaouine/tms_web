import { POS_INIT_AMOUNT_STORAGE } from '../shared/utils/constants';
import { AuthenticationService } from '../shared/services/http/authentication.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { UserService } from '../shared/services/http/user.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    @ViewChild('f') loginForm: NgForm;
    errorMessage: string;

    constructor(private userService: UserService,
                private authService: AuthenticationService,
                public router: Router) {}

    ngOnInit() {
        if (sessionStorage.getItem('currentUser')) {
            this.router.navigate(['/']);
        }
    }

    onLogin() {
        localStorage.removeItem(POS_INIT_AMOUNT_STORAGE);
        const email = this.loginForm.value['email'];
        const password = this.loginForm.value['password'];

        this.authService.login(email, password);
    }
}
