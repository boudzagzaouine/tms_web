import { MaintenanceTraitementComponent } from './maintenance-traitement/maintenance-traitement.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceComponent } from './maintenance.component';
import { MaintenancePlanComponent } from './maintenance-plan/maintenance-plan.component';

const routes: Routes = [{ path: '', component: MaintenanceComponent },
{ path: 'edit', component: MaintenancePlanComponent },
{path: 'edit/:id', component: MaintenancePlanComponent},
{ path: 'treatment', component: MaintenanceTraitementComponent },]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
