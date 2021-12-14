import { Container } from './container';
import { ContainerType } from './container-type';
import { Owner } from './owner';
import { SaleOrder } from './sale-order';
import { SaleOrderLine } from './sale-order-line';
import { VehicleCategory } from './vehicle-category';


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
