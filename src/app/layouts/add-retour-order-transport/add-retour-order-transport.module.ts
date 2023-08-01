import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ContextMenuModule } from 'primeng/contextmenu';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SharedModule } from './../../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRetourOrderTransportListComponent } from './add-retour-order-transport-list/add-retour-order-transport-list.component';
import { AddRetourOrderTransportRoutingModule } from './add-retour-order-transport-routing.module';
import { AddRetourOrderTransportComponent } from './add-retour-order-transport.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [AddRetourOrderTransportComponent, AddRetourOrderTransportListComponent],
  imports: [
    CommonModule, SharedModule, AddRetourOrderTransportRoutingModule,
    FormsModule,
    TranslateModule,
    InputTextModule,
    TableModule,
    CalendarModule,
    BreadcrumbModule,
    DropdownModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SharedModule,
    AutoCompleteModule,
    ConfirmDialogModule,
    KeyFilterModule,
    ContextMenuModule,
    NgbModalModule,
    PanelModule,
    DialogModule

  ]
})
export class AddRetourOrderTransportModule { }
