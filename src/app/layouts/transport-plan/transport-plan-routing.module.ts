import { TransportPlanAddComponent } from './transport-plan-add/transport-plan-add.component';
import { TransportPlanComponent } from './transport-plan.component';
import { TransportPlanListComponent } from './transport-plan-list/transport-plan-list.component';
import { TransportPlanEditComponent } from './transport-plan-edit/transport-plan-edit.component';



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{ path: 'edit', component: TransportPlanAddComponent },
{ path: 'edit/:id', component: TransportPlanEditComponent },
{ path: 'list', component: TransportPlanListComponent },
{ path: '', component: TransportPlanComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportPlanRoutingModule { }
