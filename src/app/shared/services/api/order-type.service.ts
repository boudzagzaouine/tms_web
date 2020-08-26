import { OrderType } from './../../models/order-type';
import { Maintenance } from './../../models/maintenance';
import { EmsService } from './ems.service';
import { MaintenancePlan } from '../../models/maintenance-plan';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';


@Injectable()
export class OrderTypeService extends EmsService<OrderType> {

  constructor(proxy: ProxyService) {
    super(proxy, 'orderTypes');
  }
}
