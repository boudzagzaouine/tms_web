import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { LightboxModule } from 'ngx-lightbox';
import { NgxSpinnerModule } from 'ngx-spinner';


// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(localeFr, 'fr');


@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule.forRoot(),
        NgbModule.forRoot(),
        LightboxModule,
        NgxSpinnerModule.forRoot(),
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
            timeOut: 500,
            autoDismiss: true,
            closeButton: true,
            maxOpened : 2,
            newestOnTop: true
        }),


    ],
    declarations: [AppComponent],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
