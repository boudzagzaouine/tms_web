import { TransportPlanListCancelComponent } from './transport-plan-list-cancel/transport-plan-list-cancel.component';
import { TransportPlanCancelComponent } from './transport-plan-list/transport-plan-cancel/transport-plan-cancel.component';
import { InvoiceTransportPlanComponent } from './invoice-transport-plan/invoice-transport-plan.component';
import { InvoicePlanTransportComponent } from './../invoice-plan-transport/invoice-plan-transport.component';
import { NgxPrintModule } from 'ngx-print';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TransportPlanRejeterComponent } from './transport-plan-rejeter/transport-plan-rejeter.component';
import { TransportPlanRefusComponent } from './transport-plan-refus/transport-plan-refus.component';
import { TransportPlanHistoryComponent } from './transport-plan-add/transport-plan-history/transport-plan-history.component';
import { TransportPlanHistory } from './../../shared/models/transport-plan-history';
import { TransportPlanVehicleListComponent } from './transport-plan-add/transport-plan-vehicle-list/transport-plan-vehicle-list.component';
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
import { TransportPlanServiceEditComponent } from './transport-plan-edit/transport-plan-service-edit/transport-plan-service-edit.component';
import {RatingModule} from 'primeng/rating';

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
     DataViewModule,
     SplitButtonModule,
     RatingModule,
     NgxPrintModule,
  ],
  declarations: [TransportPlanComponent,TransportPlanEditComponent,TransportPlanListComponent,TransportPlanAddComponent,TransportPlanServiceEditComponent,TransportPlanVehicleListComponent,
                   TransportPlanHistoryComponent,TransportPlanRefusComponent,TransportPlanRejeterComponent,InvoiceTransportPlanComponent,TransportPlanCancelComponent,TransportPlanListCancelComponent]
})
export class TransportPlanModule { }
