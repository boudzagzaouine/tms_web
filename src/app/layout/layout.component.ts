import { AuthenticationService } from './../shared/services/http/authentication.service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Router } from '@angular/router';
import { GlobalService } from '../shared';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    animations: [routerTransition()]
})
export class LayoutComponent implements OnInit {
    isAdmin: boolean;
    constructor(private authService: AuthenticationService,
                private router: Router,
            private globalService: GlobalService) {}

    ngOnInit() {
        this.isAdmin = this.authService.getCurrentUser().type === 1 ;
        console.log('current user role : ' + this.isAdmin);

        if (!this.isAdmin) {
            this.cropSidebar();
            this.router.navigate(['/pos']);
         }

         this.globalService.ngOnInit();
    }
    cropSidebar() {
        const main_container = document.querySelector('.main-container');
         main_container.classList.toggle('full-width-no-sidebar');
    }
}
