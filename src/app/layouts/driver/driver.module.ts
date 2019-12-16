import { NgxSpinnerModule } from 'ngx-spinner';

import { SharedModule } from './../../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';
import { DriverComponent } from './driver.component';
import {CalendarModule} from 'primeng/calendar';
import {KeyFilterModule} from 'primeng/keyfilter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { DriverEditComponent } from './driver-edit/driver-edit.component';
import { DriverListComponent } from './driver-list/driver-list.component';



@NgModule({
  declarations: [DriverComponent , DriverListComponent, DriverEditComponent],
  imports: [
    CommonModule,
    DriverRoutingModule,
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
     KeyFilterModule
  ]
})
export class DriverModule { }
