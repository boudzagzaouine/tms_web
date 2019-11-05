import { ProductPack } from './product-pack';
import { SupplierInvoice } from './supplier-invoice';
import { Uom } from './uom';
import { Product } from './product';
export class SupplierInvoiceLine {
    id: number;
    number: number;
    creationDate: Date;
    updateDate: Date;
    totalPriceHT: number;
    totalPriceTTC: number;
    tarifPrice: number;
    discount: number;
    quantity: number;
    product: Product;
    uom: Uom;
    supplierInvoice: SupplierInvoice;
    vat: number;
    productPack: ProductPack;
}
