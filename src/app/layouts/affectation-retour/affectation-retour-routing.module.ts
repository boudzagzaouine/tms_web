import { AffectationRetourEditComponent } from './affectation-retour-edit/affectation-retour-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AffectationRetourListComponent } from './affectation-retour-list/affectation-retour-list.component';



const routes: Routes = [
  { path: 'list', component: AffectationRetourListComponent },
  { path: 'edit', component: AffectationRetourEditComponent },


        ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffectationRetourRoutingModule { }
