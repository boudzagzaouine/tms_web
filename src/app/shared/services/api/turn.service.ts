import { Turn } from './../../models/turn';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { BadgeType } from '../../models/badge-type';
import 'rxjs/add/operator/map';

@Injectable()
export class TurnService extends EmsService<Turn> {

  constructor(proxy: ProxyService) {
    super(proxy, 'turns');
  }

}
