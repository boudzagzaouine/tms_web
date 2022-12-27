import { PricingInernalEditComponent } from './pricing-inernal-edit/pricing-inernal-edit.component';
import { PricingInternalComponent } from './pricing-internal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{ path: '', component: PricingInternalComponent },
{ path: 'edit', component: PricingInernalEditComponent },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricingInternalRoutingModule { }
