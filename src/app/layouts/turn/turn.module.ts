import { TurnCategoryComponent } from './turn-edit/turn-category/turn-category.component';
import { TurnItineraryComponent } from './turn-edit/turn-itinerary/turn-itinerary.component';
import { BrowserModule } from '@angular/platform-browser';
import { DeliveryInformationsComponent } from './turn-edit/delivery-informations/delivery-informations.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SharedModule } from './../../shared/shared.module';
import { TreeTableModule } from 'primeng/treetable';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
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
import { DeliveryLineEditComponent } from './turn-edit/delivery-line-edit/delivery-line-edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TurnListComponent } from './turn-list/turn-list.component';
import { DeliveryComponent } from './turn-list/delivery/delivery.component';
import { DeliveryLineComponent } from './turn-list/delivery/delivery-line/delivery-line.component';
import { PurchaseLineEditComponent } from './turn-edit/purchase-line-edit/purchase-line-edit.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import { TabViewModule } from 'primeng/tabview';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ContextMenuModule } from 'primeng/contextmenu';
import { PanelModule } from 'primeng/panel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DialogModule } from 'primeng/dialog';
import {OverlayPanelModule} from 'primeng/overlaypanel';


@NgModule({
  declarations: [TurnComponent,
     TurnEditComponent, DeliveryLineEditComponent,DeliveryInformationsComponent,
      TurnListComponent, DeliveryComponent, DeliveryLineComponent,PurchaseLineEditComponent,
      TurnItineraryComponent,
      //TurnCategoryComponent
    ],
  imports: [
    CommonModule,
    TurnRoutingModule,
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
     TreeTableModule



    ]
})
export class TurnModule { }
