import { InputNumberModule } from 'primeng/inputnumber';
import { StepsModule } from 'primeng/steps';
import { PanelModule } from 'primeng/panel';
import { ContextMenuModule } from 'primeng/contextmenu';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {CalendarModule} from 'primeng/calendar';
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
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import { MaintenancePlanComponent } from './maintenance-plan/maintenance-plan.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import { ActionEditComponent } from './maintenance-plan/action-edit/action-edit.component';
import {DialogModule} from 'primeng/dialog';
import { ProductEditComponent } from './maintenance-plan/action-edit/product-edit/product-edit.component';
import { MaintenanceTraitementComponent } from './maintenance-traitement/maintenance-traitement.component';
import { MaintenanceProductComponent } from './maintenance-plan/maintenance-product/maintenance-product.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import { MaintenanceCalendarComponent } from './maintenance-calendar/maintenance-calendar.component';
 import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import { ToastModule } from 'primeng/toast';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);


@NgModule({
  declarations: [MaintenanceComponent, MaintenancePlanComponent,
     ActionEditComponent, ProductEditComponent, MaintenanceTraitementComponent,
     MaintenanceProductComponent,MaintenanceCalendarComponent
      ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
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


    ]
})
export class MaintenanceModule { }
