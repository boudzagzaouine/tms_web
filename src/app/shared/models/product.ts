import {Vat} from './vat';
import {Owner} from './owner';
import {Uom} from './uom';
import {ProductType} from './product-type';
//import {Image} from './image';
import {ProductPack} from './product-pack';
import {BoundNodeCallbackObservable} from 'rxjs/observable/BoundNodeCallbackObservable';
import {Currency} from './currency';

export class Product {
    id: number;
    code: string;
    desc: string;
    shortDesc: string;
    discount: number;
    salePriceUB: number;
    purshasePriceUB: number;
    vat: Vat;
    purchaseVat: Vat;
    outOfStock: boolean;
    active: boolean;
    isKit: boolean;
    creationDate: Date;
    updateDate: Date;
   // images: Image[] = [];
    uomByProductUomBase: Uom;
    uomByProductUomSale: Uom;
    uomByProductUomPurshase: Uom;
    owner: Owner;
    productType: ProductType;
    stockQuantity: number;
    reservedQuantity: number;
    blockedQuantity: number;
    orderedQuantity: number;
    forBuying: boolean;
    technicalSheet: string;
    productPack: ProductPack;
    averageCost: number;
    marginOfPurchase: number;
    stocked: boolean;
    stockManaged: boolean;
    supplierDelay: number;
    professionalSalePrice: number;
    materialABCCode: string;
    salePriceTTCUB: number;
    purshasePriceTTCUB: number;
    currency: Currency;
    currencyPurshase: Currency;
    professionalTTCSalePrice: number;

    constructor() {
    }
}
