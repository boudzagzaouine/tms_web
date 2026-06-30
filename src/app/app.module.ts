import { NgPipesModule } from 'ngx-pipes';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AuthenticationService } from './shared/services/api/authentication.service';
import { registerLocaleData } from '@angular/common';
import { AppComponent } from './/app.component';
import { AppRoutingModule } from './/app-routing.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './auth/interceptors/jwt.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { NgxPermissionsModule } from 'ngx-permissions';
import localeFr from '@angular/common/locales/fr';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(localeFr, 'fr');

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
])

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
    ToastModule,
    FullCalendarModule,
    CoreModule.forRoot(),
    SharedModule,  // ← Just normal import, no .forRoot()
    NgxPermissionsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot({
      preventDuplicates: false,
      timeOut: 2000,
      autoDismiss: true,
      closeButton: true,
      maxOpened: 2,
      newestOnTop: true,
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // Re-hydrate habilitations from the stored profile before the app renders (refresh-safe).
    {
      provide: APP_INITIALIZER,
      useFactory: (auth: AuthenticationService) => () => auth.restoreSession(),
      deps: [AuthenticationService],
      multi: true,
    },
  ],
})
export class AppModule { }