import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TableModule } from 'primeng/table';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TranslateModule } from '@ngx-translate/core';
import { InsuranceComponent } from './insurance.component';
import { InsuranceEditComponent } from './insurance-edit/insurance-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [InsuranceEditComponent, InsuranceComponent],
  imports: [
    CommonModule,TranslateModule,CalendarModule,FormsModule,ReactiveFormsModule,TableModule,PanelModule,DialogModule,
    ContextMenuModule,NgxSpinnerModule,ConfirmDialogModule,
    AutoCompleteModule

  ]
})
export class InsuranceModule { }
