import { TransportPlanTransportEditComponent } from './transport-plan-edit/transport-plan-transport-edit/transport-plan-transport-edit.component';
import { TransportPlanEditComponent } from './transport-plan-edit/transport-plan-edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { TreeTableModule } from 'primeng/treetable';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportPlanComponent } from './transport-plan.component';

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

    ContextMenuModule,
    StepsModule,
    PanelModule,
    BreadcrumbModule ,
    PickListModule,
    SelectButtonModule,
    MultiSelectModule,
    DialogModule,
    OverlayPanelModule,
     TreeTableModule
  ],
  declarations: [TransportPlanComponent,TransportPlanEditComponent,TransportPlanTransportEditComponent]
})
export class TransportPlanModule { }
