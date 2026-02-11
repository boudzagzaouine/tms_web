import type { VehicleProductReference } from './vehicle-product-reference';
import type { ProductType } from './product-type';
import type { Product } from './product';
import type { ActionTypeRepair } from './action-type-repair';
import type { Owner } from './owner';


export class VehicleProduct {

  id: number;
  product : Product;
  productType:ProductType;
  vehicleProductReferences : VehicleProductReference[]=[];
  // reference: string;
  // referenceOther:string;
  owner :Owner;
}
