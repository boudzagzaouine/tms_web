import { LoadingType } from './../../models/loading-type';
import { Action } from './../../models/action';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class LoadingTypeService extends EmsService<LoadingType> {

    constructor(proxy: ProxyService) {
      super(proxy, 'loadingTypes');
    }
}
