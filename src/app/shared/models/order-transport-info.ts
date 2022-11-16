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

  orderTransportInfoLines: OrderTransportInfoLine[] = [];
  trajetUnique :Boolean =false;

  weightTotal: number = 0;
  capacityTotal: number = 0;
  priceTTC: number = 0;
 type :string ;
  orderTransport :OrderTransport;
}
