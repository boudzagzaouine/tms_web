import { Contact } from './contact';
import { Address } from './address';
import { Card } from './card';
import { Owner } from './owner';
export class Account {
  id: number;
  code: string;
  name: string;
  description: string;
  creationDate: Date;
  updateDate: Date;
  cards: Card[] = [];
  active: boolean;
  deliveryAddress: Address = new Address();
  contact: Contact = new Contact();
  owner: Owner = new Owner();
}
