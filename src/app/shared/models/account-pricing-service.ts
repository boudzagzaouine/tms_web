import { Account } from './account';
import { Address } from './address';
import { Product } from './product';
import { Company } from './company';
import { Vat } from './vat';
import { Ville } from './ville';
import { Pays } from './pays';
import { VehicleTray } from './vehicle-tray';
import { LoadingType } from './loading-type';
import { TurnType } from './turn-Type';
import { VehicleCategory } from './vehicle-category';

import { Owner } from './owner';


export class AccountPricingService {

  id: number;
  company :Company;
  product:Product;
  account:Account;
  saleAmountHt: number;
  saleAmountTtc: number;
  saleAmountTva: number;
  saleVat: Vat;
   owner :Owner;
}
