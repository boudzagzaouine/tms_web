import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import 'rxjs/add/operator/map';
import { ConditionalType } from '../../models/contional-Type';

@Injectable()
export class ConditionalTypeService extends EmsService<ConditionalType> {

  constructor(proxy: ProxyService) {
    super(proxy, 'conditionalTypes');
  }

}
