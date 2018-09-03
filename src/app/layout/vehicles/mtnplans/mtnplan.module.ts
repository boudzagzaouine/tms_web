import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MtnPlanComponent } from './mtnplan.component';
import { MtnPlanRoutingModule } from './mtnplan-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MtnPlanRoutingModule,
        PageHeaderModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule
    ],
    declarations: [MtnPlanComponent]
})
export class MtnPlanModule {}
