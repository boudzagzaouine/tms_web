import type { Trajet } from './trajet';
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


export class CatalogPricing {

  id: number;
  vehicleCategory: VehicleCategory;
  turnType :TurnType;
  loadingType:LoadingType;
  vehicleTray:VehicleTray;
  trajet:Trajet;

  purchaseAmountHt: number=0;
  purchaseAmountTtc: number=0;
  purchaseAmountTva: number=0;
  purchaseVat: Vat;


  saleAmountHt: number=0;
  saleAmountTtc: number=0;
  saleAmountTva: number=0;
  saleVat: Vat;

}
