import type { Address } from './address';
import type { ContactFunction } from './contact-function';
import type { Account } from './account';
import type { Owner } from './owner';

export class Contact {
    id: number;
    code :string;
    name: string;
    tel1: String;
    updateDate: Date;
    tel2: String;
    creationDate: Date;
    surname: String;
    fax: String;
    contactType: number;
    email: String;
    comment: String;
    active: boolean=true;
    delivery: boolean=false;

    account:Account;
    owner:Owner;
    contactFunction:ContactFunction;
    address:Address;
}
