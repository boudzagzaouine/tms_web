import { SaleOrderStock } from './sale-order-stock';
import { Vehicle } from './vehicle';
import { Driver } from './driver';

export class Turn {
  id: number;
  drivers: Driver[] = [];
  vehicle: Vehicle;
  transport: Transport;
  dateDelivery: Date;
  saleOrderStocks: SaleOrderStock[] = [];
}
