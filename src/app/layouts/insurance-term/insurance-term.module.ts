import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceTermRoutingModule } from './insurance-term-routing.module';
import { InsuranceTermComponent } from './insurance-term.component';
import { InsuranceTermEditComponent } from './insurance-term-edit/insurance-term-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [InsuranceTermComponent, InsuranceTermEditComponent],
  imports: [
    CommonModule,
    InsuranceTermRoutingModule,
    TableModule,
    InputTextModule,
    NgbModule,
    CalendarModule,
    DropdownModule
  ]
})
export class InsuranceTermModule { }
