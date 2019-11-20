import { Supplier } from './supplier';
import { InsuranceTerm } from './term-insurance';
import { ContractType } from './contract-type';


export class Insurance {

  id: number;
  code: string;
  startDate: Date;
  endDate: Date;
  amout: number;
  contactType: ContractType;
  termInsurance: InsuranceTerm;
  supplier: Supplier;
}
