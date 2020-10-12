import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { ActionPlan } from '../../models/action-plan';

@Injectable()
export class ActionPlanService extends EmsService<ActionPlan> {

    constructor(proxy: ProxyService) {
      super(proxy, 'actionplans');
    }
}
