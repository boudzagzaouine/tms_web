import { Account } from './account';
import { Trajet } from './trajet';
import { Company } from './company';
import { Vat } from './vat';
import { Ville } from './ville';
import { Pays } from './pays';
import { VehicleTray } from './vehicle-tray';
import { LoadingType } from './loading-type';
import { TurnType } from './turn-Type';
import { VehicleCategory } from './vehicle-category';

import { Owner } from './owner';


export class AccountPricing {

  id: number;
  company :Company;
  account:Account;
  vehicleCategory: VehicleCategory;
  turnType :TurnType;
  loadingType:LoadingType;
  vehicleTray:VehicleTray;
 trajet:Trajet;


  saleAmountHt: number=0;
  saleAmountTtc: number=0;
  saleAmountTva: number=0;
  saleVat: Vat;
   owner :Owner;
}
