import { AccountPricing } from './../../models/account-pricing';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { AccountService } from '../../models/account-service';

@Injectable()
export class AccountServiceService extends EmsService<AccountService> {

    constructor(proxy: ProxyService) {
      super(proxy, 'accountServices');
    }
}
