import { OrderStatus } from './../../models/order-status';
import { Machine } from './../../models/machine';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class OrderStatusService  extends EmsService<OrderStatus> {

  constructor(proxy: ProxyService) {
    super(proxy, 'orderStatuss');
  }

}
