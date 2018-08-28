import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DriverZonesComponent } from './driver-zones.component';
import { DriverZonesRoutingModule } from './driver-zones-routing.module';

@NgModule({
    imports: [
        CommonModule,
        DriverZonesRoutingModule,
        PageHeaderModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule
    ],
    declarations: [DriverZonesComponent]
})
export class DriverZonesModule {}
