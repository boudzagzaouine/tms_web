import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { BadgeType } from '../../models/badge-type';
import 'rxjs/add/operator/map';
import { Pump } from '../../models/pump';
import { AlimentationPump } from '../../models/alimentation-pump';

@Injectable()
export class AlimentationPumpService extends EmsService<AlimentationPump> {

  constructor(proxy: ProxyService) {
    super(proxy, 'alimentationPumps');
  }

}
