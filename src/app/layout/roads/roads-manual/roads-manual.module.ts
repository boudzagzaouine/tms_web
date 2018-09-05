import { NgxSpinnerModule } from 'ngx-spinner';
import { RoadsManualComponent } from './roads-manual.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoadsManualRoutingModule } from './roads-manual-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        RoadsManualRoutingModule,
        PageHeaderModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule
    ],
    declarations: [RoadsManualComponent],
})
export class RoadsManualModule {}
