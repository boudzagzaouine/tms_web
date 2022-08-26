import { ProductType } from './product-type';
import { Product } from './product';
import { ActionTypeRepair } from './action-type-repair';
import { Owner } from './owner';


export class VehicleProduct {

  id: number;
  product : Product;
  productType:ProductType;
  reference: string;
  referenceOther:string;
  owner :Owner;
}
