import { ProductPack } from './product-pack';
import { Stock } from './stock';
import { Delivery, Owner, Warehouse, Product, Uom } from '.';
import { DeliveryLine } from './delivery-line';

export class SaleOrderStock {
    id: number;
    lineNumber: number;
    owner: Owner;
    updateDate: Date;
    creationDate: Date;
    warehouse: Warehouse;
    product: Product;
    dlc: Date;
    dluo: Date;
    serialNo: string;
    lot: string;
    delivery: Delivery;
    orderDate: Date;
    quantityServed: number;
    deliveryLine: DeliveryLine;
    uom: Uom;
    stock: Stock;
    productPack: ProductPack;
}

