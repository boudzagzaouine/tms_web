import type { PackagingType } from './packaging-type';
import type { Company } from './company';
import type { Owner } from './owner';

export class AddressContactOrderTransportInfo {
  id: number;

  name: string;
  tel1: String;
  email: String;
  account: String;


  line1: string;
  trajet :string;
  city: string;
  zip: string;
 country: string="MAROC";

  date: Date =new Date();

  latitude:number;
  longitude:number;

  creationDate: Date;
  updateDate: Date;
  owner:Owner;


  packagingTypeAller: PackagingType ;
  packagingTypeRetour : PackagingType ;
// goingSource -goingDistinataire - coming
  type :string;
}
