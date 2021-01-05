import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { BadgeType } from '../../models/badge-type';
import 'rxjs/add/operator/map';
import { SubscriptionCard } from '../../models/subscription-card';

@Injectable()
export class SubscriptionCardService extends EmsService<SubscriptionCard> {

  constructor(proxy: ProxyService) {
    super(proxy, 'subscriptionCards');
  }

}
