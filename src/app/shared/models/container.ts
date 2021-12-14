import { ProductPack } from './product-pack';
import { Supplier } from './supplier';
import { Uom } from './uom';
//import { Product, Uom } from '.';

import { Product } from './product';
import { Owner } from './owner';
import { SaleOrderLine } from './sale-order-line';
import { ContainerType } from './container-type';

export class Container {
  
    id: number;
    code: string;
    containerType:ContainerType;
   
}
