import { Contact } from './contact';
import { User } from './user';

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