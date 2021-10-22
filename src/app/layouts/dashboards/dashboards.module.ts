import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { DashboardsComponent } from './dashboards.component';
import { DashboardVehicleComponent } from './dashboard-vehicle/dashboard-vehicle.component';
import {CalendarModule} from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TabViewModule } from 'primeng/tabview';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ContextMenuModule } from 'primeng/contextmenu';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DashboardDriverComponent } from './dashboard-driver/dashboard-driver.component';
import {ChartModule} from 'primeng/chart';
import {ProgressBarModule} from 'primeng/progressbar';


@NgModule({
  declarations: [DashboardsComponent, DashboardVehicleComponent, DashboardDriverComponent],
  imports: [
    CommonModule,
    CalendarModule,
    ButtonModule,
    SharedModule,
    AutoCompleteModule,
    DropdownModule,
    PanelModule,
    TableModule,
    DashboardsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    InputTextModule,
    
    NgxSpinnerModule,
  
    CalendarModule,
    ConfirmDialogModule,
    TabViewModule,
    KeyFilterModule,
    NgbModalModule,
    NgxSpinnerModule,
    ConfirmDialogModule,
    ContextMenuModule,
    StepsModule,
    PanelModule,
    BreadcrumbModule,
    ToastModule,
    ChartModule ,

    ProgressBarModule
  ]
})
export class DashboardsModule { }
