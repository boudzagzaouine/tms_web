import type { Vehicle } from './vehicle';
import type { InsuranceTerm } from './insurance-term';
import type { BadgeType } from './badge-Type';
import type { CommissionType } from './commissionType';
import type { Driver } from './driver';
import type { Insurance } from './insurance';

export class InsuranceTermsVehicle {

   id:number;
 //  vehicle:Vehicle;
  insuranceTerm:InsuranceTerm;
  amount:number;
  insurance: Insurance;


    constructor( insuranceTerm: InsuranceTerm =null,amount: number=0) {
        this.insuranceTerm=insuranceTerm;
        this.amount=amount;
  }

}
