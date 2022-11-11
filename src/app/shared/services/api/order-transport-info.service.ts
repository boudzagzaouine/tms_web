import { OrderTransportInfo } from './../../models/order-transport-info';
import { ActionTypeRepair } from './../../models/action-type-repair';
import { ActionType } from './../../models/action-type';
import { Action } from './../../models/action';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class OrderTransportInfoService extends EmsService<OrderTransportInfo> {

    constructor(proxy: ProxyService) {
      super(proxy, 'orderTransportInfos');
    }
}
