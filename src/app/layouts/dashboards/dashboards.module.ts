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


@NgModule({
  declarations: [DashboardsComponent, DashboardVehicleComponent],
  imports: [
    CommonModule,
    CalendarModule,
    ButtonModule,
    AutoCompleteModule,
    DropdownModule,
    PanelModule,
    TableModule,
    DashboardsRoutingModule
  ]
})
export class DashboardsModule { }
