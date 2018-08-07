import { Address } from './address';
import { Account } from './account';
import { Owner } from './owner';
import { SaleOrderLine } from './sale-order-line';
import { Warehouse } from './warehouse';
import { Currency } from './currency';
import { OrderStatus } from './order-status';
import { OrderType } from './order-type';

export class SaleOrder {
    id = 0;
    code: string;
    discount = 0.0;
    vat = 0.0;
    totalPriceHT = 0.0;
    totalPriceTTC = 0.0;
    creationDate: Date;
    updateDate: Date;
    account: Account;
    owner: Owner;
    currency: Currency;
    warehouse: Warehouse;
    lines: SaleOrderLine[] = [];
    notes: string;
    orderStatus: OrderStatus;
    orderType: OrderType;
    accounted: boolean;
    deliveryAddress: Address;

    constructor() {}
}
