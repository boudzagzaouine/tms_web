import { OrderTransport } from './order-transport';
import { Account } from './account';
import { Address } from './address';
import { Transport } from './transport';
import { Supplier } from './supplier';
import { Uom } from './uom';
import { Vat } from './vat';
import { Product } from './product';
import { Owner } from './owner';


export class TransportPlanServiceCatalog {

  id: number;
  product: Product;
  transport: Transport;
  account:Account;
  address: Address;
  invoice:Boolean;
  purchasePriceHT: number;
  purchaseVat: Vat;
  purchasePriceTTC: number;
  purchasePriceVat: number;
 dateService: Date = new  Date();
  quantity : number;
  orderTransport:OrderTransport;
  salePriceHT: number;
  saleVat: Vat;
  salePriceTTC: number;
  salePriceVat: number;

  totalSalePriceHT: number;
  totalSalePriceTTC: number;
  totalSalePriceVat: number;

  totalPurchasePriceHT: number;
  totalPurchasePriceTTC: number;
  totalPurchasePriceVat: number;
  owner:Owner ;
}
