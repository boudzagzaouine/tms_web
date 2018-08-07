import { Currency } from './currency';
import { AccountInvoiceLine } from './account-invoice-line';
import { Account } from './account';
import { Owner } from './owner';
import { PaymentType } from './payment-method';
import { User } from './user';

export class AccountInvoice {
  id: number;
  code: string;
  vat: number;
  priceHT: number;
  priceTTC: number;
  creationDate: Date;
  updateDate: string;
  owner: Owner;
  currency: Currency;
  user: User;
  account: Account;
  accountInvoiceLines: AccountInvoiceLine[];
}
