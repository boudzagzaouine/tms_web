import { Vat } from './vat';
import { Owner } from './owner';
import { Uom } from './uom';
import { ProductType } from './product-type';
import { Image } from './image';

export class Product {
    id: number;
    code: string;
    desc: string;
    shortDesc: string;
    discount: number;
    salePriceUB: number;
    purchasePriceUB: number;
    vat: Vat;
    outOfStock: boolean;
    active: boolean;
    isKit: boolean;
    creationDate: Date;
    updateDate: Date;
    images: Image[];
    uomByProductUomSale: Uom;
    owner: Owner;
    productType: ProductType;
    stockQuantity: number;
    reservedQuantity: number;
    blockedQuantity: number;
    orderedQuantity: number;
    forBuying: boolean;
    technicalSheet: string;

    constructor() {}
}
