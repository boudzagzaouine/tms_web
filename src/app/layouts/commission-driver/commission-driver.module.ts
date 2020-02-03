import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ContextMenuModule } from 'primeng/contextmenu';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SharedModule } from './../../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommissionDriverRoutingModule } from './commission-driver-routing.module';
import { CommissionDriverComponent } from './commission-driver.component';
import { CommissionDriverEditComponent } from './commission-driver-edit/commission-driver-edit.component';
import { CommissionDriverListComponent } from './commission-driver-list/commission-driver-list.component';


@NgModule({
  declarations: [CommissionDriverComponent, CommissionDriverEditComponent, CommissionDriverListComponent],
  imports: [
    CommonModule,
    CommissionDriverRoutingModule,
    FormsModule,
    TranslateModule,
    InputTextModule,
    TableModule,
    CalendarModule,
    DropdownModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SharedModule,
    AutoCompleteModule,
    ConfirmDialogModule,
     KeyFilterModule,
     ContextMenuModule,
     NgbModalModule
  ],

})
export class CommissionDriverModule { }
