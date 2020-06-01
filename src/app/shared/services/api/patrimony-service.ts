import { SaleOrderLine } from '../../models/sale-order-line';
import { TurnLine } from '../../models/turn-line';
import { SaleOrder } from '../../models/sale-order';

import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { Patrimony } from '../../models/patrimony';

@Injectable()
export class PatrimonyService extends EmsService<Patrimony> {

    constructor(proxy: ProxyService) {
      super(proxy, 'patrimonies');
    }
}
