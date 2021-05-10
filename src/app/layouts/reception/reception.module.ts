import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { StepsModule } from 'primeng/steps';
import { ContextMenuModule } from 'primeng/contextmenu';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from './../../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionRoutingModule } from './reception-routing.module';
import { ReceptionComponent } from './reception.component';
import { ReceptionEditComponent } from './reception-edit/reception-edit.component';
import { ReceptionListComponent } from './reception-list/reception-list.component';
import { ReceptionLineEditComponent } from './reception-edit/reception-line-edit/reception-line-edit.component';
import { ReceptionGenerateBonComponent } from './reception-generate-bon/reception-generate-bon.component';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [ReceptionComponent, ReceptionEditComponent, ReceptionListComponent, ReceptionLineEditComponent,ReceptionGenerateBonComponent],
  imports: [
    CommonModule,
    ReceptionRoutingModule,
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
    DialogModule,
    NgxPrintModule,

  ]
})
export class ReceptionModule { }
