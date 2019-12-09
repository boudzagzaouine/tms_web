import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import 'rxjs/add/operator/map';

import { Vehicle } from '../../models/vehicle';

@Injectable()
export class VehicleService  extends EmsService<Vehicle> {

  constructor(proxy: ProxyService) {
    super(proxy, 'vehicles');
  }

}
