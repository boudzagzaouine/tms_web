import { OrderTransportCancelComponent } from './order-transport-cancel/order-transport-cancel.component';
import { OrderTransportAffectedComponent } from './order-transport-affected/order-transport-affected.component';
import { OrderTransportListComponent } from './order-transport-list/order-transport-list.component';
import { OrderTransportEditComponent } from './order-transport-edit/order-transport-edit.component';
import { OrderTransportComponent } from './order-transport.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{ path: 'edit', component: OrderTransportEditComponent },
{ path: 'edit/:id', component: OrderTransportEditComponent },
{ path: 'to-affect', component: OrderTransportListComponent },
{ path: 'affected', component: OrderTransportAffectedComponent },
{ path: 'cancel', component: OrderTransportCancelComponent },

{ path: '', component: OrderTransportComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderTransportRoutingModule { }
