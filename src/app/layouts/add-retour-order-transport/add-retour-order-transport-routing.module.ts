import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRetourOrderTransportListComponent } from './add-retour-order-transport-list/add-retour-order-transport-list.component';
import { AddRetourOrderTransportComponent } from './add-retour-order-transport.component';

const routes: Routes = [{ path: '', component: AddRetourOrderTransportComponent },
{ path: 'list', component: AddRetourOrderTransportListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AddRetourOrderTransportRoutingModule { }
