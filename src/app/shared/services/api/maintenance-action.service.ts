import { EmsService } from './ems.service';
import { MaintenanceAction } from '../../models/maintenance-action';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class MaintenanceActionService extends EmsService<MaintenanceAction> {

  constructor(proxy: ProxyService) {
    super(proxy, 'maintenanceActions');
  }

}
