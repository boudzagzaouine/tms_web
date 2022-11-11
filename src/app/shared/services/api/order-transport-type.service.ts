import { OrderTransportType } from './../../models/order-transport-type';
import { OrderTransportInfoLine } from './../../models/order-transport-info-line';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { ActionPlan } from '../../models/action-plan';

@Injectable()
export class OrderTransportTypeService extends EmsService<OrderTransportType> {

    constructor(proxy: ProxyService) {
      super(proxy, 'orderTransportTypes');
    }
}
