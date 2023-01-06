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


export class CatalogTransportPricing {

  id: number;

    transport:Transport ;
    turnType:TurnType;
    paysSource:Pays;
    villeSource:Ville ;
    paysDestination:Pays;
    villeDestination:Ville;
    vehicleCategory:VehicleCategory;
    vehicleTray:VehicleTray;
    loadingType:LoadingType;
    purchaseAmountHt:number;
    purchaseAmountTtc:number;
    purchaseAmountTva:number;
    purchaseVat:Vat;


  tarifLastPriceIntern :number=0; //variable local
  tarifLastPriceExterne :number=0; //variable local
  tarifClient :number=0; //variable local
  tarifAchat:number =0;//variable local
}
