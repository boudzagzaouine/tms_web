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
  paysSource:Pays;
  villeSource: Ville;
  paysDestination:Pays;
  villeDestination: Ville;

  purchaseAmountHt: number;
  purchaseAmountTtc: number;
  purchaseAmountTva: number;
  purchaseVat: Vat;


  saleAmountHt: number;
  saleAmountTtc: number;
  saleAmountTva: number;
  saleVat: Vat;

}
