import { User } from './user';
import { OrderTransportAccompaniment } from './order-transport-accompaniment';
import { VehicleAccompaniment } from './vehicle-accompaniment';
import { SelectObject } from './select-object';
import { TransportPlanServiceCatalog } from './transport-plan-service-catalog';
import { MarchandiseType } from './marchandise-type';
import { Trajet } from './trajet';
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
  packagingType: PackagingType;
  consignment:Boolean;
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
}
