import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeRoutingModule } from './badge-routing.module';
import { BadgeComponent } from './badge.component';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import { BadgeEditComponent } from './badge-edit/badge-edit.component';
import {DropdownModule} from 'primeng/dropdown';



@NgModule({
  declarations: [BadgeComponent, BadgeEditComponent],
  imports: [
    CommonModule,
    BadgeRoutingModule,
    TableModule,
    InputTextModule,
    NgbModule,
    DropdownModule

  ]
})
export class BadgeModule { }
