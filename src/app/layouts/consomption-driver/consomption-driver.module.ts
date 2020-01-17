import { DropdownModule } from 'primeng/dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from './../../shared/shared.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ContextMenuModule } from 'primeng/contextmenu';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsomptionDriverRoutingModule } from './consomption-driver-routing.module';
import { ConsomptionDriverComponent } from './consomption-driver.component';
import { ConsomationDriverEditComponent } from './consomation-driver-edit/consomation-driver-edit.component';
import { ConsomptionDriverListComponent } from './consomption-driver-list/consomption-driver-list.component';


@NgModule({
  declarations: [ConsomptionDriverComponent, ConsomationDriverEditComponent, ConsomptionDriverListComponent],
  imports: [
    CommonModule,
    ConsomptionDriverRoutingModule,
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
  ]
})
export class ConsomptionDriverModule { }
