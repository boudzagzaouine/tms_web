import {AccountInvoice} from './account-invoice';
import {Product} from './product';

export class AccountInvoiceLine {

  id: number;
  lineNumber: number;
  tariffPrice: number ;
  discount: number;
  vat: number;
  priceHT: number;
  priceTTC: number;
  creationDate: Date;
  updateDate: Date;
  product: Product;
  accountInvoice: AccountInvoice;
}



