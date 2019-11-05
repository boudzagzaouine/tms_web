import { Product, Uom } from '.';

export class Stock {
    id: number;
    quantity: number;
    dlc: Date;
    product: Product;
    uom: Uom;
}
