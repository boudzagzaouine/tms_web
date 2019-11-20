import { Badge } from './badge';
import { Contact } from './contact';
import { User } from './user';


export class Driver {
    id: number;
    code: string;
    cin: string;
    birthDate: Date;
    badge: Badge;
    lastMedicalVisit: Date;
  //  workArea: Zone;
    commission: number;
    contact: Contact;
   // vacation: Vacation;
    creationDate: Date;
    creationUser: User;
    upDateDate: Date;
    working: boolean;
}
