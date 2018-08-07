import { AuthenticationService } from './../../../shared/services/http/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../shared/models';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    isActive = false;
    showMenu = '';
    pushRightClass = 'push-right';
    currentUser: User;
    sidebarcropped = false;

    constructor(private translate: TranslateService,
         public router: Router,
        public authService: AuthenticationService,
) {

    }
    ngOnInit(): void {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });

        this.currentUser  = this.authService.getCurrentUser();
    }
    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        this.authService.logout();
    }

    cropSidebar(toggle = true) {
        const dom = document.querySelectorAll('.sidebar-label');
        const sidebar = document.querySelector('.sidebar');
        const main_container = document.querySelector('.main-container');

        if (toggle) {
            this.sidebarcropped = sidebar.classList.toggle('cropped');
            main_container.classList.toggle('full-width');
        } else {
            sidebar.classList.remove('cropped');
        }
        console.log(dom);
        for (let index = 0; index < dom.length; index++) {
            if (toggle) {
                const element = dom.item(index).classList.toggle('not-visible');
            } else {
                const element = dom.item(index).classList.remove('not-visible');
            }
        }
    }
}
