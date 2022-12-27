import { DefaultRoutingModule } from './default-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';

@NgModule({
  imports: [
    CommonModule,
    DefaultRoutingModule
  ],
  declarations: [DefaultComponent]
})
export class DefaultModule { }
