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

const routes: Routes = [
  {
    path: '', component: SettingsComponent, children: [
      { path: 'badges', component: BadgeComponent },
      { path: 'badge-types', component: BadgeTypeComponent },
      { path: 'suppliers', component: SupplierComponent },
      { path: 'contract-types', component: ContractTypeComponent },
      { path: 'insurances', component: InsuranceComponent },
      { path: 'insurance-terms', component: InsuranceTermComponent },
      { path: 'maintenance-statuses', component: MaintenanceStatusComponent },
      { path: 'maintenance-types', component: MaintenanceTypeComponent },
      { path: 'vehicle-categorie', component: VehicleCategorieComponent },
      { path: 'commission-type', component: CommissionTypeComponent },
      { path: 'consomption-type', component: ConsomtionTypeComponent }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
