import { Supplier } from './supplier';
//import { IOption } from 'ng-select';
import { Currency } from './currency';
//import { CashRegister } from './cash-register';
import { OrderStatus } from './order-status';
//import { SupplierAsset } from './supplier-asset';
import {PurchaseOrderLine } from './purchase-order-line';
//import { Owner, User, Warehouse, Supplier, DeliveryMethod, SupplierInvoice } from '.';
import { OrderType } from './order-type';
import { Owner } from './owner';
//implements IOption
export class PurchaseOrder {

    id: number;
    code: string;
    discount: number;
    vat: number;
    tariffPrice: number;
    totalPriceHT: number;
    totalPriceTTC: number;
    creationDate: Date;
    updateDate: Date;
    account: Account;
    owner: Owner;
    //user: User;
   // warehouse: Warehouse;
    notes: string;
    supplier: Supplier;
    //supplierInvoice: SupplierInvoice;
  //  supplierAssets: SupplierAsset[] = [];
    //deliveryMethod: DeliveryMethod;
    purshaseOrderLines: PurchaseOrderLine[] = [];
    orderType: OrderType;
    orderStatus: OrderStatus;
  //  box: CashRegister;
    currency: Currency;
    payedAmount: number;
    remarks: string;
    //value: string = this.code;
   // label: string = this.code;
    disabled?: boolean;
    expectedDate: Date;
    receptionDate: Date;
    accounted: boolean;

    constructor() {}
}
