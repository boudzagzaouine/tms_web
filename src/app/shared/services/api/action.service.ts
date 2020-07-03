import { Action } from './../../models/action';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class ActionService extends EmsService<Action> {

    constructor(proxy: ProxyService) {
      super(proxy, 'maintenanceActions');
    }
}
