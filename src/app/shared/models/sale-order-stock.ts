import { ProductPack } from "./product-pack";
import { Stock } from "./stock";
import { Uom } from "./uom";
import { DeliveryLine } from "./delivery-line";
import { Delivery } from "./delivery";
import { Product } from "./product";
import { Warehouse } from "./warehouse";
import { Owner } from "./owner";
export class SaleOrderStock {
  id: number;
  lineNumber: number;
  owner: Owner;
  updateDate: Date;
  creationDate: Date;
  product: Product;
  dlc: Date;
  dluo: Date;
  serialNo: string;
  lot: string;
  delivery: Delivery;
  orderDate: Date;
  quantityServed: number;
  deliveryLine: DeliveryLine;
  uom: Uom;
  productPack: ProductPack;
  warehouse: Warehouse;
  
  constructor(
    delivery: Delivery = null,
    product: Product = null,
    owner: Owner = null,
    dlc: Date,
    productPack: ProductPack = null,
    uom: Uom,
    quantity: number = 0,
    delevryline: DeliveryLine = null,
    warehouse: Warehouse = null
  ) {
    this.delivery = delivery;
    this.product = product;
    this.owner = owner;
    this.dlc = dlc;
    this.productPack = productPack;
    this.uom = uom;
    this.quantityServed = quantity;
    this.deliveryLine = delevryline;
    this.warehouse = warehouse;
  }
}
