import { ProxyService } from './services/http/proxy.service';
import { UserService } from './services/http/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NumberDirective } from './directives';
import {
    AccountService,
    AuthenticationService,
    AdminService,
   } from './services';


@NgModule({
    imports: [
        CommonModule
    ],

    declarations: [ NumberDirective],
    exports: [
         NumberDirective
    ]

})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
          ngModule: SharedModule,
          providers: [
            AccountService,
            AuthenticationService,
            AdminService,
            UserService,
            ProxyService
        ]};
      }
 }
