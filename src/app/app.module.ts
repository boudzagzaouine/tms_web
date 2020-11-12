import { NgPipesModule } from 'ngx-pipes';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { AppComponent } from './/app.component';
import { AppRoutingModule } from './/app-routing.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { NgxPermissionsModule } from 'ngx-permissions';
import localeFr from '@angular/common/locales/fr';
import { OverlayPanelModule } from 'primeng/overlaypanel';

//  AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  //  for development
  //  return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OverlayPanelModule,
    HttpClientModule,
    NgPipesModule,
    SharedModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    ToastrModule.forRoot({
      preventDuplicates: false,
      timeOut: 700,
      autoDismiss: true,
      closeButton: true,
      maxOpened: 2,
      newestOnTop: true,
    }),


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
