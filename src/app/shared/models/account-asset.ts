import {Currency} from './currency';
import {SaleOrder} from './sale-order';

export class AccountAsset {

  id: number;
  code: string;
  amount: number;
  expirationDate: Date;
  isUsed: boolean;
  creationDate: Date;
  updateDate: Date;
  currency: Currency;
  saleOrder: SaleOrder;
  constructor() {}
}
