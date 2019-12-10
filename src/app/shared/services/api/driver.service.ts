import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ProxyService } from './proxy.service';
import { Driver } from '../../models/driver';

@Injectable()
export class DriverService  extends EmsService<Driver> {

  constructor(proxy: ProxyService) {
    super(proxy, 'drivers');
  }

}
