import { OrderDelivery } from './order-delivery';
import { ContainerType } from './container-type';
import { Company } from "./company";
import { Owner } from "./owner";

export class PackageDetail {
  id: number;

  containerType :ContainerType;
  numberOfPackages: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  orderDelivery : OrderDelivery;
  creationDate: Date;
  updateDate: Date;
  owner: Owner;
}
