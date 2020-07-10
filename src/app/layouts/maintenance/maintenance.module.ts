import { StepsModule } from 'primeng/steps';
import { PanelModule } from 'primeng/panel';
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
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import { MaintenancePlanComponent } from './maintenance-plan/maintenance-plan.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ActionEditComponent } from './maintenance-plan/action-edit/action-edit.component';
import {DialogModule} from 'primeng/dialog';
import { ProductEditComponent } from './maintenance-plan/action-edit/product-edit/product-edit.component';
import { MaintenanceTraitementComponent } from './maintenance-traitement/maintenance-traitement.component';


@NgModule({
  declarations: [MaintenanceComponent, MaintenancePlanComponent, ActionEditComponent, ProductEditComponent, MaintenanceTraitementComponent],
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
    ConfirmDialogModule,
    ContextMenuModule,
    StepsModule,
    PanelModule,
   SelectButtonModule,
   InputNumberModule,
   DialogModule
    ]
})
export class MaintenanceModule { }
