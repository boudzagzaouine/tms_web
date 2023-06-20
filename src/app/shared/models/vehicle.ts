import { BrandVehicleType } from './brand-vehicle-type';
import { VehicleTray } from './vehicle-tray';
import { VehicleProduct } from './vehicle-product';
import { Driver } from './driver';
import { Patrimony } from './patrimony';
import { ConsumptionType } from './consumption-type';
import { InsuranceTermsVehicle } from './insurance-terms-vehicle';
import { InsuranceTerm } from './insurance-term';
import { ContractType } from './contract-type';
import { Insurance } from './insurance';
import { VehicleCategory } from './vehicle-category';
import { BadgeType } from './badge-Type';
import { MaintenancePlan } from './maintenance-plan';
import { Owner } from './owner';
import { Transport } from './transport';

export class Vehicle extends Patrimony {


  id: number;
  registrationNumber = '';
  code ;
  technicalVisit: Date = new Date();
  valueTechnicalVisit: number;
  creationDate: Date = new Date();
  vehicleCategory: VehicleCategory;
  badgeType: BadgeType;
  //insurance: Insurance;
  contractType: ContractType;
  consumptionType: ConsumptionType;
  engineOil: number;
  rearDeck: number;
  direction: number;
  airFilter: number;
  radiator: number;
  gearBox: number;
  desiccantFilter: number;
  grayCard: string;
  numberCylinder: number;
  fiscalPower: number;
  body: string;
  chassisNumber: string;
  energy: string;
  vignette: Date = new Date();
  valueVignette: number;
  insuranceTerms: InsuranceTerm[] = [];

  aquisitionDate: Date = new Date();
  amount: number;
  patrimony_type='vehicule';
 // insuranceTermVehicles: InsuranceTermsVehicle[] = [];
  transport: Transport;
  maintenancePlan :MaintenancePlan;
  initialMileage:number;
  currentMileage:number;
  release :Date = new Date();
  age :  number =0;
  owner:Owner;
  priceTurn:number=0;
  driver :Driver;
  fixOrVariable: string;
  dateDriver:Date;
  vehicleProducts: VehicleProduct[]=[];
  vehicleTray:VehicleTray;
  brandVehicleType :BrandVehicleType;
    interneOrExterne:string ;
    durationInMonths:number ;
    state : string ; // local
    lastCity :string ;
}
