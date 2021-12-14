import { Container } from './container';
import { ContainerType } from './container-type';
import { LocationContainerInVehicle } from './location-container-In-Vehicle';
import { Owner } from './owner';
import { SaleOrderLine } from './sale-order-line';
import { VehicleCategory } from './vehicle-category';


export class LoadCategorySaleOrder {

  id: number;
  code: string;
  vehicleCategory : VehicleCategory;
  saleOrderLine:SaleOrderLine;
  locationContainer :LocationContainerInVehicle[]=[];
  weight :number=0;
  totalPalet:number =0;
 

}
