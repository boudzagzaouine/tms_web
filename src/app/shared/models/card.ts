import {Account} from './account';


export class Card {
  id: number;
  code: string;
  expirationDate: Date;
  amount: number;
  creationDate: Date;
  updateDate: Date;
  isActive: boolean;
  account: Account;
}
