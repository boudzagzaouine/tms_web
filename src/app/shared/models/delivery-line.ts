import type {Delivery} from './delivery';
import type {Uom} from './uom';
import type {Owner} from './owner';
import type {OrderStatus} from './order-status';
import type {Product} from './product';
import type {SaleOrderLine} from './sale-order-line';
import type {Warehouse} from './warehouse';
import type { ProductPack } from './product-pack';
import type { Vat } from './vat';

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
  sumQnt:number ;

}
