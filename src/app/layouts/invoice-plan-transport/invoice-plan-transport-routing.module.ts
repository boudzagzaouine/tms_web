import { InvoicePlanTransportComponent } from './invoice-plan-transport.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [{ path: '', component: InvoicePlanTransportComponent, pathMatch: 'full' },
                   ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicePlanTransportRoutingModule { }
