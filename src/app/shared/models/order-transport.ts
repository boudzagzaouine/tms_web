import type { User } from './user';
import type { OrderTransportAccompaniment } from './order-transport-accompaniment';
import type { VehicleAccompaniment } from './vehicle-accompaniment';
import type { SelectObject } from './select-object';
import type { TransportPlanServiceCatalog } from './transport-plan-service-catalog';
import type { MarchandiseType } from './marchandise-type';
import type { Trajet } from './trajet';
import type { Contact } from './contact';
import type { VehicleTray } from './vehicle-tray';
import type { Company } from './company';
import type { OrderTransportInfo } from './order-transport-info';
import type { VehicleCategory } from './vehicle-category';
import type { Vehicle } from './vehicle';
import type { TurnTransport } from './turn-transport';
import type { PackagingType } from './packaging-type';
import type { TurnStatus } from './turn-status';
import type { PackageDetail } from './package-detail';
import type { Account } from './account';
import type { TurnType } from './turn-Type';
import type { LoadingType } from './loading-type';
import type { ActionTypeRepair } from './action-type-repair';
import type { Owner } from './owner';
import type { Vat } from './vat';


export class OrderTransport {

  id: number;
  code: string;
  description: string;

  date:Date = new Date();
  turnType:TurnType; // aller-retour
  loadingType:LoadingType; // complet
  packagingType: PackagingType;
  consignment:Boolean;
  consignmentObject:SelectObject;//local

  port:string ; // payé true , du false
  numberKm: number;
  portObject:SelectObject; //local
  palletResponsibility:string ; //true prestataire /false client
  palletResponsibilityObject : SelectObject;//local
  marchandiseType:MarchandiseType;
  account :Account;
  accountUnique :Boolean; // for groupage
  contact:Contact;
  turnStatus:TurnStatus;
  vehicleCategory :VehicleCategory ;
  vehicleTray:VehicleTray;
  trajet:Trajet;
  orderTransportInfoAller:OrderTransportInfo; //local
  orderTransportInfoRetour:OrderTransportInfo; // local
  remark : string;
  weightTotal: number = 0;
  capacityTotal: number = 0;
  priceHT: number = 0;
  vat :Vat;
  priceTTC:number;
  priceVat:number;
  totalServiceHT:number;
  totalServiceTTC:number;
  totalServiceVat:number;
  totalPriceHT:number;
  totalPriceTTC:number;
  totalPriceVat:number;

  marginRate:number=0;
  marginValue : number=0;
  owner :Owner;
  orderTransportServiceCatalogs : TransportPlanServiceCatalog[]=[];
  orderTransportAccompaniments : OrderTransportAccompaniment[]=[];

  groupageUnique:Boolean=false;

   user :User;


  vehicleAccompaniments : VehicleAccompaniment[]=[];//local

  index :  boolean ; // variable local

  indexStep :  number ; // variable local
  orderTransportInfos:OrderTransportInfo[]=[];
}
