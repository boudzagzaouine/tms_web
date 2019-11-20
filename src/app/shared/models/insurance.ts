import { Supplier } from './supplier';
import { TermInsurance } from './term-insurance';
import { ContractType } from './contract-type';


export class Insurance {

  id: number;
  code: string;
  startDate: Date;
  endDate: Date;
  amout: number;
  contactType: ContractType;
  termInsurance: TermInsurance;
  supplier: Supplier;
}
