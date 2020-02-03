import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { Insurance } from './../../models/insurance';

@Injectable()
export class InsuranceService extends EmsService<Insurance> {

  constructor(proxy: ProxyService) {
    super(proxy, 'insurances');
  }
}
