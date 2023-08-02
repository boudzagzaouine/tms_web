import { AffectationRetourListComponent } from './affectation-retour-list/affectation-retour-list.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AffectationRetourComponent } from './affectation-retour.component';
import { AffectationRetourRoutingModule } from './affectation-retour-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AffectationRetourRoutingModule,
    SharedModule,

  ],
  declarations: [AffectationRetourComponent,AffectationRetourListComponent]
})
export class AffectationRetourModule { }
