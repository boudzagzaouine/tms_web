import { TrajetListComponent } from './trajet-list/trajet-list.component';
import { TrajetEditComponent } from './trajet-edit/trajet-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrajetComponent } from './trajet.component';

const routes: Routes = [{ path: '', component: TrajetComponent },
{ path: 'edit', component: TrajetEditComponent },
{ path: 'edit/:id', component: TrajetEditComponent },
{ path: 'list', component: TrajetListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrajetRoutingModule { }
