import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class BadgeService extends EmsService<Badge> {

    constructor(proxy: ProxyService) {
      super(proxy, 'badges');
    }
}
