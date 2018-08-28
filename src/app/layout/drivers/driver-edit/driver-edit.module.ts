import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DriverEditComponent } from './driver-edit.component';
import { BadgeEditComponent } from '../badge-edit/badge-edit.component';
import { DriverEditRoutingModule } from './driver-edit-routing.module';

@NgModule({
    imports: [
        CommonModule,
        DriverEditRoutingModule,
        PageHeaderModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule
    ],
    declarations: [DriverEditComponent, BadgeEditComponent],
    entryComponents: [BadgeEditComponent]
})
export class DriverEditModule {}
