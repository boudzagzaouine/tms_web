import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardDriverComponent } from './dashboard-driver/dashboard-driver.component';
import { DashboardVehicleComponent } from './dashboard-vehicle/dashboard-vehicle.component';

import { DashboardsComponent } from './dashboards.component';

const routes: Routes = [{ path: '', component: DashboardsComponent },
{ path: 'vehicle', component: DashboardVehicleComponent },
{ path: 'driver', component: DashboardDriverComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }
