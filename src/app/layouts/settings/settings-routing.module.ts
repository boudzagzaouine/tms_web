import { TestDataTableComponent } from './test-data-table/test-data-table.component';
import { DataTableComponent } from './../../shared/components/data-table/data-table.component';
import { InsuranceTermEditComponent } from './insurance-term/insurance-term-edit/insurance-term-edit.component';
import { MenuVehicleComponent } from './menu-vehicle/menu-vehicle.component';
import { MenuInsuranceComponent } from './menu-insurance/menu-insurance.component';
import { ComsumptionTypeComponent } from './comsumption-type/comsumption-type.component';
import { CatalogTransportTypeComponent } from './catalog-transport-type/catalog-transport-type.component';
import { CatalogTransportType } from './../../shared/models/CatalogTransportType';
import { TransportCategoryVehicleComponent } from './transport-category-vehicle/transport-category-vehicle.component';
import { InsuranceTypeComponent } from './insurance-type/insurance-type.component';
import { ConsomtionTypeComponent } from './consomtion-type/consomtion-type.component';
import { CommissionTypeComponent } from './commission-type/commission-type.component';
import { VehicleCategory } from './../../shared/models/vehicle-category';
import { ContractTypeComponent } from './contract-type/contract-type.component';
import { SupplierComponent } from './supplier/supplier.component';
import { MaintenanceTypeComponent } from './maintenance-type/maintenance-type.component';
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

const routes: Routes = [
  {
    path: '', component: SettingsComponent, children: [
      { path: 'badges', component: BadgeComponent },
      { path: 'badge-types', component: BadgeTypeComponent },
      { path: 'suppliers', component: SupplierComponent },
      { path: 'contract-types', component: ContractTypeComponent },
      { path: 'insurances', component: InsuranceComponent },
      { path: 'insurance-terms', component: InsuranceTermComponent },
      { path: 'insurance-terms-edit', component: InsuranceTermEditComponent },
      { path: 'maintenance-statuses', component: MaintenanceStatusComponent },
      { path: 'maintenance-types', component: MaintenanceTypeComponent },
      { path: 'vehicle-categorie', component: VehicleCategorieComponent },
      { path: 'commission-type', component: CommissionTypeComponent },
      { path: 'consomption-type', component: ConsomtionTypeComponent },
      { path: 'insurance-type', component: InsuranceTypeComponent },
      { path: 'transport-category-vehicle', component: TransportCategoryVehicleComponent },
      { path: 'path', component: CatalogTransportTypeComponent },
      { path: 'consumption-type', component: ComsumptionTypeComponent },
      { path: 'menu-insurance', component: MenuInsuranceComponent },
      { path: 'menu-vehicle', component: MenuVehicleComponent },
      { path: 'menu-maintenance', component: MenuMaintenanceComponent },
      { path: 'menu-driver', component: MenuDriverComponent },
      { path: 'test-table', component: TestDataTableComponent }




    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
