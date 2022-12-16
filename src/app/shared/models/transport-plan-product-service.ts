import { TransportPlan } from './transport-plan';
import { Transport } from './transport';
import { Supplier, Uom, Vat } from '.';
import { Product } from '.';
import { Owner } from './owner';


export class TransportPlanProductService {

  id: number;
  product: Product;
  transport: Transport;
  priceHT: number;
  vat: Vat;
  priceTTC: number;
   TransportPlan:TransportPlan;
  owner:Owner ;
}
