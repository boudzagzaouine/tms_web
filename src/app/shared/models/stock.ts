import { ProductPack } from './product-pack';
import { Supplier } from './supplier';
import { Uom } from './uom';
//import { Product, Uom } from '.';

import { Product } from './product';
import { Owner } from './owner';
import { SaleOrderLine } from './sale-order-line';
import { Container } from './container';

export class Stock {
  
    id: number;
    quantity: number;
    purchasePrice:number;
    dlc: Date;
    product: Product;
    uom: Uom;
    receptionDate:Date = new Date();
    supplier:Supplier;
    productPack : ProductPack;
    active : Boolean= true;
    owner:Owner;
    saleOrderLine:SaleOrderLine;
    container:Container;
}
