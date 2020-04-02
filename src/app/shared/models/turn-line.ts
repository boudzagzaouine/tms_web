import { Owner } from './owner';
import { Turn } from './turn';
import { SaleOrderLine } from './sale-order-line';
import { OrderStatus } from './order-status';
import { DeliveryLine } from './delivery-line';
import { SaleOrder } from './sale-order';
import { Product } from './product';
import { Uom } from './uom';
import { Vat } from './vat';
import { ProductPack } from './product-pack';

export class TurnLine {
  id: number;
  //owner:Owner;
  description: string;
  product: Product;
  quantityServed: number;
  salePrice: number;
  uom: Uom;
  totalPriceHT: number;
  totalPriceTTC: number;
  vat: Vat;
  productPack: ProductPack;
  saleOrderLine: SaleOrderLine;
  turn: Turn;
  saleOrder: SaleOrder;

  constructor(
    //owner:Owner=null,
    product: Product = null,
    quantityServed: number = 0,
    salePrice: number = 0,
    uom: Uom = null,
    totalPriceHT: number = 0,
    totalPriceTTC: number = 0,
    vat: Vat = null,
    productPack: ProductPack = null,
    saleOrderLine: SaleOrderLine = null,
    saleOrder: SaleOrder = null,
 turn: Turn = null,
  ) {
    this.product = product;
    this.quantityServed = quantityServed;
    this.salePrice = salePrice;
    this.totalPriceHT = totalPriceHT;
    this.totalPriceTTC = totalPriceTTC;
    this.uom = uom;
    this.vat = vat;
    this.productPack = productPack;
    this.saleOrderLine = saleOrderLine;
    this.turn = turn;
    this.saleOrder = saleOrder;

  }
}
