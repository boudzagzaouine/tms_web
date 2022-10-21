import { VehicleProduct } from './vehicle-product';
import { ProductType } from './product-type';
import { Product } from './product';
import { ActionTypeRepair } from './action-type-repair';
import { Owner } from './owner';


export class VehicleProductReference {

  id: number;

  reference: string;
  vehicleProduct:VehicleProduct;
  // referenceOther:string;
  owner :Owner;
}
