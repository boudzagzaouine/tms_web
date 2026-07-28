import { EmsService } from './ems.service';
import { InsuranceTerm } from '../../models/insurance-term';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class InsuranceTermService extends EmsService<InsuranceTerm> {

  constructor(proxy: ProxyService) {
    super(proxy, 'insuranceTerms');
  }

  

}
