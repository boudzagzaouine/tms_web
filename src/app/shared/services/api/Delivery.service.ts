import { Delivery } from './../../models/delivery';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class DeliveryService extends EmsService<Delivery> {

    constructor(proxy: ProxyService) {
      super(proxy, 'deliveries');
    }
}
