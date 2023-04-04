import { VehicleAccompaniment } from './../../models/vehicle-accompaniment';
import { AccountPricing } from './../../models/account-pricing';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class VehicleAccompanimentService extends EmsService<VehicleAccompaniment> {

    constructor(proxy: ProxyService) {
      super(proxy, 'vehicleAccompaniments');
    }
}
