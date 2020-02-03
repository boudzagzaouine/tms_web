import { InsuranceType } from './insurance-Type';
import { InsuranceTerm } from './insurance-term';



export class InsuranceTypeTerms {

  id = 0;
  insuranceTerm: InsuranceTerm;
  insuranceType: InsuranceType;
  amount: number;


  constructor(insuranceType: InsuranceType=null, insuranceTerm: InsuranceTerm=null, amount: number=null) {

    this.insuranceTerm = insuranceTerm;
    this.insuranceType = insuranceType;
    this.amount = amount;
  }


}
