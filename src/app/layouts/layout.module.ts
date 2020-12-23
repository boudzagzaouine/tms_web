import { VehicleComponent } from './vehicle/vehicle.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmationService } from 'primeng/api';
import { SharedModule } from './../shared/shared.module';

import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { AppLayoutRoutingModule } from './layout-routing.module';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './/layout.component';
import { AppHeaderComponent } from './template/app-header/app-header.component';
import { AppSidebarComponent as AppSidebarComponent } from './template/app-sidebar/app-sidebar.component';
import { AppFooter as AppFooterComponent } from './template/app-footer/app-footer.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { NgxPermissionsModule } from 'ngx-permissions';
import {BreadcrumbModule} from 'primeng/breadcrumb';




@NgModule({
  declarations: [
    LayoutComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    AppFooterComponent,
 


  ],
  exports: [
    LayoutComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    AppFooterComponent,

  ],
  imports: [
    CommonModule,
     AppLayoutRoutingModule, 
     TranslateModule, 
     SharedModule,
     NgxPermissionsModule.forChild(),
     OverlayPanelModule,TableModule,
     BreadcrumbModule,

  ],

  providers: [ ConfirmationService]
})
export class LayoutModule {
}
