import { Company } from './company';
import { Vat } from './vat';
import { Ville } from './ville';
import { Pays } from './pays';
import { VehicleTray } from './vehicle-tray';
import { LoadingType } from './loading-type';
import { TurnType } from './turn-Type';
import { VehicleCategory } from './vehicle-category';
import { Transport } from './transport';
import { CatalogTransportType } from './CatalogTransportType';
import { Account } from './account';
import { ActionTypeRepair } from './action-type-repair';
import { Owner } from './owner';


export class AccountPricing {

  id: number;
  company :Company;
  vehicleCategory: VehicleCategory;
  turnType :TurnType;
  loadingType:LoadingType;
  vehicleTray:VehicleTray;
  paysSource:Pays;
  villeSource: Ville;
  paysDestination:Pays;
  villeDestination: Ville;


  saleAmountHt: number;
  saleAmountTtc: number;
  saleAmountTva: number;
  saleVat: Vat;
   owner :Owner;
}
