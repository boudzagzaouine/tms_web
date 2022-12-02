import { PaymentType } from './../../models/payment-method';
import {  TurnStatus } from './../../models/turn-status';
import { EmsService } from './ems.service';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';
import { Account } from '../../models';

@Injectable()
export class PaymentTypeService  extends EmsService<PaymentType> {

  constructor(proxy: ProxyService) {
    super(proxy, 'paymentTypes');
  }

}
