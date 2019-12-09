import { EmsService } from './ems.service';

import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/map';
import { Insurance } from './../../models/insurance';

@Injectable()
export class InsuranceService extends EmsService<Insurance> {

  insuranceListChanged = new Subject<Insurance[]>();
  constructor(proxy: ProxyService) {
    super(proxy, 'insurances');
  }
}
