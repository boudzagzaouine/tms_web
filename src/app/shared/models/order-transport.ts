import { Contact } from './contact';
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


export class OrderTransport {

  id: number;
  code: string;
  date:Date = new Date();
  turnType:TurnType; // aller-retour
  loadingType:LoadingType; // complet
  account :Account;
  contact:Contact;
  turnStatus:TurnStatus;
  vehicleCategory :VehicleCategory ;
  vehicleTray:VehicleTray;
  orderTransportInfoAller:OrderTransportInfo;
  //orderTransportInfoRetour:OrderTransportInfo;

  weightTotal: number = 0;
  capacityTotal: number = 0;
  priceHT: number = 0;
  vat :Vat;
  priceTTC:number;
  priceVat:number;

  marginRate:number=0;
  marginValue : number=0;
  owner :Owner;
}
