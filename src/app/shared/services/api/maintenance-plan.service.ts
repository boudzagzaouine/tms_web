import { EmsService } from './ems.service';
import { MaintenancePlan } from '../../models/maintenance-plan';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';


@Injectable()
export class MaintenancePlanService extends EmsService<MaintenancePlan> {

  constructor(proxy: ProxyService) {
    super(proxy, 'maintenancePlans');
  }
}
