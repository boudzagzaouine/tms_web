import { SaleOrderLine } from './../../models/sale-order-line';
import { TurnLine } from './../../models/turn-line';
import { SaleOrder } from './../../models/sale-order';

import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class SaleOrderLineService extends EmsService<SaleOrderLine> {

    constructor(proxy: ProxyService) {
      super(proxy, 'SaleOrderlines');
    }
}
