import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { BadgeType } from '../../models/badge-type';
import 'rxjs/add/operator/map';
import { Pump } from '../../models/pump';

@Injectable()
export class PumpService extends EmsService<Pump> {

  constructor(proxy: ProxyService) {
    super(proxy, 'pumps');
  }

}
