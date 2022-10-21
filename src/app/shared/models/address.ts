import { Owner } from './owner';

export class Address {
  id: number;
  code: string;
  line1: string;
  line2: string;
  zip: string;
  digiCode: string;
  city: string;
  state: string;
  country: string;
  creationDate: Date;
  updateDate: Date;
  addressTypeTms: string;
  latitude:number;
  longitude:number
  owner:Owner;
}
