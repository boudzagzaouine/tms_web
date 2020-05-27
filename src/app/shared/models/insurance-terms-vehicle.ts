import { Vehicle } from './vehicle';
import { InsuranceTerm } from './insurance-term';
import { BadgeType } from './badge-Type';
import { CommissionType } from './commissionType';
import { Driver } from './driver';
import { Insurance } from './insurance';

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
