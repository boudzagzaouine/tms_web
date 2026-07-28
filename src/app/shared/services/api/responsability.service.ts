import { Responsability } from './../../models/responsability';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class ResponsabilityService extends EmsService<Responsability> {

  constructor(proxy: ProxyService) {
    super(proxy, 'responsabilities');
  }

}
