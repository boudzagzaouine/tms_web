import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import 'rxjs/add/operator/map';
import { TurnType } from '../../models/turn-Type';

@Injectable()
export class TurnTypeService extends EmsService<TurnType> {

  constructor(proxy: ProxyService) {
    super(proxy, 'turnTypes');
  }

}
