import { BadgeTypeDriver } from './../../models/badge-Type-Driver';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import 'rxjs/add/operator/map';

@Injectable()
export class BadgeTypeDriverService extends EmsService<BadgeTypeDriver> {

  constructor(proxy: ProxyService) {
    super(proxy, 'badgetypedriver');
  }

}
