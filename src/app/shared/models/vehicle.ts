import { ContractType } from './contract-type';
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
  contractType: ContractType;

  engineOil :number;
  rearDeck : number;
  direction : number;
  airFilter : number;
  radiator : number;
  gearBox : number;
  desiccantFilter : number ;
  grayCard : string;
  numberCylinder : number;
  fiscalPower : number;
  body:string;
  chassisNumber : string;
  energy :string;


}
