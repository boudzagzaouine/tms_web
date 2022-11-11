import { PackagingType } from './packaging-type';
import { Company } from './company';
import { Owner } from './owner';

export class AddressContactOrderTransportInfo {
  id: number;

  name: string;
  tel1: String;
  email: String;
  company: Company;


  line1: string;
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
