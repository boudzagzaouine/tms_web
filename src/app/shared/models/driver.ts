import { Contact } from "./contact";
import { User } from "./user";
import { Badge } from "./badge";
import { Zone } from "./zone";
import { Vacation } from "./vacation";

export class Driver {
    id: number;
    code: string;
    cin: string;
    birthDate: Date;
    badges: Badge[] = [];
    lastMedicalVisit: Date;
    workArea: Zone;
    commission: number;
    contact: Contact;
    vacation: Vacation;
    creationDate: Date;
    creationUser: User;
    upDateDate: Date;
    working: boolean;
}
