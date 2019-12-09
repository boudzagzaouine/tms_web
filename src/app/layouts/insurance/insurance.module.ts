import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';

import { InsuranceRoutingModule } from './insurance-routing.module';
import { InsuranceComponent } from './insurance.component';
import { InsuranceListComponent } from './insurance-list/insurance-list.component';
import { InsuranceEditComponent } from './insurance-edit/insurance-edit.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';


@NgModule({
  declarations: [InsuranceComponent, InsuranceListComponent, InsuranceEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InsuranceRoutingModule,
    NgbModalModule,
    NgxSpinnerModule,
    ConfirmDialogModule,
    ContextMenuModule,
    SharedModule,
    TranslateModule,
    DropdownModule,
    TableModule,
    AutoCompleteModule,
    CalendarModule,
    InputTextModule,
    KeyFilterModule
  ]
})
export class InsuranceModule { }
