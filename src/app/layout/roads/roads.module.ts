import { NgxSpinnerModule } from 'ngx-spinner';
import { RoadsComponent } from './roads.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoadsRoutingModule } from './roads-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        RoadsRoutingModule,
        PageHeaderModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule
    ],
    declarations: [RoadsComponent],
})
export class DriverModule {}
