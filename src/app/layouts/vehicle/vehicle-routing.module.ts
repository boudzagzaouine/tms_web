import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleEditComponent } from './vehicle-edit/vehicle-edit.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleComponent } from './vehicle.component';

const routes: Routes = [{ path: '', component: VehicleComponent, pathMatch: 'full' },
                         {path: 'edit', component: VehicleEditComponent},
                         {path: 'List', component: VehicleListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
