import { OrderType } from "./order-type";
import { Account } from "./account";
import { DeliveryLine } from "./delivery-line";
import { Owner } from "./owner";
import { OrderStatus } from "./order-status";
import { Warehouse } from "./warehouse";
import { SaleOrder } from "./sale-order";
import { Address } from ".";

export class Delivery {
    id: number;
    code: string;
    description: string;
    deliveryAddress: Address;
    invoiceAddress: Address;
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
}
