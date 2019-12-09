import { Badge } from './../../models/badge';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ProxyService } from './proxy.service';
import { Driver } from '../../models/driver';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class DriverService  extends EmsService<Badge> {

  constructor(proxy: ProxyService) {
    super(proxy, 'drivers');
  }

}
