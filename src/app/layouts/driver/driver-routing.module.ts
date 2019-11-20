
import { DriverEditComponent } from './driver-edit/driver-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverComponent } from './driver.component';
import { DriverListComponent } from './driver-list/driver-list.component';


const routes: Routes = [{ path: '', component: DriverComponent },
{ path: 'edit', component: DriverEditComponent },
{ path: 'edit/:id', component: DriverEditComponent },
{ path: 'list', component: DriverListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
