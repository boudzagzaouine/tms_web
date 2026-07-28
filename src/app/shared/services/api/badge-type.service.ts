import { BadgeType } from './../../models/badge-Type';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class BadgeTypeService extends EmsService<BadgeType> {

  constructor(proxy: ProxyService) {
    super(proxy, 'badgeTypes');
  }

}
