import type { Container } from './container';
import type { ContainerType } from './container-type';
import type { LocationContainerInVehicle } from './location-container-In-Vehicle';
import type { Owner } from './owner';
import type { SaleOrderLine } from './sale-order-line';
import type { VehicleCategory } from './vehicle-category';


export class LoadCategorySaleOrder {

  id: number;
  code: string;
  vehicleCategory : VehicleCategory;
  saleOrderLine:SaleOrderLine;
  locationContainer :LocationContainerInVehicle[]=[];
  weight :number=0;
  totalPalet:number =0;
 

}
