import { OrderStatus } from './order-status';
import {DeliveryLine} from './delivery-line';
import {SaleOrder} from './sale-order';
import {Product} from './product';
import {Uom} from './uom';
import { Vat } from './vat';
import { ProductPack } from './product-pack';

export class SaleOrderLine {
  id: number;
  lineNumber: number;
  quantity: number;
  discount: number;
  vat: Vat;
  tariffPrice: number;
  totalPriceHT: number;
  totalPriceTTC: number;
  creationDate: Date;
  updateDate: Date;
  deliveryLines: DeliveryLine[];
  saleOrder: SaleOrder;
  product: Product;
  uom: Uom;
  orderStatus: OrderStatus;
  productPack: ProductPack;
  comment: string;
  constructor() {}
}
