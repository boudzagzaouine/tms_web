import { SupplierType } from './../../models/supplier-type';
import { ActionType } from './../../models/action-type';
import { Action } from './../../models/action';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class SupplierTypeService extends EmsService<SupplierType> {

    constructor(proxy: ProxyService) {
      super(proxy, 'suppliertypes');
    }
}
