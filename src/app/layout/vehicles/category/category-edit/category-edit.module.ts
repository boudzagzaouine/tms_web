import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryEditComponent } from '././category-edit.component';
import { CategoryRoutingModule } from './../category-routing.module';

@NgModule({
    imports: [
        CommonModule,
        CategoryRoutingModule,
        PageHeaderModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule
    ],
    declarations: [CategoryEditComponent]
})
export class VehicleCategoryEditModule {}
