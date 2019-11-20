import { BadgeService } from './services/api/badge.service';
import { DriverService } from './services/api/driver.service';

import { ProxyService, AuthenticationService, VehicleService } from './services';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [VehicleService, ProxyService, AuthenticationService,DriverService,BadgeService]
    };
  }
}
