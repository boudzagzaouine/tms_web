import { Trajet } from './trajet';
import { Company } from './company';
import { Pays } from './pays';
import { LoadingType } from './loading-type';
import { VehicleTray } from './vehicle-tray';
import { TurnType } from './turn-Type';
import { Ville } from './ville';
import { Zone } from './Zone';
import { Vat } from './vat';
import { VehicleCategory } from './vehicle-category';
import { Owner } from './owner';
import { Transport } from './transport';


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
