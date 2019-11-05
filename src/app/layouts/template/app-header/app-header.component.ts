import { AuthenticationService } from '../../../shared/services/api/authentication.service';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
})
export class AppHeaderComponent implements OnInit, AfterViewInit {

  constructor(
    private auth: AuthenticationService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.translate.addLangs([
      'en',
      'fr'
    ]);
    this.translate.setDefaultLang('fr');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(
      browserLang.match(/en|fr/)
        ? browserLang
        : 'fr'
    );
  }
  ngAfterViewInit() {
  }

  changeLang(language: string) {
    this.translate.use(language);
  }

  logout() {
    this.auth.logout();
  }
}
