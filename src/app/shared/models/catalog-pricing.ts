import { Trajet } from './trajet';
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
