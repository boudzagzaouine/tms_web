import { Action } from './../../models/action';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class NotificationService extends EmsService<Notification> {

    constructor(proxy: ProxyService) {
      super(proxy, 'notifications');
    }

    
}
