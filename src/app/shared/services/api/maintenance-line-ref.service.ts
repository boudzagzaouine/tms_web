import { EmsService } from './ems.service';
import { MaintenanceLineRef } from '../../models/maintenance-line-ref';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class MaintenanceLineRefService extends EmsService<MaintenanceLineRef> {

  constructor(proxy: ProxyService) {
    super(proxy, 'maintenanceLineRefs');
  }

}
