import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaintenancePlanComponent } from './maintenancePlan-edit.component';
import { MaintenancePlanRoutingModule } from './maintenancePlan-edit-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MaintenancePlanRoutingModule,
        PageHeaderModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule
    ],
    declarations: [MaintenancePlanComponent]
})
export class VehicleMaintenancePlanModule {}
