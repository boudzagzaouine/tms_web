import { SharedModule } from './../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SettingsRoutingModule } from './settings-routing.module';
import { BadgeTypeEditComponent } from './badge-type/badge-type-edit/badge-type-edit.component';
import { BadgeTypeComponent } from './badge-type/badge-type.component';
import { InsuranceTermComponent } from './insurance-term/insurance-term.component';
import { InsuranceEditComponent } from './insurance/insurance-edit/insurance-edit.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { BadgeEditComponent } from './badge/badge-edit/badge-edit.component';
import { BadgeComponent } from './badge/badge.component';
import { SettingsComponent } from './settings.component';
import { InsuranceTermEditComponent } from './insurance-term/insurance-term-edit/insurance-term-edit.component';
import { MaintenanceStatusComponent } from './maintenance-status/maintenance-status.component';
import { MaintenanceTypeComponent } from './maintenance-type/maintenance-type.component';
import { ContractTypeComponent } from './contract-type/contract-type.component';
import { SupplierComponent } from './supplier/supplier.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    SupplierComponent,
    SettingsComponent,
    BadgeComponent,
    BadgeEditComponent,
    BadgeTypeComponent,
    BadgeTypeEditComponent,
    InsuranceComponent,
    InsuranceEditComponent,
    InsuranceTermComponent,
    InsuranceTermEditComponent,
    MaintenanceStatusComponent,
    MaintenanceTypeComponent,
    ContractTypeComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    NgbModalModule,
    SharedModule,
    DropdownModule,
    TableModule,
    AutoCompleteModule,
    CalendarModule,
    InputTextModule
  ]
})
export class SettingsModule { }
