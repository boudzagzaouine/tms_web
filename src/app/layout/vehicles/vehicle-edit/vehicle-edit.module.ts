import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../../shared';
import { NgbModule, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { VehicleEditComponent } from './vehicle-edit.component';
import { VehicleEditRoutingModule } from './vehicle-edit-routing.module';

@NgModule({
    imports: [
        CommonModule,
        VehicleEditRoutingModule,
        PageHeaderModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule,
        NgbModule.forRoot(),
        NgbModule,
    ],
    declarations: [VehicleEditComponent]
})
export class VehicleEditModule {}
