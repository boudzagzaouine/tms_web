import {Account} from './account';
import { Currency } from '.';

export class Card {
  id: number;
  code: string;
  expirationDate: Date;
  amount: number;
  creationDate: Date;
  updateDate: Date;
  isActive: boolean;
  currency: Currency;
  account: Account;
}
