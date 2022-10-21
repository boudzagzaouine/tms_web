import { OrderDeliveryVerificationComponent } from './order-delivery-edit/order-delivery-verification/order-delivery-verification.component';
import { TransportEditComponent } from './order-delivery-edit/tarification/transport-edit/transport-edit.component';

import { TarificationComponent } from './order-delivery-edit/tarification/tarification.component';
import { MarchandiseComponent } from './order-delivery-edit/marchandise/marchandise.component';
import { ContactInformationComponent } from './order-delivery-edit/contact-information/contact-information.component';
import { PackageDetailEditComponent } from './order-delivery-edit/package-detail-edit/package-detail-edit.component';
import { MerchandiseRetourEditComponent } from './order-delivery-edit/merchandise-retour-edit/merchandise-retour-edit.component';
import { MerchandiseAllerEditComponent } from './order-delivery-edit/merchandise-aller-edit/merchandise-aller-edit.component';
import { ToastModule } from 'primeng/toast';
import { GenerateContactAddressComponent } from './order-delivery-edit/generate-contact-address/generate-contact-address.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FieldsetModule } from 'primeng/fieldset';
import { TreeTableModule } from 'primeng/treetable';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
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
import { OrderDeliveryListComponent } from './order-delivery-list/order-delivery-list.component';
import { OrderDeliveryEditComponent } from './order-delivery-edit/order-delivery-edit.component';
import { OrderDeliveryRoutingModule } from './order-delivery-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDeliveryComponent } from './order-delivery.component';
import {CardModule} from 'primeng/card';

@NgModule({
  imports: [
    CommonModule,
    OrderDeliveryRoutingModule,
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
     CardModule

  ],
  declarations: [OrderDeliveryComponent,OrderDeliveryEditComponent,OrderDeliveryListComponent,GenerateContactAddressComponent,MerchandiseAllerEditComponent,MerchandiseRetourEditComponent,PackageDetailEditComponent,ContactInformationComponent,MarchandiseComponent,TarificationComponent,TransportEditComponent,OrderDeliveryVerificationComponent]
})
export class OrderDeliveryModule { }
