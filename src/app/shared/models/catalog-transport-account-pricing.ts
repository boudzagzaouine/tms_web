import type { Trajet } from './trajet';
import type { Company } from './company';
import type { Pays } from './pays';
import type { LoadingType } from './loading-type';
import type { VehicleTray } from './vehicle-tray';
import type { TurnType } from './turn-Type';
import type { Ville } from './ville';
import type { Zone } from './Zone';
import type { Vat } from './vat';
import type { VehicleCategory } from './vehicle-category';
import type { Owner } from './owner';
import type { Transport } from './transport';


export class CatalogTransportAccountPricing {

  id: number;
   company:Company;
    transport:Transport ;
    turnType:TurnType;
    trajet:Trajet;

    vehicleCategory:VehicleCategory;
    vehicleTray:VehicleTray;
    loadingType:LoadingType;
    purchaseAmountHt:number=0;
    purchaseAmountTtc:number=0;
    purchaseAmountTva:number=0;
    purchaseVat:Vat;


  tarifLastPriceIntern :number=0; //variable local
  tarifLastPriceExterne :number=0; //variable local
  tarifClient :number=0; //variable local
  tarifAchat:number =0;//variable local
}
