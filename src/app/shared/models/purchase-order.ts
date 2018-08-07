import { SupplierAsset } from './supplier-asset';
import {PurshaseOrderLine } from './purchase-order-line';
import { Owner, User, Warehouse, Supplier, DeliveryMethod, SupplierInvoice } from '.';

export class PurchaseOrder {
    id: number;
    code: string;
    discount: number;
    vat: number;
    tariffPrice: number;
    priceHT: number;
    priceTTC: number;
    creationDate: Date;
    updateDate: Date;
    account: Account;
    owner: Owner;
    user: User;
    warehouse: Warehouse;
    notes: string;
    supplier: Supplier;
    supplierInvoice: SupplierInvoice;
    supplierAssets: SupplierAsset[] = [];
    deliveryMethod: DeliveryMethod;
    purchaseOrderLines: PurshaseOrderLine[] = [];

    constructor() {}
}
