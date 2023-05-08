import { CommissionDriver } from './commission-driver';
import { BadgeTypeDriver } from './badge-Type-Driver';
import { Badge } from './badge';
import { Contact } from './contact';
import { User } from './user';
import { Owner } from './owner';
import { SubscriptionCard } from './subscription-card';


export class Driver {
  id: number;
  code: string;
  cin: string;
  birthDate: Date = new Date();
  badge: Badge;
  lastMedicalVisit: Date = new Date();
  subscriptionCard :SubscriptionCard;

  //  workArea: Zone;
  commission: number;
  //contact: Contact;
  // vacation: Vacation;
  creationDate: Date;
  creationUser: User;
  upDateDate: Date;
  working: boolean;
   carte:String;
  name: string;
  tele1: String;
  tel2: String;
  surName: String;
  fax: String;
  Type: number;
  email: String;
  comment: String;
  active: boolean;

  badgeTypeDrivers : BadgeTypeDriver[]=[];
  commissions : CommissionDriver[]=[];
  owner:Owner;
   charged: Date;
   salary : Date;
   dateOfAssignment: Date = new Date() ;
   codeName:string  ;

}
