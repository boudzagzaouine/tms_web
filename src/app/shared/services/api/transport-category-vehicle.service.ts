import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { TransportCategoryVehicle } from '../../models/transport-category-vehicle';

@Injectable()
export class TransportCategoryVehicleService extends EmsService<TransportCategoryVehicle> {

    constructor(proxy: ProxyService) {
      super(proxy, 'transportcategoievehicles');
    }
}
