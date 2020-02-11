import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
      { path: 'vehicles', loadChildren: () => import('./vehicle/vehicle.module').then(m => m.VehicleModule) },
      { path: 'drivers', loadChildren: () => import('./driver/driver.module').then(m => m.DriverModule) },
      { path: 'consomptions',
       loadChildren: () => import('./commission-driver/commission-driver.module')
       .then(m => m.CommissionDriverModule) },
      // { path: 'insurances', loadChildren: () => import('./insurance/insurance.module').then(m => m.InsuranceModule) },

      {
        path: 'maintenances',
        loadChildren: () => import('./maintenance-plan/maintenance-plan.module')
          .then(m => m.MaintenancePlanModule)
      },

      { path: 'turn', loadChildren: () => import('./turn/turn.module').then(m => m.TurnModule) },


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
