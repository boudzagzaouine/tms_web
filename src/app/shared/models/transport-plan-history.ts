import { Account } from './account';
import { TransportPlan } from './transport-plan';
import { Trajet } from './trajet';
import { OrderTransportRejectType } from './order-transport-reject-type';
import { TransportPlanService } from './../services/api/transport-plan.service';
import { Ville } from './ville';
import { TurnStatus } from './turn-status';
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

export class TransportPlanHistory {
  id: number;
  orderTransport: OrderTransport;
  account: Account;
  vehicle: Vehicle;
  transportPlan: TransportPlan;
  driver: Driver;
  vehicleCategory: VehicleCategory;
  transport: Transport;
  turnStatus: TurnStatus;
  salePrice: number;
  purchasePrice: number;
  date: Date = new Date();
  transportPlanRefusDate: Date ;
  transportPlanRejectDate: Date;
  transportPlanCancelDate: Date ;
  // villeSource :Ville;
  // villeDistination : Ville;
  trajet: Trajet;
  orderTransportRejectType: OrderTransportRejectType;
  remark: string;
  type: number;
  marginRate: number;
  margineService: number;

}
