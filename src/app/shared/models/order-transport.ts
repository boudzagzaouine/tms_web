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
  loadingType:string; // complet
  account :Account;
  turnStatus:TurnStatus;
  vehicleCategory :VehicleCategory ;
  orderTransportInfoAller:OrderTransportInfo;
  orderTransportInfoRetour:OrderTransportInfo;

  weightTotal: number = 0;
  capacityTotal: number = 0;
  priceTTC: number = 0;
  owner :Owner;
}
