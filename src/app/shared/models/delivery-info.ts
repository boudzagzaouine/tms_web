import { OrderDelivery } from './order-delivery';
import { AddressContactDeliveryInfo } from "./address-contact-delivery-info";
import { PackageDetail } from "./package-detail";
import { PackagingType } from "./packaging-type";

export class DeliveryInfo {
  id: number;

  packagingType: PackagingType;

  packageDetails: PackageDetail[] = [];
  contactDeliveryInfoSource: AddressContactDeliveryInfo;
  contactDeliveryInfoDistination: AddressContactDeliveryInfo;

  weightTotal: number = 0;
  capacityTotal: number = 0;
  priceTTC: number = 0;

  orderDelivery :OrderDelivery;
}
