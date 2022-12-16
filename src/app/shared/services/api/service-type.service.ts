import { ServiceType } from './../../models/service-type';
import { ActionType } from './../../models/action-type';
import { Action } from './../../models/action';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class ServiceTypeService extends EmsService<ServiceType> {

    constructor(proxy: ProxyService) {
      super(proxy, 'serviceTypes');
    }
}
