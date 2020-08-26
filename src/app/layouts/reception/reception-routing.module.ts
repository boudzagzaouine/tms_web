import { ReceptionListComponent } from './reception-list/reception-list.component';
import { ReceptionEditComponent } from './reception-edit/reception-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceptionComponent } from './reception.component';

const routes: Routes = [{ path: '', component: ReceptionComponent },
{ path: 'edit', component: ReceptionEditComponent },
{ path: 'list', component: ReceptionListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionRoutingModule { }
