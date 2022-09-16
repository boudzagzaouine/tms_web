import { SubscriptionCardType } from './../../models/subscription-card-type';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import 'rxjs/add/operator/map';
import { SubscriptionCard } from '../../models/subscription-card';

@Injectable()
export class SubscriptionCardTypeService extends EmsService<SubscriptionCardType> {

  constructor(proxy: ProxyService) {
    super(proxy, 'subscriptionCardTypes');
  }

}
