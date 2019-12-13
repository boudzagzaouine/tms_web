import { MaintenanceLine } from './../../models/maintenance-line';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';


@Injectable()
export class MaintenanceLineService  extends EmsService<MaintenanceLine> {

  constructor(proxy: ProxyService) {
    super(proxy, 'maintenanceLines');
  }

}
