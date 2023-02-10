import { TrackingListComponent } from './tracking-list/tracking-list.component';
import { TrackingComponent } from './tracking.component';



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{ path: 'list', component: TrackingListComponent },
{ path: '', component: TrackingComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingRoutingModule { }
