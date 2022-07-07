import { RadioButtonModule } from 'primeng/radiobutton';

import { TreeTableModule } from 'primeng/treetable';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PickListModule } from 'primeng/picklist';
import { BreadcrumbModule } from 'primeng/breadcrumb';
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

import { TrajetRoutingModule } from './trajet-routing.module';
import { TrajetComponent } from './trajet.component';
import { TrajetEditComponent } from './trajet-edit/trajet-edit.component';
import { TrajetListComponent } from './trajet-list/trajet-list.component';
import { MultiSelectModule } from 'primeng/multiselect';
import {FieldsetModule} from 'primeng/fieldset';
import {ScrollPanelModule} from 'primeng/scrollpanel';


@NgModule({
  declarations: [TrajetComponent, TrajetEditComponent, TrajetListComponent],
  imports: [
    CommonModule,
    TrajetRoutingModule,
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
    BreadcrumbModule ,
    PickListModule,
    SelectButtonModule,
    MultiSelectModule,
    DialogModule,
    OverlayPanelModule,
     TreeTableModule,
     FieldsetModule,
     ScrollPanelModule,
     RadioButtonModule

  ]
})
export class TrajetModule { }
