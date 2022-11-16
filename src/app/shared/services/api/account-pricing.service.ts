import { AccountPricing } from './../../models/account-pricing';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class AccountPricingService extends EmsService<AccountPricing> {

    constructor(proxy: ProxyService) {
      super(proxy, 'accountPricings');
    }
}
