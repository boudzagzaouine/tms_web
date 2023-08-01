import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { AddRetourOrderTransportComponent } from './add-retour-order-transport.component';
import { AddRetourOrderTransportListComponent } from './add-retour-order-transport-list/add-retour-order-transport-list.component';
import { AddRetourOrderTransportRoutingModule } from './add-retour-order-transport-routing.module';

@NgModule({
  declarations: [AddRetourOrderTransportComponent,AddRetourOrderTransportListComponent],
  imports: [
CommonModule,SharedModule,AddRetourOrderTransportRoutingModule
    
  ]
})
export class AddRetourOrderTransportModule { }
