import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModule } from './../shared/shared.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { LayoutComponent } from './/layout.component';
import { AppLayoutRoutingModule } from './layout-routing.module';
import { AppFooter as AppFooterComponent } from './template/app-footer/app-footer.component';
import { AppHeaderComponent } from './template/app-header/app-header.component';
import { AppSidebarComponent } from './template/app-sidebar/app-sidebar.component';




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
    AppFooterComponent

  ],
  imports: [
    CommonModule,
    AppLayoutRoutingModule,
    TranslateModule,
    SharedModule,
    NgxPermissionsModule.forChild(),
    OverlayPanelModule, TableModule,
    BreadcrumbModule,
    ToastModule,

  ],

  providers: [ConfirmationService, MessageService]
})
export class LayoutModule {
}
