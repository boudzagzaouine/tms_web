import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceComponent } from './maintenance.component';
import { MaintenancePlanComponent } from './maintenance-plan/maintenance-plan.component';

const routes: Routes = [{ path: '', component: MaintenanceComponent },
{ path: 'plan', component: MaintenancePlanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
