import { NgxSpinnerModule } from 'ngx-spinner';
import { RoadsAutoComponent } from './roads-auto.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoadsAutoRoutingModule } from './roads-auto-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        RoadsAutoRoutingModule,
        PageHeaderModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule
    ],
    declarations: [RoadsAutoComponent],
})
export class RoadsAutoModule {}
