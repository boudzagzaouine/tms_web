import { Supplier } from './supplier';
import { InsuranceTerm } from './insurance-term';
import { ContractType } from './contract-type';
import { Vehicle } from './vehicle';


export class Insurance {

  id: number;
  code: string;
  startDate: Date = new Date();
  endDate: Date = new Date();
  amount: number;
  vehicle: Vehicle;
  insuranceTerm: InsuranceTerm;
  supplier: Supplier;
  description: string;
}
