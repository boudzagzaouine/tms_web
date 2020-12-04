import { InsuranceTypeTerms } from './insurance-type-terms';
import { Owner } from './owner';


export class InsuranceType {

  id: number;
  code: string;
  description: string;
 owner: Owner;
  insuranceTypeTermsSet: InsuranceTypeTerms[] = [];

  public toString = () : string => {
    console.log("tostring ");
    return this.code;

}

}
