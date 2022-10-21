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
import { TurnLine } from './turn-line';

export class TurnSoPo {
  id: number;
  //owner:Owner;
  code: string;
  turn: Turn;
  saleOrder: SaleOrder;
  purshaseOrder:PurchaseOrder;
  turnLines: TurnLine[] = [];
  orderStatus: OrderStatus;
  totalPriceHT: number=0;
  totalPriceTTC: number =0;
  totalPriceTurn : number=0;
  totalQuantity:number=0;


  constructor(
    code?: string,
    orderStatus?: OrderStatus,

    saleOrder?: SaleOrder ,
   purshaseOrder?:PurchaseOrder,

  ) {
  this.code=code;

    this.orderStatus=orderStatus;

    this.saleOrder = saleOrder;
    this.purshaseOrder = purshaseOrder;
// this.turn = turn;
// this.turnlines = turnlines;

  }
}
