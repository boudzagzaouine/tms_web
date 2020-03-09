import { DeliveryLine } from './../../models/delivery-line';
import { Delivery } from './../../models/delivery';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class DeliveryLineService extends EmsService<DeliveryLine> {

    constructor(proxy: ProxyService) {
      super(proxy, 'deliverylines');
    }
}
