import { ProductPack } from './product-pack';
import { PurchaseOrder } from './purchase-order';
import { Uom } from './uom';
import { Product } from './product';
import { ReceptionLine } from './reception-line';
import { Warehouse } from './warehouse';
import { Vat } from './vat';
import { Owner } from './owner';
import { OrderStatus } from './order-status';

export class PurchaseOrderLine {
    id: number;
    description: string;
    number: number;
    quantity: number;
    discount: number;
    vat: Vat;
    totalPriceHT: number;
    totalPriceTTC: number;
    creationDate: Date;
    updateDate: Date;
    receptionLines: ReceptionLine[];
    purshaseOrder: PurchaseOrder;
    product: Product;
    uom: Uom;
    owner: Owner;
    warehouse: Warehouse;
    productPack: ProductPack;
    purshasePrice: number;
    orderStatus:OrderStatus;
    quantityReceived:number;

    constructor() {}
}
