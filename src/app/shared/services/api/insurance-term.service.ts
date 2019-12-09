import { EmsService } from './ems.service';
import { InsuranceTerm } from '../../models/insurance-term';


import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { ProxyService } from './proxy.service';

import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class InsuranceTermService extends EmsService<InsuranceTerm> {

  constructor(proxy: ProxyService) {
    super(proxy, 'insuranceTerms');
  }

}
