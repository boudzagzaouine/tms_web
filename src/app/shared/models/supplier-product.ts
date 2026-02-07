import { Supplier } from './supplier';
import { Uom } from './uom';
import { Vat } from './vat';
import { Product } from './product';
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
