import { AuthenticationService } from './../../../shared/services/http/authentication.service';
import { PosService } from '../../../shared/services/pos.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../../../shared/services/global.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass = 'push-right';
    userName: string;
    todaySaleOrdersCount = 0;
    constructor(
        private translate: TranslateService,
        public router: Router,
        public authService: AuthenticationService,
        private posService: PosService,
        private globalService: GlobalService
    ) {}

    ngOnInit() {
        this.translate.addLangs([
            'en',
            'fr',
            'ur',
            'es',
            'it',
            'fa',
            'de',
            'zh-CHS'
        ]);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(
            browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/)
                ? browserLang
                : 'en'
        );

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });

        this.userName = this.authService.getCurrentUser().name;
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
        this.cropSidebar(false);
    }

    cropSidebar(toggle = true) {
        const dom = document.querySelectorAll('.sidebar-label');
        const sidebar = document.querySelector('.sidebar');
        const main_container = document.querySelector('.main-container');

        if (toggle) {
            sidebar.classList.toggle('cropped');
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

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
       this.authService.logout();
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onRegisterDetailsClick() {
       this.todaySaleOrdersCount = this.posService.getTodaySaleOrders().length;
    }

    onClosePosClicked() {
        this.posService.closePos();
    }
}
