import { Day } from './../../models/day';
import { Month } from './../../models/month';
import { ActionType } from '../../models/action-type';
import { Action } from '../../models/action';
import { EmsService } from './ems.service';
import { Badge } from '../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class DayService extends EmsService<Day> {

    constructor(proxy: ProxyService) {
      super(proxy, 'days');
    }
}
