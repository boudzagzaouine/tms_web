import { MaintenancePCEditComponent } from './maintenance-p-c-edit/maintenance-p-c-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenancePCComponent } from './maintenance-p-c.component';

const routes: Routes = [{ path: '', component: MaintenancePCComponent },
{ path: 'edit', component: MaintenancePCEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenancePCRoutingModule { }
