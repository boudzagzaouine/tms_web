import { Patrimony } from './patrimony';
import { ConsumptionType } from './consumption-type';
import { InsuranceTermsVehicle } from './insurance-terms-vehicle';
import { InsuranceTerm } from './insurance-term';
import { ContractType } from './contract-type';
import { Insurance } from './insurance';
import { VehicleCategory } from './vehicle-category';
import { BadgeType } from './badge-Type';

export class Machine extends Patrimony {


  id: number;
  code = '';
  contractType: ContractType;
  consumptionType: ConsumptionType;
  aquisitionDate: Date = new Date();
  amount: number;
  patrimony_type='machine';
  transport: Transport;

}
