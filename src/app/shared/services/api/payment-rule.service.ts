import { PaymentRule } from './../../models/payment-rule';
import { EmsService } from './ems.service';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';
import { Account } from '../../models';

@Injectable()
export class PaymentRuleService  extends EmsService<PaymentRule> {

  constructor(proxy: ProxyService) {
    super(proxy, 'paymentRules');
  }

}
