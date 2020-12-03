import { MenuProductComponent } from './menu-product/menu-product.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { ProductComponent } from './product/product.component';
import { ProductEditComponent } from './../maintenance/maintenance-plan/action-edit/product-edit/product-edit.component';
import { TransportComponent } from './transport/transport.component';
import { Transport } from './../../shared/models/transport';
import { ZoneComponent } from './zone/zone.component';
import { InsuranceTermEdiitComponent } from './insurance-term/insurance-term-ediit/insurance-term-ediit.component';
import { TestDataTableComponent } from './test-data-table/test-data-table.component';
import { DataTableComponent } from './../../shared/components/data-table/data-table.component';
import { MenuVehicleComponent } from './menu-vehicle/menu-vehicle.component';
import { MenuInsuranceComponent } from './menu-insurance/menu-insurance.component';
import { ComsumptionTypeComponent } from './comsumption-type/comsumption-type.component';
import { CatalogTransportTypeComponent } from './catalog-transport-type/catalog-transport-type.component';
import { CatalogTransportType } from './../../shared/models/CatalogTransportType';
import { TransportCategoryVehicleComponent } from './transport-category-vehicle/transport-category-vehicle.component';
import { InsuranceTypeComponent } from './insurance-type/insurance-type.component';
import { CommissionTypeComponent } from './commission-type/commission-type.component';
import { VehicleCategory } from './../../shared/models/vehicle-category';
import { ContractTypeComponent } from './contract-type/contract-type.component';
import { SupplierComponent } from './supplier/supplier.component';
import { MaintenanceTypeComponent } from './maintenance-type/maintenance-type.component';
import { MaintenanceActionComponent } from './maintenance-action/maintenance-action.component';
import { MaintenanceLineRefComponent } from './maintenance-line-ref/maintenance-line-ref.component';

import { InsuranceTermComponent } from './insurance-term/insurance-term.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { BadgeTypeComponent } from './badge-type/badge-type.component';
import { BadgeComponent } from './badge/badge.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { MaintenanceStatusComponent } from './maintenance-status/maintenance-status.component';
import { VehicleCategorieComponent } from './vehicle-categorie/vehicle-categorie.component';
import { MenuMaintenanceComponent } from './menu-maintenance/menu-maintenance.component';
import { MenuDriverComponent } from './menu-driver/menu-driver.component';
import { PatrimonyTypeComponent } from './patrimony-type/patrimony-type.component';
import { NotificationComponent } from './notification/notification.component';
import { ConfigMessageComponent } from './configMessage/configMessage.component';
import { DieselDeclarationComponent } from './diesel-declaration/diesel-declaration.component';
import { RoleComponent } from './role/role.component';
import { ActionTypeComponent } from './actionType/actionType.component';
import { NotificationTypeComponent } from './notification-type/notification-type.component';
import { MenuNotificationComponent } from './menu-notification/menu-notification.component';

const routes: Routes = [
  {
    path: '', component: SettingsComponent, children: [
      { path: 'badges', component: BadgeComponent },
      { path: 'badge-types', component: BadgeTypeComponent },
      { path: 'suppliers', component: SupplierComponent },
      { path: 'contract-types', component: ContractTypeComponent },
      { path: 'insurances', component: InsuranceComponent },
      { path: 'insurance-terms', component: InsuranceTermComponent },
      { path: 'insurance-terms-ediit', component: InsuranceTermEdiitComponent },
      { path: 'maintenance-statuses', component: MaintenanceStatusComponent },
      { path: 'maintenance-types', component: MaintenanceTypeComponent },
      { path: 'maintenance-action', component: MaintenanceActionComponent},
      { path: 'maintenance-line-ref', component: MaintenanceLineRefComponent},
      { path: 'vehicle-categorie', component: VehicleCategorieComponent },
      { path: 'commission-type', component: CommissionTypeComponent },
      { path: 'insurance-type', component: InsuranceTypeComponent },
      { path: 'transport-category-vehicle', component: TransportCategoryVehicleComponent },
      { path: 'path', component: CatalogTransportTypeComponent },
      { path: 'consumption-type', component: ComsumptionTypeComponent },
      { path: 'menu-insurance', component: MenuInsuranceComponent },
      { path: 'menu-vehicle', component: MenuVehicleComponent },
      { path: 'menu-maintenance', component: MenuMaintenanceComponent },
      { path: 'menu-driver', component: MenuDriverComponent },
      { path: 'menu-product', component: MenuProductComponent },
      { path: 'test-table', component: TestDataTableComponent },
      { path: 'patrimony', component: PatrimonyTypeComponent },
      { path: 'zone', component: ZoneComponent },
      { path: 'transport', component: TransportComponent },
      { path: 'product', component: ProductComponent },
      { path: 'product-type', component: ProductTypeComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'config-mail', component: ConfigMessageComponent },
      { path: 'diesel-declaration', component: DieselDeclarationComponent },
      { path: 'action-type', component: ActionTypeComponent },
      { path: 'notification-type', component: NotificationTypeComponent },
      { path: 'menu-mail', component: MenuNotificationComponent },



    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
