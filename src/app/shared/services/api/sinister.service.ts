import { SinisterType } from './../../models/sinister-type';
import { ActionType } from './../../models/action-type';
import { Action } from './../../models/action';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { Sinister } from '../../models/sinister';

@Injectable()
export class SinisterService extends EmsService<Sinister> {

    constructor(proxy: ProxyService) {
      super(proxy, 'sinisters');
    }
}
