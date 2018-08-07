import { PurchaseOrder } from './purchase-order';
import { Uom, Product, ReceptionLine } from '.';

export class PurshaseOrderLine {
    id: number;
    lineNumber: number;
    quantity: number;
    discount: number;
    vat: number;
    tariffPrice: number;
    priceHT: number;
    priceTTC: number;
    creationDate: Date;
    updateDate: Date;
    receptionLines: ReceptionLine[];
    purchaseOrder: PurchaseOrder;
    product: Product;
    uom: Uom;

    constructor() {}
}
