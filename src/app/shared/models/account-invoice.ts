import type { Currency } from './currency';
import type { AccountInvoiceLine } from './account-invoice-line';
import type { Account } from './account';
import type { Owner } from './owner';
import type { User } from './user';

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
