import {BlockType} from './block-type';
import {ProductPack} from './product-pack';
import {Vat} from './vat';
import {Color} from './color';
import {Uom} from './uom';
import {PurchaseOrderLine} from './purchase-order-line';
import {Reception} from './reception';
import {Product} from './product';
import {Warehouse} from './warehouse';
import {Owner} from './owner';
import {OrderStatus} from './order-status';

export class ReceptionLine {
    id: number;
    owner: Owner;
    lineNumber: number;
    updateDate: Date;
    creationDate: Date;
    description: string;
    receptionDate: Date;
    warehouse: Warehouse;
    product: Product;
    color: Color;
    dlc: Date;
    dluo: Date;
    serialNo: string;
    lot: string;
    reception: Reception;
    purshaseOrderLine: PurchaseOrderLine;
    orderStatus: OrderStatus;
    quantityReceived = 0;
    quantity: number;
    blockedQuantity: number;
    uom: Uom;
    uomReceived: Uom;
    quality: string;
    weight: number;
    comment: string;
    totalPriceHT: number;
    totalPriceTTC: number;
    vat: Vat;
    discount: number;
    purshasePrice: number;
    productPack: ProductPack;
    blockType: BlockType;
}
