import type { Container } from './container';
import type { ContainerType } from './container-type';
import type { Owner } from './owner';
import type { SaleOrder } from './sale-order';
import type { SaleOrderLine } from './sale-order-line';
import type { VehicleCategory } from './vehicle-category';


export class LocationContainerInVehicle {

  id: number;
  saleOrder:SaleOrder;
  containers :Container;
  length:number;
  width:number;
  i:number;
  j:number;
  locationContainer:LocationContainerInVehicle[]=[];
  
}
