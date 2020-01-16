import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceComponent } from '../settings/insurance/insurance.component';
import { InsuranceEditComponent } from '../settings/insurance/insurance-edit/insurance-edit.component';


const routes: Routes = [{ path: '', component: InsuranceComponent },
{ path: 'edit', component: InsuranceEditComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
