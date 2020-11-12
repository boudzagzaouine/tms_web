import { Action } from './../../models/action';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { NotificationState } from '../../models/notificationState';
import { NotificationType } from '../../models/notificationType';

@Injectable()
export class NotificationTypeService extends EmsService<NotificationType> {

    constructor(proxy: ProxyService) {
      super(proxy, 'notificationTypes');
    }
}
