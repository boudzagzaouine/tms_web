import { ContactInformationComponent } from './order-delivery-edit/contact-information/contact-information.component';
import { OrderDeliveryListComponent } from './order-delivery-list/order-delivery-list.component';
import { OrderDeliveryEditComponent } from './order-delivery-edit/order-delivery-edit.component';
import { OrderDeliveryComponent } from './order-delivery.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{ path: 'edit', component: OrderDeliveryEditComponent },
{ path: 'edit/:id', component: OrderDeliveryEditComponent },
{ path: 'list', component: OrderDeliveryListComponent },
{ path: '', component: OrderDeliveryComponent },

{ path: 'contact-info', component: ContactInformationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDeliveryRoutingModule { }
