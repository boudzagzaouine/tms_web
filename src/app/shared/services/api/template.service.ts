import { Action } from './../../models/action';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { NotificationState } from '../../models/notificationState';
import { NotificationType } from '../../models/notificationType';
import { Template } from '../../models/template';

@Injectable()
export class TemplateService extends EmsService<Template> {

    constructor(proxy: ProxyService) {
      super(proxy, 'mailTemplates');
    }
}
