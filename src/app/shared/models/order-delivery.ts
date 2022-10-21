import { DeliveryInfo } from './delivery-info';
import { TurnTransport } from './turn-transport';
import { PackagingType } from './packaging-type';
import { Turnstatus } from './turn-status';
import { AddressContactDeliveryInfo } from './address-contact-delivery-info';
import { PackageDetail } from './package-detail';
import { Account } from './account';
import { TurnType } from './turn-Type';
import { LoadingType } from './loading-type';
import { ActionTypeRepair } from './action-type-repair';
import { Owner } from './owner';
import { OrderDeliveryTransport } from './order-delivery-transport';


export class OrderDelivery {

  id: number;
  code: string;
  description: string;
  date:Date = new Date();
  turnType:TurnType;
  loadingType:string;
  account :Account;
turnStatus:Turnstatus;

deliveryInfoAller:DeliveryInfo;
deliveryInfoRetour:DeliveryInfo;


 orderDeliveryTransport :OrderDeliveryTransport[]=[];

   owner :Owner;
}
