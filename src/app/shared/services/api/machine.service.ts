import { Machine } from './../../models/machine';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class MachineService  extends EmsService<Machine> {

  constructor(proxy: ProxyService) {
    super(proxy, 'machines');
  }

}
