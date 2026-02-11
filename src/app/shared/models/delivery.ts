import type { AddressInfo } from './adress-info';
import type { Address } from './address';
import type { OrderType } from "./order-type";
import type { Account } from "./account";
import type { DeliveryLine } from "./delivery-line";
import type { Owner } from "./owner";
import type { OrderStatus } from "./order-status";
import type { Warehouse } from "./warehouse";
import type { SaleOrder } from "./sale-order";
//import { Address } from ".";

export class Delivery {
    id: number;
    code: string;
    description: string;
    //deliveryAddress: Address;
   // invoiceAddress: Address;
    creationDate: Date;
    updateDate: Date;
    saleOrder: SaleOrder;
    account: Account;
    owner: Owner;
    warehouse: Warehouse;
    orderStatus: OrderStatus;
    lines: DeliveryLine[];
    orderType: OrderType;
    totalPriceHT: number;
    totalPriceTTC: number;
    vat: number;
    totalPriceHTDefaultCurrency: number;
    totalPriceTTCDefaultCurrency: number;
    vatDefaultCurrency: number;
    comment: String;
    expectedDate: Date;
    loadDate: Date;
    deliveryAddress:AddressInfo;
}
