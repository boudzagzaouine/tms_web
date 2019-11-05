import { ProductSupplier } from './product-supplier';
import { Owner } from './owner';
import { Product } from './product';
import { Currency } from './currency';
import { Uom } from './uom';

export class ProductPack {
    id: number;
    size: number;
    owner: Owner;
    updateDate: Date;
    creationDate: Date;
    product: Product;
    uom: Uom;
    weight: number;
    height: number;
    weightControl: number;
    length: number;
    depth: number;
    typePck: number;
    quantity: number;
    salePrice: number;
    purchasePrice: number;
    width: number;
    currency: Currency;
    productSupplier: ProductSupplier[];
}
