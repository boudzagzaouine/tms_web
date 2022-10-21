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

export class TransportPlan {
  id: number;

  dateDelivery: Date= new Date();


  packagingType:PackagingType;
  loadingType:string;
  turnType :TurnType;



}
