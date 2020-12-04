import { Transport } from './transport';
import { TranslateModule } from '@ngx-translate/core';
import { VehicleCategory } from './vehicle-category';
import { Owner } from './owner';


export class TransportCategoryVehicle {

  id: number;
  vehicleCategory: VehicleCategory;
  transport: Transport;
  quantity: number;
  owner:Owner;
}
