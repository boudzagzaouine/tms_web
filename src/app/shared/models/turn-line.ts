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
import { PurchaseOrder } from './purchase-order';
import { PurchaseOrderLine } from '.';
import { TurnSoPo } from './turn-so-po';
import { Container } from './container';
import { Stock } from './stock';

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
  purshaseOrderLine:PurchaseOrderLine;
  turnSoPo: TurnSoPo;
  orderStatus: OrderStatus;
  stocks:Stock[];

  constructor(
    //owner:Owner=null,
    product: Product ,
    quantityServed: number = 0,
    salePrice: number = 0,
    uom: Uom ,
   // totalPriceHT: number = 0,
    totalPriceTTC: number = 0,
    vat: Vat ,
    productPack: ProductPack ,
    orderStatus: OrderStatus,
    saleOrderLine: SaleOrderLine ,
    purshaseOrderLine:PurchaseOrderLine=null,
    stocks:Stock[],
  //turnSoPo: TurnSoPo ,
  ) {
    this.product = product;
    this.quantityServed = quantityServed;
    this.salePrice = salePrice;
    //this.totalPriceHT = totalPriceHT;
    this.totalPriceTTC = totalPriceTTC;
    this.uom = uom;
    this.vat = vat;
    this.productPack = productPack;
    this.orderStatus = orderStatus;

    this.saleOrderLine = saleOrderLine;
   this.purshaseOrderLine = purshaseOrderLine;
   this.stocks=stocks;
  //  this.turnSoPo = turnSoPo;
  }
}
