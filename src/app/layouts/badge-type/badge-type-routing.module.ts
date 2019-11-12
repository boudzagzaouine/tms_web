import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BadgeTypeComponent } from './badge-type.component';

const routes: Routes = [{ path: '', component: BadgeTypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BadgeTypeRoutingModule { }
