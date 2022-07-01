import { Product } from './product';
import { ActionTypeRepair } from './action-type-repair';
import { Owner } from './owner';


export class VehicleProduct {

  id: number;
  product : Product;
  reference: string;
  owner :Owner;
}
