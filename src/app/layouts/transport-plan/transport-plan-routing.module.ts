import { TransportPlanEditComponent } from './transport-plan-edit/transport-plan-edit.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{ path: 'edit', component: TransportPlanEditComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportPlanRoutingModule { }
