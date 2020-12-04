import { InsuranceTermsVehicle } from './insurance-terms-vehicle';
import { InsuranceType } from './insurance-Type';
//import { InsuranceTermLigne } from './insurance-term-line';
import { Supplier } from './supplier';
import { InsuranceTerm } from './insurance-term';
import { Vehicle } from './vehicle';
import { Patrimony } from './patrimony';
import { Owner } from './owner';


export class Insurance {

  id: number;
  code: string;
  startDate: Date = new Date();
  endDate: Date = new Date();
  //(new Date()).getFullYear() + 1, (new Date()).getMonth(), (new Date()).getDate()
  amount: number;
  vehicle: Vehicle;
  patrimony : Patrimony;
  insuranceTerm: InsuranceTerm;
  supplier: Supplier;
  description: string;
 // vehicleCode: string;
  insuranceType :InsuranceType;
  insuranceTermLignes: InsuranceTermsVehicle[] = [];
 owner:Owner;
  

}
