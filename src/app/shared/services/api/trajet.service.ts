import { Trajet } from './../../models/trajet';
import { AccountPricing } from './../../models/account-pricing';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class TrajetService extends EmsService<Trajet> {

    constructor(proxy: ProxyService) {
      super(proxy, 'trajets');
    }
}
