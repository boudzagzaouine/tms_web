import { VehicleAvailabilityListComponent } from './vehicle-availability-list/vehicle-availability-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleAvailablityComponent } from './vehicle-availablity.component';

const routes: Routes = [{ path: '', component: VehicleAvailablityComponent },
                        { path: 'list', component: VehicleAvailabilityListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleAvailablityRoutingModule { }
