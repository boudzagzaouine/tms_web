import { Product } from './product';
import { Owner } from './owner';
import { Vat } from '.';

export class ProductType {
    id: number;
    code: string;
    description: string;
    image: string;
    creationDate: Date;
    updateDate: Date;
    products: Product[];
    owner: Owner;
    productType: ProductType;
    productsForProductSubType: ProductType[];
    vat: Vat;
    constructor() {}
}
