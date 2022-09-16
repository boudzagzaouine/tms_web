import { ActionType } from './../../models/action-type';
import { Action } from './../../models/action';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { SupplierInvoice, SupplierInvoiceLine } from '../../models';

@Injectable()
export class SupplierInvoiceLineService extends EmsService<SupplierInvoiceLine> {

    constructor(proxy: ProxyService) {
      super(proxy, 'supplierInvoiceLines');
    }
}
