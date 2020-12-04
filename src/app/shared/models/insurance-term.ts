import { InsuranceTypeTerms } from './insurance-type-terms';
import { Input } from '@angular/core';
import { Owner } from './owner';


export class InsuranceTerm {

  id: number;
  code: string;
  description: string;
  roofed: boolean = false;
 owner:Owner;
  //insuranceTypeTermsSet: InsuranceTypeTerms[] = [];

 
}
