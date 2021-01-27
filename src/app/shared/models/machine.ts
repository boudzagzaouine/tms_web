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

export class Machine extends Patrimony {


  id: number;
  code = '';
  ref : string;
  contractType: ContractType;
  consumptionType: ConsumptionType;
  aquisitionDate: Date = new Date();
  amount: number;
  patrimony_type = 'machine';
  transport: Transport;
  maintenancePlan :MaintenancePlan;
  owner:Owner;
  resource:Machine;
  name:string;
  
}
