import { Driver } from './driver';
import { Vehicle } from './vehicle';
import { OrderTransport } from './order-transport';
import { ActionType } from './action-type';
import { MaintenanceState } from './maintenance-state';
import { MaintenancePlan } from './maintenance-plan';
import { Product } from './product';
import { Uom } from './uom';
import { ActionLine } from './action-line';
import { OrderTransportInfoLine } from './order-transport-info-line';
import { TransportPlan } from './transport-plan';

export class Itinerary {

  id = 0;
  lat: number;
  lon: number;
  description: string;
  type: string;
  status: string;
  date :Date;

transportPlan:TransportPlan;
orderTransportInfoLine:OrderTransportInfoLine;
  dateArriver :Date;
  dateCommancerChargement:Date;
  dateCommancerDechargement:Date;
  dateFinDechargement:Date;
  dateFinChargement:Date;
  lineNumber:number;

  vehicle:Vehicle;
  driver:Driver;
}
