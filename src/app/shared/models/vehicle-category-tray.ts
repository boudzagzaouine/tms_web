import { VehicleTray } from './vehicle-tray';
import { VehicleCategory } from './vehicle-category';
import { ActionTypeRepair } from './action-type-repair';
import { Owner } from './owner';


export class VehicleCategoryTray {

  id: number;
  vehicleCategory : VehicleCategory;
  vehicleTray:VehicleTray;
}
