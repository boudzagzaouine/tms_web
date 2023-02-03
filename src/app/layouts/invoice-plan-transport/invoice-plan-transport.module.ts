import { InvoicePlanTransportRoutingModule } from './invoice-plan-transport-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicePlanTransportComponent } from './invoice-plan-transport.component';

@NgModule({
  imports: [
    CommonModule,
    InvoicePlanTransportRoutingModule
  ],
  declarations: [InvoicePlanTransportComponent]
})
export class InvoicePlanTransportModule { }
