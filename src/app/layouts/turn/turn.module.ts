import { SharedModule } from './../../shared/shared.module';
import { TreeTableModule } from 'primeng/treetable';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { StepsModule } from 'primeng/steps';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnRoutingModule } from './turn-routing.module';
import { TurnComponent } from './turn.component';
import { TurnEditComponent } from './turn-edit/turn-edit.component';
import { InputTextModule } from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import {PickListModule} from 'primeng/picklist';
import {SliderModule} from 'primeng/slider';


@NgModule({
  declarations: [TurnComponent, TurnEditComponent],
  imports: [
    CommonModule,
    TurnRoutingModule,
    StepsModule,
    FormsModule,
    ButtonModule,
    SharedModule,
    TranslateModule,
    InputTextModule,
    CalendarModule,
    MultiSelectModule,
    DropdownModule,
    TableModule,
    AutoCompleteModule,
    PickListModule,
TreeTableModule,
SliderModule,
CalendarModule

    ]
})
export class TurnModule { }
