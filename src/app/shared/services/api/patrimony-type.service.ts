import { PatrimonyType } from './../../models/patrimony-type';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class PatrimonyTypeService extends EmsService<PatrimonyType> {

  constructor(proxy: ProxyService) {
    super(proxy, 'patrimonytypes');
  }

}
