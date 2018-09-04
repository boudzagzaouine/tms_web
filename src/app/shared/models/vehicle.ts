import { VehicleCategory } from "./vehicleCategory";
import { Traffic } from "./traffic";
import { User } from "./user";
import { BadgeType } from "./badgeType";
export class Vehicle {
    id: number;
    registrationNumber: string;
    badgeType: BadgeType;
    code: string;
    technicalVisit: Date;

    vehicleVategory: VehicleCategory;
    drivingLicence: Traffic;

    creationDate: Date;
    creationUser: User;
    upDateDate: Date;
}
