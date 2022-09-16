import { DocumentType } from './../../models/document-type';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { ActionPlan } from '../../models/action-plan';

@Injectable()
export class DocumentTypeService extends EmsService<DocumentType> {

    constructor(proxy: ProxyService) {
      super(proxy, 'documentTypes');
    }
}
