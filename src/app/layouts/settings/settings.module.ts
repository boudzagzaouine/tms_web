import { VehicleComponent } from './../vehicle/vehicle.component';
import { PatrimonyTypeEditComponent } from './patrimony-type/patrimony-type-edit/patrimony-type-edit.component';
import { PatrimonyTypeComponent } from './patrimony-type/patrimony-type.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { SupplierEditComponent } from './supplier/supplier-edit/supplier-edit.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule, TableHeaderCheckbox, TableCheckbox } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {KeyFilterModule} from 'primeng/keyfilter';

import { SettingsRoutingModule } from './settings-routing.module';
import { BadgeTypeEditComponent } from './badge-type/badge-type-edit/badge-type-edit.component';
import { BadgeTypeComponent } from './badge-type/badge-type.component';
import { InsuranceTermComponent } from './insurance-term/insurance-term.component';
import { InsuranceEditComponent } from './insurance/insurance-edit/insurance-edit.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { BadgeEditComponent } from './badge/badge-edit/badge-edit.component';
import { BadgeComponent } from './badge/badge.component';
import { SettingsComponent } from './settings.component';
import { MaintenanceStatusComponent } from './maintenance-status/maintenance-status.component';
import { MaintenanceTypeComponent } from './maintenance-type/maintenance-type.component';
import { MaintenanceActionComponent } from './maintenance-action/maintenance-action.component';
import { MaintenanceLineRefComponent } from './maintenance-line-ref/maintenance-line-ref.component';
import { ContractTypeComponent } from './contract-type/contract-type.component';
import { SupplierComponent } from './supplier/supplier.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {ContextMenuModule} from 'primeng/contextmenu';
import { MaintenanceTypeEditComponent } from './maintenance-type/maintenance-type-edit/maintenance-type-edit.component';
import { MaintenanceStatusEditComponent } from './maintenance-status/maintenance-status-edit/maintenance-status-edit.component';
import { MaintenanceActionEditComponent } from './maintenance-action/maintenance-action-edit/maintenance-action-edit.component';
import { MaintenanceLineRefEditComponent } from './maintenance-line-ref/maintenance-line-ref-edit/maintenance-line-ref-edit.component';
import { ContractTypeEditComponent } from './contract-type/contract-type-edit/contract-type-edit.component';
import { VehicleCategorieComponent } from './vehicle-categorie/vehicle-categorie.component';
import { VehicleCategorieEditComponent } from './vehicle-categorie/vehicle-categorie-edit/vehicle-categorie-edit.component';
import { CommissionTypeComponent } from './commission-type/commission-type.component';
import { CommissionTypeEditComponent } from './commission-type/commission-type-edit/commission-type-edit.component';
import {CheckboxModule} from 'primeng/checkbox';
import { InsuranceTypeComponent } from './insurance-type/insurance-type.component';
import { InsuranceTypeEditComponent } from './insurance-type/insurance-type-edit/insurance-type-edit.component';
import { TermEditComponent } from './insurance-type/insurance-type-edit/term-edit/term-edit.component';
import { TransportCategoryVehicleComponent } from './transport-category-vehicle/transport-category-vehicle.component';
import { TransportCategoryVehicleEditComponent } from './transport-category-vehicle/transport-category-vehicle-edit/transport-category-vehicle-edit.component';
import { CatalogTransportTypeComponent } from './catalog-transport-type/catalog-transport-type.component';
import { CatalogTransportTypeEditComponent } from './catalog-transport-type/catalog-transport-type-edit/catalog-transport-type-edit.component';
import { ComsumptionTypeComponent } from './comsumption-type/comsumption-type.component';
import { ConsumptionTypeEditComponent } from './comsumption-type/consumption-type-edit/consumption-type-edit.component';
import { MenuInsuranceComponent } from './menu-insurance/menu-insurance.component';

import {TabMenuModule} from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import {PanelModule} from 'primeng/panel';
import { MenuVehicleComponent } from './menu-vehicle/menu-vehicle.component';
import { MenuMaintenanceComponent } from './menu-maintenance/menu-maintenance.component';
import { MenuDriverComponent } from './menu-driver/menu-driver.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import {DialogModule} from 'primeng/dialog';
import {PaginatorModule} from 'primeng/paginator';
import { InsuranceTermEdiitComponent } from './insurance-term/insurance-term-ediit/insurance-term-ediit.component';
import { TestDataTableComponent } from './test-data-table/test-data-table.component';
import { ZoneComponent } from './zone/zone.component';
import { ZoneEditComponent } from './zone/zone-edit/zone-edit.component';
import { TransportComponent } from './transport/transport.component';
import { TransportEditComponent } from './transport/transport-edit/transport-edit.component';
import {FieldsetModule} from 'primeng/fieldset';
import { TermEdiitComponent } from './insurance/insurance-edit/term-ediit/term-ediit.component';
import { ProductComponent } from './product/product.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { ProductTypeEditComponent } from './product-type/product-type-edit/product-type-edit.component';
import { MenuProductComponent } from './menu-product/menu-product.component';
import { InputNumber, InputNumberModule } from 'primeng/inputnumber';
import { NotificationComponent } from './notification/notification.component';
import {ProgressBarModule} from 'primeng/progressbar';
import { ConfigMessageComponent } from './configMessage/configMessage.component';
import { EditorModule } from 'primeng/editor';
import { DieselDeclarationComponent } from './diesel-declaration/diesel-declaration.component';
import { DieselDeclarationEditComponent } from './diesel-declaration/diesel-declaration-edit/diesel-declaration-edit.component';



@NgModule({
  declarations: [
    SupplierComponent,
    SupplierEditComponent,
    SettingsComponent,
    BadgeComponent,
    BadgeEditComponent,
    BadgeTypeComponent,
    BadgeTypeEditComponent,
    InsuranceComponent,
    InsuranceEditComponent,
    InsuranceTermComponent,
    InsuranceTermEdiitComponent,
    MaintenanceStatusComponent,
    MaintenanceStatusEditComponent,
    MaintenanceTypeComponent,
    MaintenanceTypeEditComponent,
    MaintenanceActionComponent,
    MaintenanceActionEditComponent,
    MaintenanceLineRefComponent,
    MaintenanceLineRefEditComponent,
    ContractTypeComponent,
    ContractTypeEditComponent,
    VehicleCategorieComponent,
    VehicleCategorieEditComponent,
    CommissionTypeComponent,
    CommissionTypeEditComponent,
    InsuranceTypeComponent,
    InsuranceTypeEditComponent,
    TermEditComponent,
    TransportCategoryVehicleComponent,
    TransportCategoryVehicleEditComponent,
    CatalogTransportTypeComponent,
    CatalogTransportTypeEditComponent,
    ComsumptionTypeComponent,
    ConsumptionTypeEditComponent,
    MenuInsuranceComponent,
    MenuVehicleComponent,
    MenuMaintenanceComponent,
    MenuDriverComponent,
    InsuranceTermEdiitComponent,
    TestDataTableComponent,
    PatrimonyTypeComponent,
    PatrimonyTypeEditComponent,
    ZoneComponent,
    ZoneEditComponent,
    TransportComponent,
    TransportEditComponent,
    TermEdiitComponent,
    ProductComponent,
    ProductEditComponent,
    ProductTypeComponent,
    ProductTypeEditComponent,
    MenuProductComponent,
    NotificationComponent,
    ConfigMessageComponent,
    DieselDeclarationComponent,
    DieselDeclarationEditComponent
    


  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    NgbModalModule,
    NgxSpinnerModule,
    ConfirmDialogModule,
    ContextMenuModule,
    SharedModule,
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
    SplitButtonModule,
    DialogModule,
  PaginatorModule,
  FieldsetModule,
  InputNumberModule,
  ProgressBarModule,
  EditorModule,

  ]
})
export class SettingsModule { }
