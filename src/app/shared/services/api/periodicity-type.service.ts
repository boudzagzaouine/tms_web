import { PeriodicityType } from './../../models/periodicity-type';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class PeriodicityTypeService extends EmsService<PeriodicityType> {

    constructor(proxy: ProxyService) {
      super(proxy, 'periodicitiesType');
    }
}
