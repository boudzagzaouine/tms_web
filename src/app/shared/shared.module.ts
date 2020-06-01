import { MachineService } from './services/api/machine.service';
import { PatrimonyTypeService } from './services/api/patrimony-type.service';
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
import { SettingsRoutingModule } from './../layouts/settings/settings-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/api/user.service';
import { AuthenticationService } from './services/api/authentication.service';
import { ConsumptionTypeService } from './services/api/consumption-type.service';
import { TurnLineService } from './services/api/turn-line.service';
import { SaleOrderService } from './services/api/sale-order.service';
import { TurnService } from './services/api/turn.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DeliveryLineService } from './services/api/delivery-line.service';
import { DeliveryService } from './services/api/Delivery.service';
import { VatServcie } from './services/api/vat.service';
import { CatalogTransportTypeServcie } from './services/api/Catalog-Transport-Type.service';
import { ZoneServcie } from './services/api/zone.service';
import { TransportServcie } from './services/api/transport.service';
import { TransportCategoryVehicleService } from './services/api/transport-category-vehicle.service';
import { CommissionDriverService } from './services/api/commision-driver.service';
import { InsuranceTypeTermsService } from './services/api/insurance-type-term.service';
import { InsuranceTypeService } from './services/api/insurance-type.service';
import { BadgeTypeDriverService } from './services/api/badge-type-driver.service';
import { CommissionTypeService } from './services/api/commisionType.service';
import { MaintenanceActionService } from './services/api/maintenance-action.service';
import { MaintenanceLineRefService } from './services/api/maintenance-line-ref.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import {
  BadgeTypeService,
  BadgeService,
  ContractTypeService,
  DriverService,
  InsuranceTermService,
  InsuranceService,
  MaintenancePlanService,
  MaintenanceStateService,
  MaintenanceTypeService,
  SupplierService,
  VehicleCategoryService,
  VehicleService
 } from './services';
import { SaleOrderStockService } from './services/api/sale-order-stock.service';
import { AccountService } from './services/api/account.service';
import { SaleOrderLineService } from './services/api/sale-order-line.service';
import { DataTableComponent } from './components/data-table/data-table.component';


@NgModule({
  declarations: [DataTableComponent],
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
    SplitButtonModule,
    DialogModule,
    PaginatorModule

  ],
  exports:[
    DataTableComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        BadgeTypeService,
        BadgeService,
        ContractTypeService,
        DriverService,
        InsuranceTermService,
        InsuranceService,
        MaintenancePlanService,
        MaintenanceStateService,
        MaintenanceTypeService,
        MaintenanceActionService,
        MaintenanceLineRefService,
        SupplierService,
        VehicleCategoryService,
        VehicleService,
        CommissionTypeService,
        BadgeTypeDriverService,
        InsuranceTypeService,
        InsuranceTypeTermsService,
        CommissionDriverService,
        TransportCategoryVehicleService,
        TransportServcie,
        ZoneServcie,
        CatalogTransportTypeServcie,
        VatServcie,
        DeliveryService,
        DeliveryLineService,
        MessageService,
        TurnService,
        SaleOrderStockService,
        AccountService,
        SaleOrderService,
        TurnLineService,
        SaleOrderLineService,
        ConsumptionTypeService,
        AuthenticationService,
        UserService,
    ConfirmationService,
    PatrimonyTypeService,
    MachineService,
        ]
    };
  }
}
