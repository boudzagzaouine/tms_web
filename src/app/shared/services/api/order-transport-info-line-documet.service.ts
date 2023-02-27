import { EmsService } from './ems.service';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';
import { Account } from '../../models';
import { OrderTransportInfoLineDocument } from '../../models/order-transport-info-line-document';

@Injectable()
export class OrderTransportInfoLineDocumentService  extends EmsService<OrderTransportInfoLineDocument> {

  constructor(proxy: ProxyService) {
    super(proxy, 'orderTransportInfoLineDocuments');
  }

}
