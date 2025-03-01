import { VehicleTray } from './../../models/vehicle-tray';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { Driver } from '../../models/driver';
import { Agent } from '../../models/agent';


@Injectable()
export class VehicleTrayService  extends EmsService<VehicleTray> {

  constructor(proxy: ProxyService) {
    super(proxy, 'vehicleTrays');
  }

}
