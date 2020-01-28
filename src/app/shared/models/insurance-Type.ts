import { InsuranceTypeTerms } from './insurance-type-terms';


export class InsuranceType {

  id: number;
  code: string;
  description: string;

  insuranceTypeTermsSet: InsuranceTypeTerms[] = [];


}
