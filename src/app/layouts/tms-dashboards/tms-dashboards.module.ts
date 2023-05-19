import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TmsDashboardsRoutingModule } from './tms-dashboards-routing.module';
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
import {ChartModule} from 'primeng/chart';
import {ProgressBarModule} from 'primeng/progressbar';
import { TmsDashboardVehicleComponent } from './tms-dashboard-vehicle/tms-dashboard-vehicle.component';
import { TmsDashboardDriverComponent } from './tms-dashboard-driver/tms-dashboard-driver.component';
import { TransportComponent } from './transport/transport.component';
@NgModule({
  providers:[DatePipe],
  declarations: [TmsDashboardVehicleComponent, TmsDashboardDriverComponent, TransportComponent],
  imports: [
    CommonModule,
    TmsDashboardsRoutingModule,
    CalendarModule,
    ButtonModule,
    SharedModule,
    AutoCompleteModule,
    DropdownModule,
    PanelModule,
    TableModule,
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
export class TmsDashboardsModule { }
