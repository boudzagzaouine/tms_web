import { InsuranceType } from './../../models/insurance-Type';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class InsuranceTypeService extends EmsService<InsuranceType> {

    constructor(proxy: ProxyService) {
      super(proxy, 'insurancetypes');
    }
}
