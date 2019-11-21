import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'sample', loadChildren: () => import('./sample/sample.module').then(m => m.SampleModule) },
      { path: 'badges', loadChildren: () => import('./badge/badge.module').then(m => m.BadgeModule) },
      { path: 'vehicles', loadChildren: () => import('./vehicle/vehicle.module').then(m => m.VehicleModule) },
      { path: 'drivers', loadChildren: () => import('./driver/driver.module').then(m => m.DriverModule) },
      {
        path: 'maintenance-plans',
        loadChildren: () => import('./maintenance-plan/maintenance-plan.module')
          .then(m => m.MaintenancePlanModule)
      },
      { path: 'insurances', loadChildren: () => import('./insurance/insurance.module').then(m => m.InsuranceModule) },
      { path: 'suppliers', loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule) },
      { path: 'badgetypes', loadChildren: () => import('./badge-type/badge-type.module').then(m => m.BadgeTypeModule) },
      { path: 'insuranceterms', loadChildren: () => import('./insurance-term/insurance-term.module').then(m => m.InsuranceTermModule) },


    ]
  }];

@NgModule({
  declarations: [

  ],
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule,
  ]
})

export class AppLayoutRoutingModule { }
