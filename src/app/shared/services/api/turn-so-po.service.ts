import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import 'rxjs/add/operator/map';
import { TurnSoPo } from '../../models/turn-so-po';

@Injectable()
export class TurnSoPoService extends EmsService<TurnSoPo> {

  constructor(proxy: ProxyService) {
    super(proxy, 'turnSoPos');
  }

}
