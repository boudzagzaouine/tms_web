import { Address } from './address';
import { Transport } from './transport';
import { Supplier, Uom, Vat } from '.';
import { Product } from '.';
import { Owner } from './owner';


export class TransportPlanServiceCatalog {

  id: number;
  product: Product;
  transport: Transport;
  address:Address;
  invoice:Boolean;
  purchasePriceHT: number;
  purchaseVat: Vat;
  purchasePriceTTC: number;

  salePriceHT: number;
  saleVat: Vat;
  salePriceTTC: number;
  salePriceVat: number;
  owner:Owner ;
}
