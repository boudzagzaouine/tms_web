import { Transport } from './transport';
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


export class TransportService {

  id: number;
  transport :Transport;
  product:Product;

  purchaseAmountHt: number;
  purchaseAmountTtc: number;
  purchaseAmountTva: number;
  purchaseVat: Vat;
   owner :Owner;
}
