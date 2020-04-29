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
import { InsuranceTermEditComponent } from './insurance-term/insurance-term-edit/insurance-term-edit.component';
import { MaintenanceStatusComponent } from './maintenance-status/maintenance-status.component';
import { MaintenanceTypeComponent } from './maintenance-type/maintenance-type.component';
import { ContractTypeComponent } from './contract-type/contract-type.component';
import { SupplierComponent } from './supplier/supplier.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {ContextMenuModule} from 'primeng/contextmenu';
import { MaintenanceTypeEditComponent } from './maintenance-type/maintenance-type-edit/maintenance-type-edit.component';
import { MaintenanceStatusEditComponent } from './maintenance-status/maintenance-status-edit/maintenance-status-edit.component';
import { ContractTypeEditComponent } from './contract-type/contract-type-edit/contract-type-edit.component';
import { VehicleCategorieComponent } from './vehicle-categorie/vehicle-categorie.component';
import { VehicleCategorieEditComponent } from './vehicle-categorie/vehicle-categorie-edit/vehicle-categorie-edit.component';
import { CommissionTypeComponent } from './commission-type/commission-type.component';
import { CommissionTypeEditComponent } from './commission-type/commission-type-edit/commission-type-edit.component';
import {CheckboxModule} from 'primeng/checkbox';
import { ConsomtionTypeComponent } from './consomtion-type/consomtion-type.component';
import { ConsomtionTypeEditComponent } from './consomtion-type/consomtion-type-edit/consomtion-type-edit.component';
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
    InsuranceTermEditComponent,
    MaintenanceStatusComponent,
    MaintenanceStatusEditComponent,
    MaintenanceTypeComponent,
    MaintenanceTypeEditComponent,
    ContractTypeComponent,
    ContractTypeEditComponent,
    VehicleCategorieComponent,
    VehicleCategorieEditComponent,
    CommissionTypeComponent,
    CommissionTypeEditComponent,
    ConsomtionTypeComponent,
    ConsomtionTypeEditComponent,
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
  PaginatorModule
 

  ]
})
export class SettingsModule { }
