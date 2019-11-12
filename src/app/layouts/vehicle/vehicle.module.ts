import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleComponent } from './vehicle.component';
import {DropdownModule} from 'primeng/dropdown';
import { VehicleEditComponent } from './vehicle-edit/vehicle-edit.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';

@NgModule({
  declarations: [VehicleComponent, VehicleEditComponent , VehicleListComponent],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    TranslateModule,
    InputTextModule,
    TableModule,
    DropdownModule
  ]
})
export class VehicleModule { }
