import { Maintenance } from './../../models/maintenance';
import { EmsService } from './ems.service';
import { MaintenancePlan } from '../../models/maintenance-plan';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';


@Injectable()
export class MaintenanceService extends EmsService<Maintenance> {

  constructor(proxy: ProxyService) {
    super(proxy, 'maintenance');
  }
}
