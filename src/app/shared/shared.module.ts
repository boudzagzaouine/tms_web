import { ConsumptionTypeService } from './services/api/consumption-type.service';
import { TurnLineService } from './services/api/turn-line.service';
import { SaleOrderService } from './services/api/sale-order.service';
import { TurnService } from './services/api/turn.service';
import { MessageService } from 'primeng/api';
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


@NgModule({
  declarations: [],
  imports: [
    CommonModule
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
        ConsumptionTypeService

        ]
    };
  }
}
