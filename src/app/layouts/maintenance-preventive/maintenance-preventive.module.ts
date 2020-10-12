import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PanelModule } from 'primeng/panel';
import { StepsModule } from 'primeng/steps';
import { ContextMenuModule } from 'primeng/contextmenu';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenancePreventiveRoutingModule } from './maintenance-preventive-routing.module';
import { MaintenancePreventiveComponent } from './maintenance-preventive.component';
import { MaintenancePreventiveEditComponent } from './maintenance-preventive-edit/maintenance-preventive-edit.component';
import { ActionEditComponent } from './maintenance-preventive-edit/action-edit/action-edit.component';
import { ProductEditComponent } from './maintenance-preventive-edit/action-edit/product-edit/product-edit.component';
import { MaintenancePreventiveListComponent } from './maintenance-preventive-list/maintenance-preventive-list.component';
import { PlanActionEditComponent } from './maintenance-preventive-edit/plan-action-edit/plan-action-edit.component';


@NgModule({
  declarations: [MaintenancePreventiveComponent, MaintenancePreventiveEditComponent,
     ActionEditComponent, ProductEditComponent, 
    MaintenancePreventiveListComponent,PlanActionEditComponent],
  imports: [
    CommonModule,
    MaintenancePreventiveRoutingModule,
    SharedModule,
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
    ContextMenuModule,
    StepsModule,
    PanelModule,
   SelectButtonModule,
   InputNumberModule,
   DialogModule,
   MultiSelectModule,

  ]
})
export class MaintenancePreventiveModule { }
