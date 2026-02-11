import type { ConsumptionType } from './consumption-type';
import type { InsuranceTermsVehicle } from './insurance-terms-vehicle';
import type { InsuranceTerm } from './insurance-term';
import type { ContractType } from './contract-type';
import type { Insurance } from './insurance';
import type { VehicleCategory } from './vehicle-category';
import type { BadgeType } from './badge-Type';

export abstract class Patrimony {


  id: number;
  code: string;
  registrationNumber:string;
  patrimony_type;


}
