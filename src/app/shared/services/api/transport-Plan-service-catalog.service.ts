import { TransportPlanServiceCatalog } from './../../models/transport-plan-service-catalog';
import { SupplierProduct } from '../../models/supplier-product';
import { ActionType } from '../../models/action-type';
import { Action } from '../../models/action';
import { EmsService } from './ems.service';
import { Badge } from '../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class TransportPlanServiceCatalogService extends EmsService<TransportPlanServiceCatalog> {

    constructor(proxy: ProxyService) {
      super(proxy, 'transportPlanServices');
    }
}
