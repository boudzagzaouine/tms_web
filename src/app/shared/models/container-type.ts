import { ProductPack } from './product-pack';
import { Supplier } from './supplier';
import { Uom } from './uom';
//import { Product, Uom } from '.';

import { Product } from './product';
import { Owner } from './owner';
import { SaleOrderLine } from './sale-order-line';

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
