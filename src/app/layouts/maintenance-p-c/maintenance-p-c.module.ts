import { ProductEditComponent } from './maintenance-p-c-edit/action-edit/product-edit/product-edit.component';
import { ActionEditComponent } from './maintenance-p-c-edit/action-edit/action-edit.component';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { StepsModule } from 'primeng/steps';
import { ContextMenuModule } from 'primeng/contextmenu';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { MaintenancePCRoutingModule } from './maintenance-p-c-routing.module';
import { MaintenancePCComponent } from './maintenance-p-c.component';

import { MaintenancePCEditComponent } from './maintenance-p-c-edit/maintenance-p-c-edit.component';
import { CorrectiveComponent } from './maintenance-p-c-edit/corrective/corrective.component';


@NgModule({
  declarations: [MaintenancePCComponent, MaintenancePCEditComponent,ActionEditComponent,ProductEditComponent, CorrectiveComponent],
  imports: [
    CommonModule,
    MaintenancePCRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    InputTextModule,
    TableModule,
    DropdownModule,
    AutoCompleteModule,
    NgxSpinnerModule,
    CalendarModule,
    ConfirmDialogModule,
    TabViewModule,
    KeyFilterModule,
    NgbModalModule,
    NgxSpinnerModule,
    ContextMenuModule,
    StepsModule,
    PanelModule,
   SelectButtonModule,
   InputNumberModule,
   DialogModule,
  ]
})
export class MaintenancePCModule { }
