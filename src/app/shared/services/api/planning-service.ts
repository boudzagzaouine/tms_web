import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { Planning } from '../../models/planning';

@Injectable()
export class PlanningService extends EmsService<Planning> {

    constructor(proxy: ProxyService) {
      super(proxy, 'plannings');
    }
}
