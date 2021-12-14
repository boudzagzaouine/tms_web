import { TurnLine } from './turn-line';
import { Vehicle } from './vehicle';
import { Driver } from './driver';
import { TurnType } from './turn-Type';
import { SaleOrder } from './sale-order';
import { PurchaseOrder } from './purchase-order';
import { TurnSoPo } from './turn-so-po';
import { Transport } from './transport';
import { VehicleCategory } from './vehicle-category';

export class TurnTransport {
  
  id: number;
  drivers: Driver[] = [];
  vehicle: Vehicle;
  vehicleCategory : VehicleCategory;
  transport: Transport;
  totalPrice :number=0;
  numberOfPalette:number= 0;
 

}
