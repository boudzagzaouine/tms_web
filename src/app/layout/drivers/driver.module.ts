import { NgxSpinnerModule } from 'ngx-spinner';
import { DriverComponent } from './driver.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverRoutingModule } from './driver-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DriverEditComponent } from './driver-edit/driver-edit.component';

@NgModule({
    imports: [
        CommonModule,
        DriverRoutingModule,
        PageHeaderModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule
    ],
    declarations: [DriverComponent, DriverEditComponent]
})
export class DriverModule {}
