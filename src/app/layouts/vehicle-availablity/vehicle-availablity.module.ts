import { VehicleAvailabilityEditComponent } from './vehicle-availability-list/vehicle-availability-edit/vehicle-availability-edit.component';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { StepsModule } from 'primeng/steps';
import { ContextMenuModule } from 'primeng/contextmenu';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from './../../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleAvailablityRoutingModule } from './vehicle-availablity-routing.module';
import { VehicleAvailablityComponent } from './vehicle-availablity.component';
import { VehicleAvailabilityListComponent } from './vehicle-availability-list/vehicle-availability-list.component';
import {GMapModule} from 'primeng/gmap';


@NgModule({
  declarations: [VehicleAvailablityComponent, VehicleAvailabilityListComponent,VehicleAvailabilityEditComponent],
  imports: [
    CommonModule,
    VehicleAvailablityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    InputTextModule,
    TableModule,
    DropdownModule,
    AutoCompleteModule,
    NgxSpinnerModule,
    SharedModule,
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
    SelectButtonModule,
    DialogModule,
    GMapModule
  ]
})
export class VehicleAvailablityModule { }
