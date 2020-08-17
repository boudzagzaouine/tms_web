import { Uom } from './../../models/uom';
import { Vat } from './../../models/vat';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { TransportCategoryVehicle } from '../../models/transport-category-vehicle';

@Injectable()
export class UomService extends EmsService<Uom> {

    constructor(proxy: ProxyService) {
      super(proxy, 'uoms');
    }
}
