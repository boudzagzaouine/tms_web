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


export class OrderTransport {

  id: number;
  code: string;
  date:Date = new Date();
  turnType:TurnType; // aller-retour
  loadingType:LoadingType; // complet
  company :Company;
  turnStatus:TurnStatus;
  vehicleCategory :VehicleCategory ;
  vehicleTray:VehicleTray;
  orderTransportInfoAller:OrderTransportInfo;
  orderTransportInfoRetour:OrderTransportInfo;

  weightTotal: number = 0;
  capacityTotal: number = 0;
  priceHT: number = 0;
  marginRate:number=0;
  owner :Owner;
}
