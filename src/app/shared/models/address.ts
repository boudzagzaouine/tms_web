import type { Company } from './company';
import type { Pays } from './pays';
import type { Ville } from './ville';
import type { Account } from './account';
import type { Owner } from './owner';

export class Address {
  id: number;
  code: string;
  name :String ;
  line1: string;
  line2: string;
  zip: string;
  digiCode: string;
  city: string;
  state: string;
  country: string;

   ville:Ville;
   pays:Pays;
   addressType:number;
   delivery:Boolean=false;
  creationDate: Date;
  updateDate: Date;
  addressTypeTms: string;
  latitude:number;
  longitude:number
  account :Account;
  company :Company;
  owner:Owner;
}
