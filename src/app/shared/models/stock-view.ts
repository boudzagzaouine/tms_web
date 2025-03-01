import { ProductPack } from './product-pack';
import { Supplier } from './supplier';
import { Uom } from './uom';
//import { Product, Uom } from '.';

import { Product } from './product';
import { Owner } from './owner';

export class StockView {
  
    id: number;

 

    quantity: number;
    price: number;
    dlc: Date;
    product: Product;
    uom: Uom;
    receptionDate:Date = new Date();
    supplier:Supplier;
    productPack : ProductPack;
    active : Boolean= true;
    owner:Owner;
}
