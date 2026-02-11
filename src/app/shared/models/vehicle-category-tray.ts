import type { VehicleTray } from './vehicle-tray';
import type { VehicleCategory } from './vehicle-category';
import type { ActionTypeRepair } from './action-type-repair';
import { Owner } from './owner';


export class VehicleCategoryTray {

  id: number;
  vehicleCategory : VehicleCategory;
  vehicleTray:VehicleTray;
}
