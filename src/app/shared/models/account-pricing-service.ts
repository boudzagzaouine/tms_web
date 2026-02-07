import type { Account } from './account';
import type { Address } from './address';
import type { Product } from './product';
import type { Company } from './company';
import type { Vat } from './vat';
import type { Ville } from './ville';
import type { Pays } from './pays';
import type { VehicleTray } from './vehicle-tray';
import type { LoadingType } from './loading-type';
import type { TurnType } from './turn-Type';
import type { VehicleCategory } from './vehicle-category';

import type { Owner } from './owner';


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
