import { SupplierProduct } from './../../models/supplier-product';
import { ActionType } from './../../models/action-type';
import { Action } from './../../models/action';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class SupplierProductService extends EmsService<SupplierProduct> {

    constructor(proxy: ProxyService) {
      super(proxy, 'supplierProducts');
    }
}
