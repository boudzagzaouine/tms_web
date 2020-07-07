import { ActionLine } from './../../models/action-line';
import { Action } from './../../models/action';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class ActionLineService extends EmsService<ActionLine> {

    constructor(proxy: ProxyService) {
      super(proxy, 'actionlines');
    }
}
