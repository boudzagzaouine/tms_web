import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsuranceComponent } from './insurance.component';
import { InsuranceListComponent } from './insurance-list/insurance-list.component';
import { InsuranceEditComponent } from './insurance-edit/insurance-edit.component';

const routes: Routes = [{ path: '', component: InsuranceComponent },
{ path: 'edit', component: InsuranceEditComponent },
{ path: 'edit/:id', component: InsuranceEditComponent },
{ path: 'list', component: InsuranceListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
