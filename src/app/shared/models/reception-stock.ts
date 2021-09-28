import { Uom } from './uom';
import { ReceptionLine } from './reception-line';
import { Product } from './product';
import {Color} from './color';
import {Supplier} from './supplier';
import {ProductPack} from './product-pack';
import {Stock} from './stock';
//import {Owner, Warehouse, Product, Uom, ReceptionLine} from '.';

import {Reception} from './reception';
import { Owner } from './owner';
import { Warehouse } from './warehouse';

export class ReceptionStock {
    id: number;
    lineNumber: number;
    owner: Owner;
    updateDate: Date;
    creationDate: Date;
    warehouse: Warehouse;
    product: Product;
    dlc: Date;
    dluo: Date;
    serialNo: string;
    lot: string;
    weight: number;
    reception: Reception;
    orderDate: Date;
    quantityReceived: number;
    receptionLine: ReceptionLine;
    uom: Uom;
    uomReceived: Uom;
    stock: Stock;
    productPack: ProductPack;
    supplier: Supplier;
    color: Color ;
    receptionDate: Date;

}

