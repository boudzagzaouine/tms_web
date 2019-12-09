import {Injectable} from '@angular/core';
import { EmsService } from './ems.service';
import 'rxjs/add/operator/map';
import { ProxyService } from './proxy.service';
import { MaintenanceState } from '../../models/maintenance-state';

@Injectable()
export class MaintenanceStateService extends EmsService<MaintenanceState> {

  constructor(proxy: ProxyService) {
    super(proxy, 'maintenaceStates');
  }


}
