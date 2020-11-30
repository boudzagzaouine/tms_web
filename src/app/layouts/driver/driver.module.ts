import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ContextMenuModule } from 'primeng/contextmenu';
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
import { BadgeDriverEditComponent } from './driver-edit/badge-driver-edit/badge-driver-edit.component';
import { DriverCommissionEditComponent } from './driver-edit/driver-commission-edit/driver-commission-edit.component';
import { DriverBadgeEditComponent } from './driver-edit/driver-badge-edit/driver-badge-edit.component';
import { DialogModule } from 'primeng/dialog';




@NgModule({
  declarations: [DriverComponent , DriverListComponent, DriverEditComponent, BadgeDriverEditComponent, DriverCommissionEditComponent,DriverBadgeEditComponent],
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
     KeyFilterModule,
     ContextMenuModule,
     NgbModalModule,
     TabViewModule,
     PanelModule,
     DialogModule


  ]
})
export class DriverModule { }
