import { EmsGCService } from './ems-gc.service';
import { ProxyGCService } from './proxy-gc.service';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { Driver } from '../../models/driver';
import { SaleOrderStock } from '../../models/sale-order-stock';

@Injectable()
export class SaleOrderStockService  extends EmsGCService<SaleOrderStock> {

  constructor(proxy: ProxyGCService) {
    super(proxy, 'saleOrderStocks');
  }

}
