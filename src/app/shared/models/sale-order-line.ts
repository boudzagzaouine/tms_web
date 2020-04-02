import {OrderStatus} from './order-status';
import {DeliveryLine} from './delivery-line';
import {SaleOrder} from './sale-order';
import {Product} from './product';
import {Uom} from './uom';
import {Vat} from './vat';
import {ProductPack} from './product-pack';

export class SaleOrderLine {
    id: number;
    lineNumber: number;
    quantity: number;
    quantityPrepare:number;
    quantityReserved:number;
    quantityDeliver:number;
    discount = 0;
    vat: Vat;
    salePrice: number;
    totalPriceHT: number;
    totalPriceTTC: number;
    creationDate: Date;
    updateDate: Date;
    deliveryLines: DeliveryLine[];
    saleOrder: SaleOrder;
    product: Product;
    uom: Uom;
    weight : number;
    orderStatus: OrderStatus;
    productPack: ProductPack;
    comment: string;
    description: string;
    qtyRectified = false;

    constructor() {
    }
}
