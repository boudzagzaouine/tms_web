import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenancePlanRoutingModule } from './maintenance-plan-routing.module';
import { MaintenancePlanComponent } from './maintenance-plan.component';
import { MaintenancePlanEditComponent } from './maintenance-plan-edit/maintenance-plan-edit.component';
import { MaintenancePlanListComponent } from './maintenance-plan-list/maintenance-plan-list.component';


@NgModule({
  declarations: [MaintenancePlanComponent, MaintenancePlanEditComponent, MaintenancePlanListComponent],
  imports: [
    CommonModule,
    MaintenancePlanRoutingModule,
    TranslateModule,
    InputTextModule,
    TableModule,
    CalendarModule,
    DropdownModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AutoCompleteModule,
    ConfirmDialogModule,

  ]
})
export class MaintenancePlanModule { }
