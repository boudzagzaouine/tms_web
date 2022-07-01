import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PanelModule } from 'primeng/panel';
import { ContextMenuModule } from 'primeng/contextmenu';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleComponent } from './vehicle.component';
import {DropdownModule} from 'primeng/dropdown';
import { VehicleEditComponent } from './vehicle-edit/vehicle-edit.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import {TabViewModule} from 'primeng/tabview';
import {KeyFilterModule} from 'primeng/keyfilter';
import { VehiculeEditLineComponent } from './vehicle-edit/vehicule-edit-line/vehicule-edit-line.component';
import {StepsModule} from 'primeng/steps';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { VehicleProductComponent } from './vehicle-edit/vehicle-product/vehicle-product.component';

@NgModule({
  declarations: [VehicleComponent, VehicleEditComponent , VehicleListComponent, VehiculeEditLineComponent,VehicleProductComponent ],
  imports: [
    CommonModule,
    VehicleRoutingModule,
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
    DialogModule

  ],
  providers:[MessageService],

})
export class VehicleModule { }
