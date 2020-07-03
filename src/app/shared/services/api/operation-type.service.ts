import { OperationType } from './../../models/operation-type';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class OperationTypeService extends EmsService<OperationType> {

    constructor(proxy: ProxyService) {
      super(proxy, 'operationsType');
    }
}
