import { ActionType } from './action-type';
import { MaintenanceState } from './maintenance-state';
import { MaintenancePlan } from './maintenance-plan';
import { Product } from './product';
import { Uom } from './uom';
import { ActionLine } from './action-line';

export class Itinerary {

  id = 0;
  lat: number;
  lon: number;
  description: string;
  type: string;


}
