import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TmsDashboardsComponent } from './tms-dashboards.component';
import { TmsDashboardVehicleComponent } from './tms-dashboard-vehicle/tms-dashboard-vehicle.component';
import { TmsDashboardDriverComponent } from './tms-dashboard-driver/tms-dashboard-driver.component';
import { TransportComponent } from './transport/transport.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [{ path: '', component: OverviewComponent },
{ path: 'overview', component: OverviewComponent },
{ path: 'vehicle', component: TmsDashboardVehicleComponent },
{ path: 'driver', component: TmsDashboardDriverComponent },
{ path: 'transport', component: TransportComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class TmsDashboardsRoutingModule { }
