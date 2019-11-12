import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChauffeurRoutingModule } from './chauffeur-routing.module';
import { ChauffeurComponent } from './chauffeur.component';
import { ChauffeurListComponent } from './chauffeur-list/chauffeur-list.component';
import { ChauffeurEditComponent } from './chauffeur-edit/chauffeur-edit.component';
import {CalendarModule} from 'primeng/calendar';


@NgModule({
  declarations: [ChauffeurComponent , ChauffeurListComponent, ChauffeurEditComponent],
  imports: [
    CommonModule,
    ChauffeurRoutingModule,
    TranslateModule,
    InputTextModule,
    TableModule,
    CalendarModule,
    DropdownModule
  ]
})
export class ChauffeurModule { }
