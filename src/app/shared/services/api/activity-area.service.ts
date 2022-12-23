import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import 'rxjs/add/operator/map';
import { Pump } from '../../models/pump';
import { FuelPump } from '../../models/fuel-pump';
import { ActivityArea } from '../../models/activity-area';

@Injectable()
export class ActivityAreaService extends EmsService<ActivityArea> {

  constructor(proxy: ProxyService) {
    super(proxy, 'activityAreas');
  }

}
