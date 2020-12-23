import { PanelModule } from 'primeng/panel';
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
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachineRoutingModule } from './machine-routing.module';
import { MachineComponent } from './machine.component';
import { MachineListComponent } from './machine-list/machine-list.component';
import { MachineEditComponent } from './machine-edit/machine-edit.component';
import { MachineInsuranceEditComponent } from './machine-edit/machine-insurance-edit/machine-insurance-edit.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [MachineComponent, MachineListComponent, MachineEditComponent, MachineInsuranceEditComponent],
  imports: [
    CommonModule,
    MachineRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    InputTextModule,
    TableModule,
    DropdownModule,
    AutoCompleteModule,
    NgxSpinnerModule,
    SharedModule,
    CalendarModule,
    ConfirmDialogModule,
    TabViewModule,
    KeyFilterModule,
    NgbModalModule,
    NgxSpinnerModule,
    ConfirmDialogModule,
    ContextMenuModule,
    StepsModule,
    PanelModule,
    BreadcrumbModule,

  ]
})
export class MachineModule { }
