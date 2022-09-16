import { SupplierInvoiceEditComponent } from './supplier-invoice-edit/supplier-invoice-edit.component';
import { SupplierInvoiceListComponent } from './supplier-invoice-list/supplier-invoice-list.component';
import { StepsModule } from 'primeng/steps';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { NgxPrintModule } from 'ngx-print';
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

import { SupplierInvoiceRoutingModule } from './supplier-invoice-routing.module';
import { SupplierInvoiceComponent } from './supplier-invoice.component';
import {  BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [SupplierInvoiceComponent, SupplierInvoiceListComponent,SupplierInvoiceEditComponent],
  imports: [
    CommonModule,
    SupplierInvoiceRoutingModule,
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
    DialogModule,
    NgxPrintModule,
    BreadcrumbModule
  ]
})
export class SupplierInvoiceModule { }
