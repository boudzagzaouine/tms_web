import { ConsumptionType } from './../../models/consumption-type';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class ConsumptionTypeService extends EmsService<ConsumptionType> {

    constructor(proxy: ProxyService) {
      super(proxy, 'consumptiontypes');
    }
}
