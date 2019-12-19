import { Supplier } from './supplier';
import { InsuranceTerm } from './insurance-term';
import { ContractType } from './contract-type';
import { Vehicle } from './vehicle';


export class Insurance {

  id: number;
  code: string;
  startDate: Date = new Date();
  endDate: Date = new Date((new Date()).getFullYear() + 1, (new Date()).getMonth(), (new Date()).getDate());
  amount: number;
  vehicle: Vehicle;
  insuranceTerm: InsuranceTerm;
  supplier: Supplier;
  description: string;
  vehicleCode:string;
}
