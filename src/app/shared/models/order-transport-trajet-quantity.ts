import { VehicleTray } from './vehicle-tray';
import { Company } from './company';
import { OrderTransportInfo } from './order-transport-info';
import { VehicleCategory } from './vehicle-category';
import { Vehicle } from './vehicle';
import { TurnTransport } from './turn-transport';
import { PackagingType } from './packaging-type';
import { TurnStatus } from './turn-status';
import { PackageDetail } from './package-detail';
import { Account } from './account';
import { TurnType } from './turn-Type';
import { LoadingType } from './loading-type';
import { ActionTypeRepair } from './action-type-repair';
import { Owner } from './owner';
import { Vat } from './vat';


export class OrderTransportTrajetQuantity {



  numberOfPalletEnlevement:number=0;
  weightEnlevement :number=0;
  capacityEnlevement : number=0;


  numberOfPalletLivraison:number=0;
  weightLivraison :number=0;
  capacityLivraison : number=0;






  firstTrajet:Boolean=true;

}
