import { Badge } from './badge';
import { VehicleCategory } from './vehicleCategory';
import { Traffic } from './traffic';
import { User } from './user';
export class Vehicle{
    id:number;
    registrationNumber:string;
    badge:Badge;
    code:string;
    technicalVisit:Date;

    category:VehicleCategory;
    drivingLicence:Traffic;

    creationDate:Date;
    creationUser:User;
    upDateDate:Date;
}