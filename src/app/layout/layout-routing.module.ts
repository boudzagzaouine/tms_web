import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'clients', loadChildren: './clients/clients.module#ClientsModule'},
            { path: 'drivers', loadChildren: './drivers/driver.module#DriverModule'},
            { path: 'drivers-edit', loadChildren: './drivers/driver-edit/driver-edit.module#DriverEditModule'},
            { path: 'drivers-zones', loadChildren: './drivers/driver-zones/driver-zones.module#DriverZonesModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
