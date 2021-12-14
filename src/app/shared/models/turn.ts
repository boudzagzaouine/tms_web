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

export class Turn {
  id: number;
  //drivers: Driver[] = [];
  //vehicle: Vehicle;
  //vehicleCategory : VehicleCategory;
 // transport: Transport;
  turnTransports :TurnTransport[]=[];
  dateDelivery: Date= new Date();
  turnSoPos: TurnSoPo[] = [];
  turnType:TurnType;
  totalSoTTC:number=0;
  totalPoTTC:number=0;
  totalSoQnt:number=0;
  totalPoQnt : number=0;
  totalSoPriceTurn : number=0;
  totalPoPriceTurn : number=0;
  packagingType:string;
}
