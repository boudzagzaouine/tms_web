import { BadgeTypeDriver } from './../../models/badge-Type-Driver';
import { CommissionDriver } from './../../models/commission-driver';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';


@Injectable()
export class CommissionDriverService  extends EmsService<CommissionDriver> {



  constructor(proxy: ProxyService) {
    super(proxy, 'commissions');
  }



}
