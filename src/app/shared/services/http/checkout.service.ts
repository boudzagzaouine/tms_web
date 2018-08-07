import { Injectable } from '@angular/core';
import { SaleOrder } from '../../models';

@Injectable()
export class CheckoutService {

 private saleOrder: SaleOrder;

  constructor() { }

  setSaleOrder(saleOrder: SaleOrder) {
    this.saleOrder = saleOrder;
    saleOrder.lines.forEach(line => {
        saleOrder.totalPriceHT += line.totalPriceTTC;
        saleOrder.totalPriceHT += line.totalPriceHT;
      });
  }

  getSaleOrder() {
    return this.saleOrder;
  }
}
