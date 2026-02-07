import type { Company } from './company';
import type { Contact } from './contact';
import type { Address } from './address';
import type { Card } from './card';
import type { Owner } from './owner';
import type { Planning } from './planning';
export class Account {
    id = 0;
    code: string= '';
    name: string = '';
    telephone:string;
   email:string;
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
    deliveryDate : Date;
    contacts :Contact[]=[];
    addresses:Address[]=[];

   


// goingSource -goingDistinataire - coming
  type :string;

}

