import { MaintenancePreventiveListComponent } from './maintenance-preventive-list/maintenance-preventive-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenancePreventiveComponent } from './maintenance-preventive.component';
import { MaintenancePreventiveEditComponent } from './maintenance-preventive-edit/maintenance-preventive-edit.component';

const routes: Routes = [{ path: '', component: MaintenancePreventiveComponent },
{ path: 'edit', component: MaintenancePreventiveEditComponent },
{ path: 'edit/:id', component: MaintenancePreventiveEditComponent },

{ path: 'list', component: MaintenancePreventiveListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenancePreventiveRoutingModule { }
