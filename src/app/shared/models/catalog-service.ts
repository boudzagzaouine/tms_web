import { Product } from './product';
import { LoadingType } from './loading-type';
import { Pays } from './pays';
import { TurnType } from './turn-Type';
import { Ville } from './ville';
import { Zone } from './Zone';
import { Vat } from './vat';
import { VehicleCategory } from './vehicle-category';
import { Owner } from './owner';
import { Transport } from './transport';
import { VehicleTray } from './vehicle-tray';


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
