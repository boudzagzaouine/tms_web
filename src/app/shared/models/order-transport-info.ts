import { Trajet } from './trajet';
import { TurnStatus } from './turn-status';
import { Ville } from './ville';
import { OrderTransportInfoLine } from './order-transport-info-line';
import { AddressContactOrderTransportInfo } from './address-contact-order-transport-nfo';
import { PackageDetail } from "./package-detail";
import { PackagingType } from "./packaging-type";
import { OrderTransport } from './order-transport';

export class OrderTransportInfo {
  id: number;

  packagingType: PackagingType;

  packageDetails: PackageDetail[] = [];
  addressContactInitial: AddressContactOrderTransportInfo;
  addressContactFinal: AddressContactOrderTransportInfo;
  turnStatus:TurnStatus;
  orderTransportInfoLines: OrderTransportInfoLine[] = [];
  trajetUnique :Boolean =true;
  numberOfPallet:number;
  weightTotal: number ;
  capacityTotal: number ;
  priceTTC: number ;
  orderTransport :OrderTransport;
  type:number; //1 aller // 2 retour 
  weightEnlevement: number ;
  weightLivraison: number =0;

  trajet :Trajet ;
  // villeSource :Ville;
  // villeDistination :Ville;
  date: Date=new Date();
  numberKm : number ;
  time:number ;

  numberKmRetour : number ;
  timeRetour:number ;
}
