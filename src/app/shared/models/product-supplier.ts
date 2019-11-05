import { Supplier } from './supplier';
import { ProductPack } from './product-pack';
import { Product } from './product';
export class ProductSupplier {
    id: number;
    productPack: ProductPack;
    supplier: Supplier;
    price: number;
    lastPrice: number;
    product: Product;
}
