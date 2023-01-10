import { TransportPlanVehicleListComponent } from './transport-plan-add/transport-plan-vehicle-list/transport-plan-vehicle-list.component';
import { TransportPlanServiceEditComponent } from './transport-plan-add/transport-plan-service-edit/transport-plan-service-edit.component';
import { TransportPlanAddComponent } from './transport-plan-add/transport-plan-add.component';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FieldsetModule } from 'primeng/fieldset';
import { TreeTableModule } from 'primeng/treetable';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { PickListModule } from 'primeng/picklist';
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
import { TransportPlanRoutingModule } from './transport-plan-routing.module';
import { TransportPlanListComponent } from './transport-plan-list/transport-plan-list.component';
import { TransportPlanEditComponent } from './transport-plan-edit/transport-plan-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportPlanComponent } from './transport-plan.component';
import {OrderListModule} from 'primeng/orderlist';
import {CheckboxModule} from 'primeng/checkbox';
import {DataViewModule} from 'primeng/dataview';

@NgModule({
  imports: [
    CommonModule,
    TransportPlanRoutingModule,
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
    BreadcrumbModule ,
    PickListModule,
    SelectButtonModule,
    MultiSelectModule,
    DialogModule,
    OverlayPanelModule,
     TreeTableModule,
     FieldsetModule,
     ScrollPanelModule,
     RadioButtonModule,
     ToastModule,
     CardModule,
     TimelineModule,
     OrderListModule,
     SelectButtonModule,
     CheckboxModule,
     DataViewModule
  ],
  declarations: [TransportPlanComponent,TransportPlanEditComponent,TransportPlanListComponent,TransportPlanAddComponent,TransportPlanServiceEditComponent,TransportPlanVehicleListComponent]
})
export class TransportPlanModule { }
