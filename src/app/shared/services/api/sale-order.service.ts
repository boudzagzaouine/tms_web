import { SaleOrder } from './../../models/sale-order';

import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class SaleOrderService extends EmsService<SaleOrder> {

    constructor(proxy: ProxyService) {
      super(proxy, 'saleOrders');
    }
}
