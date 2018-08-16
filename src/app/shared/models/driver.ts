import { Contact } from './contact';
import { User } from './user';
import { Badge } from './badge';
import { Zone } from './zone';
import { Vacation } from './vacation';

export class Driver {
    id:number;
    code:string;
    cin:string;
    date:Date;
    badges: Badge[]=[];
    lastMedicalVisit:Date;
    workArea:Zone;
    vacation:Vacation;
    commission:number;
    contact:Contact;
    creationDate:Date;
    creationUser:User;
    upDateDate:Date;
    working:boolean;
}