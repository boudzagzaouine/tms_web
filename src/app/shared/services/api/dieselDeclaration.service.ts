import { Action } from './../../models/action';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { NotificationState } from '../../models/notificationState';
import { NotificationType } from '../../models/notificationType';
import { DieselDeclaration } from '../../models/diesel-declaration';
@Injectable()
export class DieselDeclarationService extends EmsService<DieselDeclaration> {

    constructor(proxy: ProxyService) {
      super(proxy, 'dieselDeclarations');
    }
}
