import { VehicleCategory } from './vehicle-category';
import { BadgeType } from './badge-Type';

export class Vehicle {


  id: number;
  registrationNumber = '';
  code = '';
  technicalVisit: Date;
  creationDate: Date;
  vehicleCategory: VehicleCategory;
  badgeType: BadgeType;


}
