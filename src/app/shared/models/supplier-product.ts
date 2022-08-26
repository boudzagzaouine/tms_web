import { Supplier, Uom, Vat } from '.';
import { Product } from '.';
import { Owner } from './owner';


export class SupplierProduct {

  id: number;
  product: Product;
  supplier: Supplier;
  uom: Uom;
  priceHT: number;
  vat: Vat;
  priceTTC: number;

  owner:Owner ;
}
