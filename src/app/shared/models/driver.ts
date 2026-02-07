import type { CommissionDriver } from './commission-driver';
import type { BadgeTypeDriver } from './badge-Type-Driver';
import type { Badge } from './badge';
import type { Contact } from './contact';
import type { User } from './user';
import type { Owner } from './owner';
import type { SubscriptionCard } from './subscription-card';


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

   codeName:string ;
   

}
