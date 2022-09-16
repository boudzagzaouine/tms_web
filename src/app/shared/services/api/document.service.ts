import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { ActionPlan } from '../../models/action-plan';

@Injectable()
export class DocumentService extends EmsService<Document> {

    constructor(proxy: ProxyService) {
      super(proxy, 'documents');
    }
}
