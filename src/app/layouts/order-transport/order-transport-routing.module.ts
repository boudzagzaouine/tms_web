import { OrderTransportListComponent } from './order-transport-list/order-transport-list.component';
import { OrderTransportEditComponent } from './order-transport-edit/order-transport-edit.component';
import { OrderTransportComponent } from './order-transport.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{ path: 'edit', component: OrderTransportEditComponent },
{ path: 'edit/:id', component: OrderTransportEditComponent },
{ path: 'list', component: OrderTransportListComponent },
{ path: '', component: OrderTransportComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderTransportRoutingModule { }
