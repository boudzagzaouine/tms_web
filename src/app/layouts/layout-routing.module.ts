import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },

      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
      { path: 'vehicles', loadChildren: () => import('./vehicle/vehicle.module').then(m => m.VehicleModule) },
      { path: 'drivers', loadChildren: () => import('./driver/driver.module').then(m => m.DriverModule) },
      {
        path: 'consomptions',
        loadChildren: () => import('./commission-driver/commission-driver.module')
          .then(m => m.CommissionDriverModule)
      },
      // { path: 'insurances', loadChildren: () => import('./insurance/insurance.module').then(m => m.InsuranceModule) },
      { path: 'machine', loadChildren: () => import('./machine/machine.module').then(m => m.MachineModule) },

      {
        path: 'maintenance',
        loadChildren: () => import('./maintenance/maintenance.module')
          .then(m => m.MaintenanceModule)
      },
      {
        path: 'maintenance-plan',
        loadChildren: () => import('./maintenance-preventive/maintenance-preventive.module')
          .then(m => m.MaintenancePreventiveModule)
      },

      {
        path: 'stock',
        loadChildren: () => import('./stock/stock.module').then(m => m.StockModule)
      },

      {
        path: 'stock-view',
        loadChildren: () => import('./stock-view/stock-view.module').then(m => m.StockViewModule)
      },

      {
        path: 'order',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
      },

      {
        path: 'reception',
        loadChildren: () => import('./reception/reception.module').then(m => m.ReceptionModule)
      },

      { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
      { path: 'tmsdashboards', loadChildren: () => import('./tms-dashboards/tms-dashboards.module').then(m => m.TmsDashboardsModule) },

      {
        path: 'alimentation-pumps',
        loadChildren: () => import('./alimentation-pumps/alimentation-pumps.module').then(m => m.AlimentationPumpsModule)
      },
      { path: 'vehicle-availablity', loadChildren: () => import('./vehicle-availablity/vehicle-availablity.module').then(m => m.VehicleAvailablityModule) },
      { path: 'supplier-invoice', loadChildren: () => import('./supplier-invoice/supplier-invoice.module').then(m => m.SupplierInvoiceModule) },
      { path: 'order-transport', loadChildren: () => import('./order-transport/order-transport.module').then(m => m.OrderTransportModule) },
      { path: 'transport-plan', loadChildren: () => import('./transport-plan/transport-plan.module').then(m => m.TransportPlanModule) },
      { path: 'default-index', loadChildren: () => import('./default/default.module').then(m => m.DefaultModule) },
      { path: 'invoice', loadChildren: () => import('./invoice-plan-transport/invoice-plan-transport.module').then(m => m.InvoicePlanTransportModule) },
      { path: 'tracking', loadChildren: () => import('./tracking/tracking.module').then(m => m.TrackingModule) },



    ],
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
