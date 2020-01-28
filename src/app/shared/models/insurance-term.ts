import { InsuranceTypeTerms } from './insurance-type-terms';


export class InsuranceTerm {

  id: number;
  code: string;
  description: string;
  roofed: boolean = false;

  insuranceTypeTermsSet: InsuranceTypeTerms[] = [];

}
