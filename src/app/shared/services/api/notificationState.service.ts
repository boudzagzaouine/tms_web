import { Action } from './../../models/action';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { NotificationState } from '../../models/notificationState';

@Injectable()
export class NotificationStateService extends EmsService<NotificationState> {

    constructor(proxy: ProxyService) {
      super(proxy, 'notificationStates');
    }
}
