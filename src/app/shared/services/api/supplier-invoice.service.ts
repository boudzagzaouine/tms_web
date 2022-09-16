import { Reception } from './../../models/reception';
import { ActionType } from './../../models/action-type';
import { Action } from './../../models/action';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { Supplier, SupplierInvoice } from '../../models';

@Injectable()
export class SupplierInvoiceService extends EmsService<SupplierInvoice> {

    constructor(proxy: ProxyService) {
      super(proxy, 'supplierInvoices');
    }


   
}
