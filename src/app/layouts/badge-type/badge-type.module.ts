import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeTypeRoutingModule } from './badge-type-routing.module';
import { BadgeTypeComponent } from './badge-type.component';
import { BadgeTypeEditComponent } from './badge-type-edit/badge-type-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [BadgeTypeComponent, BadgeTypeEditComponent],
  imports: [
    CommonModule,
    BadgeTypeRoutingModule,
    TableModule,
    InputTextModule,
    NgbModule,
    DropdownModule
  ]
})
export class BadgeTypeModule { }
