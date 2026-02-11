import type { ProductPack } from './product-pack';
import type { Supplier } from './supplier';
import type { Uom } from './uom';
//import { Product, Uom } from '.';

import type { Product } from './product';
import type { Owner } from './owner';
import type { SaleOrderLine } from './sale-order-line';

export class ContainerType {
  
    id:number ;
    code: String ;
    description: String ;
    width :number ;
    height :number ;
    length :number ;
    maxWeight: number ;
    weight :number ;
    active :Boolean ;
    defaultForReception: Boolean =false;
    defaultForPreparation: Boolean =false;
    palette :Boolean ;
    
   
}
