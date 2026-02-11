import type { Product } from './product';
import type { LoadingType } from './loading-type';
import type { Pays } from './pays';
import type { TurnType } from './turn-Type';
import type { Ville } from './ville';
import type { Zone } from './Zone';
import type { Vat } from './vat';
import type { VehicleCategory } from './vehicle-category';
import type { Owner } from './owner';
import type { Transport } from './transport';
import type { VehicleTray } from './vehicle-tray';


export class CatalogService {

  id: number;
 product:Product;

  purchaseAmountHt: number;
  purchaseAmountTtc: number;
  purchaseAmountTva: number;
  purchaseVat: Vat;


  saleAmountHt: number;
  saleAmountTtc: number;
  saleAmountTva: number;
  saleVat: Vat;

}
