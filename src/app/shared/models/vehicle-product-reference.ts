import type { VehicleProduct } from './vehicle-product';
import type { ProductType } from './product-type';
import type { Product } from './product';
import type { ActionTypeRepair } from './action-type-repair';
import type { Owner } from './owner';


export class VehicleProductReference {

  id: number;

  reference: string;
  vehicleProduct:VehicleProduct;
  // referenceOther:string;
  owner :Owner;
}
