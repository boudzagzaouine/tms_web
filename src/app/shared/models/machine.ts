import { Patrimony } from './patrimony';
import type { ConsumptionType } from './consumption-type';
import type { InsuranceTermsVehicle } from './insurance-terms-vehicle';
import type { InsuranceTerm } from './insurance-term';
import type { ContractType } from './contract-type';
import type { Insurance } from './insurance';
import type { VehicleCategory } from './vehicle-category';
import type { BadgeType } from './badge-Type';
import type { MaintenancePlan } from './maintenance-plan';
import type { Owner } from './owner';
import type { Transport } from './transport';

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
