import { Insurance } from './insurance';
import { VehicleCategory } from './vehicle-category';
import { BadgeType } from './badge-Type';

export class Vehicle {


  id: number;
  registrationNumber = '';
  code = '';
  technicalVisit: Date = new Date();
  creationDate: Date = new Date();
  vehicleCategory: VehicleCategory;
  badgeType: BadgeType;
  insurance: Insurance;


}
