import { OrderTransportDocumentType } from './../../models/order-transport-document-type';
import { OrderTransportInfo } from './../../models/order-transport-info';
import { ActionTypeRepair } from './../../models/action-type-repair';
import { ActionType } from './../../models/action-type';
import { Action } from './../../models/action';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class OrderTransportDocumentTypeService extends EmsService<OrderTransportDocumentType> {

    constructor(proxy: ProxyService) {
      super(proxy, 'orderTransportDocumentTypes');
    }
}
