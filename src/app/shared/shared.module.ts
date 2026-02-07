import { AccordionModule } from 'primeng/accordion';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TreeTableModule } from 'primeng/treetable';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PickListModule } from 'primeng/picklist';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { CheckboxModule } from 'primeng/checkbox';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HasPermissionDirective } from './directive/hasPermission.directive';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { OrderList, OrderListModule } from 'primeng/orderlist';
import { InputNumberModule } from 'primeng/inputnumber';
import { SidebarModule } from 'primeng/sidebar';
import { DataTableComponent } from './components/data-table/data-table.component';

@NgModule({
  declarations: [DataTableComponent, HasPermissionDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgxSpinnerModule,
    ConfirmDialogModule,
    ContextMenuModule,
    TranslateModule,
    DropdownModule,
    TableModule,
    AutoCompleteModule,
    CalendarModule,
    InputTextModule,
    KeyFilterModule,
    CheckboxModule,
    TabMenuModule,
    TabViewModule,
    PanelModule,
    MultiSelectModule,
    BreadcrumbModule,
    SplitButtonModule,
    DialogModule,
    PaginatorModule,
    PanelModule,
    FieldsetModule,
    RadioButtonModule,
    NgxPermissionsModule.forChild(),
    BreadcrumbModule,
    PickListModule,
    SelectButtonModule,
    StepsModule,
    OverlayPanelModule,
    TreeTableModule,
    ScrollPanelModule,
    ToastModule,
    AccordionModule,
    CardModule, OrderListModule, InputNumberModule, SidebarModule
  ],
  exports: [
    DataTableComponent, NgxPermissionsModule, HasPermissionDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgxSpinnerModule,
    ConfirmDialogModule,
    ContextMenuModule,
    TranslateModule,
    DropdownModule,
    TableModule,
    AutoCompleteModule,
    CalendarModule,
    InputTextModule,
    KeyFilterModule,
    CheckboxModule,
    TabMenuModule,
    TabViewModule,
    PanelModule,
    MultiSelectModule,
    BreadcrumbModule,
    SplitButtonModule,
    DialogModule,
    PaginatorModule,
    PanelModule,
    FieldsetModule,
    RadioButtonModule,
    BreadcrumbModule,
    PickListModule,
    SelectButtonModule,
    StepsModule,
    OverlayPanelModule,
    TreeTableModule,
    ScrollPanelModule,
    ToastModule,
    AccordionModule,
    CardModule, OrderListModule, InputNumberModule,
    SidebarModule
  ]
})
export class SharedModule { }
