import { Badge } from './badge';
import { Contact } from './contact';
import { User } from './user';


export class Driver {
  id: number;
  code: string;
  cin: string;
  birthDate: Date = new Date();
  badge: Badge;
  lastMedicalVisit: Date = new Date();
  //  workArea: Zone;
  commission: number;
  //contact: Contact;
  // vacation: Vacation;
  creationDate: Date;
  creationUser: User;
  upDateDate: Date;
  working: boolean;

  name: string;
  tele1: String;
  tel2: String;
  surName: String;
  fax: String;
  Type: number;
  email: String;
  comment: String;
  active: boolean;
}
