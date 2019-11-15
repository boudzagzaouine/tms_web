import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsuranceTermComponent } from './insurance-term.component';

const routes: Routes = [{ path: '', component: InsuranceTermComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceTermRoutingModule { }
