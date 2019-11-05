import {Delivery} from './delivery';
import {Uom} from './uom';
import {Owner} from './owner';
import {OrderStatus} from './order-status';
import {Product} from './product';
import {SaleOrderLine} from './sale-order-line';
import {Warehouse} from './warehouse';
import { ProductPack } from './product-pack';
import { Vat } from './vat';

export class DeliveryLine {

  id: number;
  lineNumber: number;
  description: string;
  orderedQuantity: number;
  quantityServed: number;
  dlc: Date;
  creationDate: Date;
  updateDate: Date;
  product: Product;
  warehouse: Warehouse;
  orderStatus: OrderStatus;
  owner: Owner;
  uom: Uom;
  saleOrderLine: SaleOrderLine;
  delivery: Delivery;
  totalPriceHT: number;
  totalPriceTTC: number;
    productPack: ProductPack;
    vat: Vat;

}
