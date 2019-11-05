import { AppSampleRoutingModule } from './sample-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleComponent } from './sample.component';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [SampleComponent],
  imports: [
    CommonModule, AppSampleRoutingModule, InputTextModule, ButtonModule
  ]
})
export class SampleModule { }
