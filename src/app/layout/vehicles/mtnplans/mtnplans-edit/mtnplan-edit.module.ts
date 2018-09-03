import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MtnPlanEditComponent } from './mtnplan-edit.component';
import { MtnPlanEditRoutingModule } from './mtnplan-edit-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MtnPlanEditRoutingModule,
        PageHeaderModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule
    ],
    declarations: [MtnPlanEditComponent]
})
export class MtnPlanEditModule {}
