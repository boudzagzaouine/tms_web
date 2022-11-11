import { OrderTransportRetourComponent } from './order-transport-edit/order-transport-retour/order-transport-retour.component';
import { OrderTransportVerificationComponent } from './order-transport-edit/order-transport-verification/order-transport-verification.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TarificationComponent } from './order-transport-edit/tarification/tarification.component';
import { OrderTransportInfoLineComponent } from './order-transport-edit/order-transport-info-line/order-transport-info-line.component';
import { PackageDetailComponent } from './order-transport-edit/package-detail/package-detail.component';
import { OrderTransportAllerComponent } from './order-transport-edit/order-transport-aller/order-transport-aller.component';
import { GenerateAddressContactComponent } from './order-transport-edit/generate-address-contact/generate-address-contact.component';
import { OrderTransportInformationComponent } from './order-transport-edit/order-transport-information/order-transport-information.component';
import { OrderTransportInfo } from './../../shared/models/order-transport-info';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FieldsetModule } from 'primeng/fieldset';
import { TreeTableModule } from 'primeng/treetable';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PickListModule } from 'primeng/picklist';
import { PanelModule } from 'primeng/panel';
import { ContextMenuModule } from 'primeng/contextmenu';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { StepsModule } from 'primeng/steps';
import { SharedModule } from './../../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderTransportRoutingModule } from './order-transport-routing.module';
import { OrderTransportListComponent } from './order-transport-list/order-transport-list.component';
import { OrderTransportEditComponent } from './order-transport-edit/order-transport-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTransportComponent } from './order-transport.component';
import { TimelineModule } from 'primeng/timeline';
import { BrowserModule } from '@angular/platform-browser';
import { ContactEditComponent } from '../settings/account/account-edit/contact-edit/contact-edit.component';
import { AddressEditComponent } from '../settings/account/account-edit/address-edit/address-edit.component';

@NgModule({
  imports: [
    CommonModule,
    OrderTransportRoutingModule,
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
     RadioButtonModule,
     ToastModule,
     CardModule,
     TimelineModule,

  ],
  declarations: [OrderTransportComponent,
    OrderTransportEditComponent,
    OrderTransportListComponent,
    OrderTransportInformationComponent,
    OrderTransportAllerComponent,
    OrderTransportRetourComponent,
    GenerateAddressContactComponent,
    PackageDetailComponent,
    OrderTransportInfoLineComponent,
    TarificationComponent,
    OrderTransportVerificationComponent,
    ContactEditComponent,
    AddressEditComponent
  ]
})
export class OrderTransportModule { }
