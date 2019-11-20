import { VehicleCategory } from './vehicle-category';
import { BadgeType } from './badge-Type';

export class Vehicle {


  id: number;
  registrationNumber: string = "";
  code: string = "";
  technicalVisit: Date;
  creationDate: Date;
  vehiculeCategorie: VehicleCategory;
  badgeType: BadgeType;


}
