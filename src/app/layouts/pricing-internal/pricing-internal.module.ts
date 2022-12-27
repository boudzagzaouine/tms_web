import { PricingInernalEditComponent } from './pricing-inernal-edit/pricing-inernal-edit.component';


import { ToastModule } from 'primeng/toast';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
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
import { PricingInternalRoutingModule } from './pricing-internal-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingInternalComponent } from './pricing-internal.component';
import { PricingStandardComponent } from './pricing-standard/pricing-standard.component';
import { PricingStandardEditComponent } from './pricing-standard/pricing-standard-edit/pricing-standard-edit.component';

@NgModule({
  imports: [
    CommonModule,
      PricingInternalRoutingModule,
    SharedModule,
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
    ContextMenuModule,
    StepsModule,
    PanelModule,
   SelectButtonModule,
   InputNumberModule,
   DialogModule,
FullCalendarModule,
ToastModule
  ],
  declarations: [PricingInternalComponent,PricingInernalEditComponent,PricingStandardComponent,PricingStandardEditComponent]
})
export class PricingInternalModule { }
