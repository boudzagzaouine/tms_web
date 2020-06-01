import { InsuranceTypeTerms } from '../../models/insurance-type-terms';
import { InsuranceType } from '../../models/insurance-Type';
import { EmsService } from './ems.service';
import { Badge } from '../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class InsuranceTypeTermsService extends EmsService<InsuranceTypeTerms> {

    constructor(proxy: ProxyService) {
      super(proxy, 'insurancetypeterms');
    }
}
