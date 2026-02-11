import type { ProductPack } from './product-pack';
import type { Supplier } from './supplier';
import type { Uom } from './uom';
//import { Product, Uom } from '.';

import type { Product } from './product';
import type { Owner } from './owner';
import type { SaleOrderLine } from './sale-order-line';
import type { ContainerType } from './container-type';

export class Container {
  
    id: number;
    code: string;
    containerType:ContainerType;
   
}
