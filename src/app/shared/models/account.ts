import { Company } from './company';
import { Contact } from './contact';
import { Address } from './address';
import { Card } from './card';
import { Owner } from './owner';
import { Planning } from './planning';
export class Account {
    id = 0;
    code: string;
    name: string;
    description: string;
    creationDate: Date;
    updateDate: Date;
    cards: Card[] = [];
    active: boolean = true;
    deliveryAddress: Address;
    contact: Contact;
    owner: Owner;
    company: Company;
    credit: number;
    maxCredit: number;
    wholesale: boolean = false;
    plannings :Planning[]=[];
}
