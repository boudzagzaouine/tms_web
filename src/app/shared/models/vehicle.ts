import { Badge } from './badge';
import { Category } from './category';
import { Traffic } from './traffic';
import { User } from './user';
export class Vehicle{
    id:number;
    registrationNumber:string;
    badge:Badge;
    code:string;
    technicalVisit:Date;

    category:Category;
    drivingLicence:Traffic;

    creationDate:Date;
    creationUser:User;
    upDateDate:Date;
}