import { OrderTransportRejectType } from './../../models/order-transport-reject-type';
import { BrandVehicleType } from './../../models/brand-vehicle-type';
import { EmsService } from './ems.service';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';
import { Account } from '../../models';

@Injectable()
export class OrderTransportRejectTypeService  extends EmsService<OrderTransportRejectType> {

  constructor(proxy: ProxyService) {
    super(proxy, 'orderTransportRejectTypes');
  }

}
