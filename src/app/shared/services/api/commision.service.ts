import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { Commission } from '../../models/commission';

@Injectable()
export class CommissionService  extends EmsService<Commission> {

  constructor(proxy: ProxyService) {
    super(proxy, 'commissions');
  }

}
