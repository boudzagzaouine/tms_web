import { AccountPricingService } from './../../models/account-pricing-service';
import { AccountPricing } from '../../models/account-pricing';
import { EmsService } from './ems.service';
import { Badge } from '../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class AccountPricingServiceService extends EmsService<AccountPricingService> {

    constructor(proxy: ProxyService) {
      super(proxy, 'accountPricingServices');
    }
}
