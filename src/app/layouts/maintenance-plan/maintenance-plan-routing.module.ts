import { MaintenancePlanEditComponent } from './maintenance-plan-edit/maintenance-plan-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenancePlanComponent } from './maintenance-plan.component';
import { MaintenancePlanListComponent } from './maintenance-plan-list/maintenance-plan-list.component';

const routes: Routes = [{ path: '', component: MaintenancePlanComponent },
{ path: 'edit', component: MaintenancePlanEditComponent },
{ path: 'list', component: MaintenancePlanListComponent }];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenancePlanRoutingModule { }
