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
            { path: 'drivers-zones', loadChildren: './drivers/driver-zones/driver-zones.module#DriverZonesModule'},
            { path: 'vehicles', loadChildren: './vehicles/vehicle.module#VehicleModule'},
            { path: 'category', loadChildren: './vehicles/category/category.module#VehicleCategoryModule'},
            { path: 'vehicle-edit', loadChildren: './vehicles/vehicle-edit/vehicle-edit.module#VehicleEditModule'},
            { path: 'category-edit', loadChildren: './vehicles/category/category-edit/category-edit.module#VehicleCategoryEditModule'},
            { path: 'mtnplans', loadChildren: './vehicles/mtnplans/mtnplan.module#MtnPlanModule'},
            { path: 'mtnplans-edit', loadChildren: './vehicles/mtnplans/mtnplans-edit/mtnplan-edit.module#MtnPlanEditModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
