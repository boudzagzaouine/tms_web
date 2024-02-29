import { OrderTransportInfo } from './order-transport-info';
import { TransportPlan } from './transport-plan';
import { OrderTransportRejectType } from './order-transport-reject-type';
import { TransportPlanService } from './../services/api/transport-plan.service';
import { Ville } from './ville';
import {  TurnStatus } from './turn-status';
import { OrderTransport } from './order-transport';
import { PackagingType } from './packaging-type';
import { TurnLine } from './turn-line';
import { Vehicle } from './vehicle';
import { Driver } from './driver';
import { TurnType } from './turn-Type';
import { SaleOrder } from './sale-order';
import { PurchaseOrder } from './purchase-order';
import { TurnSoPo } from './turn-so-po';
import { Transport } from './transport';
import { VehicleCategory } from './vehicle-category';
import { TurnTransport } from './turn-transport';
import { LoadingType } from './loading-type';
import { OrderTransportInfoLine } from './order-transport-info-line';

export class TransportPlanLocation {
  id: number;
  latitude:number;
  longitude :number;
  transportPlan:TransportPlan;
  vehicle :Vehicle ;
  driver :Driver ;
  orderTransport:OrderTransport;
  orderTransportInfo:OrderTransportInfo;
  orderTransportInfoLine:OrderTransportInfoLine;
  date :Date ;

  type:string;


}
