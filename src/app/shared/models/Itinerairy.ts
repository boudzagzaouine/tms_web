import { OrderTransport } from './order-transport';
import { ActionType } from './action-type';
import { MaintenanceState } from './maintenance-state';
import { MaintenancePlan } from './maintenance-plan';
import { Product } from './product';
import { Uom } from './uom';
import { ActionLine } from './action-line';
import { OrderTransportInfoLine } from './order-transport-info-line';

export class Itinerary {

  id = 0;
  lat: number;
  lon: number;
  description: string;
  type: string;
  status: string;
  date :Date;


orderTransportInfoLine:OrderTransportInfoLine;
  dateArriver :Date;
  dateCommancerChargement:Date;
  dateCommancerDechargement:Date;
  dateFinDechargement:Date;
  dateFinChargement:Date;

}
