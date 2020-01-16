import { InsuranceTermLigne } from './../../models/insurance-term-line';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { Insurance } from './../../models/insurance';

@Injectable()
export class InsuranceTermLineService extends EmsService<InsuranceTermLigne> {

  constructor(proxy: ProxyService) {
    super(proxy, 'insurancetermlignes');
  }
}
