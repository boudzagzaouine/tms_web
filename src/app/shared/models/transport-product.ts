import { Transport } from './transport';
import { Supplier, Uom, Vat } from '.';
import { Product } from '.';
import { Owner } from './owner';


export class TransportProduct {

  id: number;
  product: Product;
  transport: Transport;
  priceHT: number;
  vat: Vat;
  priceTTC: number;

  owner:Owner ;
}
