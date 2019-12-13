import { EmsService } from './ems.service';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';
import { MaintenanceState } from '../../models/maintenance-state';

@Injectable()
export class MaintenanceStateService extends EmsService<MaintenanceState> {

  constructor(proxy: ProxyService) {
    super(proxy, 'maintenanceStates');
  }


}
