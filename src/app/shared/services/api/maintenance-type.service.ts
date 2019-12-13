import { EmsService } from './ems.service';
import { MaintenanceType } from '../../models/maintenance-type';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class MaintenanceTypeService extends EmsService<MaintenanceType> {

  constructor(proxy: ProxyService) {
    super(proxy, 'maintenanceTypes');
  }

}
