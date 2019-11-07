import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeRoutingModule } from './badge-routing.module';
import { BadgeComponent } from './badge.component';


@NgModule({
  declarations: [BadgeComponent],
  imports: [
    CommonModule,
    BadgeRoutingModule
  ]
})
export class BadgeModule { }
