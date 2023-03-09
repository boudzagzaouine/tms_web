import { TransportService } from './../../models/transport-service';
import { TransportServcie } from './transport.service';
import { AccountPricing } from './../../models/account-pricing';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class TransportServiceService extends EmsService<TransportService> {

    constructor(proxy: ProxyService) {
      super(proxy, 'transportServices');
    }
}
