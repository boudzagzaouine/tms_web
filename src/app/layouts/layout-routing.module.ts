import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'sample', loadChildren: () => import('./sample/sample.module').then(m => m.SampleModule) },
      { path: 'badge', loadChildren: () => import('./badge/badge.module').then(m => m.BadgeModule) },
      { path: 'vehicle', loadChildren: () => import('./vehicle/vehicle.module').then(m => m.VehicleModule) },
      { path: 'chauffeur', loadChildren: () => import('./chauffeur/chauffeur.module').then(m => m.ChauffeurModule) },
      { path: 'maintenanceplan', loadChildren: () => import('./maintenance-plan/maintenance-plan.module').then(m => m.MaintenancePlanModule) },
      { path: 'insurance', loadChildren: () => import('./insurance/insurance.module').then(m => m.InsuranceModule) },
      { path: 'supplier', loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule) },
      { path: 'badgetype', loadChildren: () => import('./badge-type/badge-type.module').then(m => m.BadgeTypeModule) },


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
