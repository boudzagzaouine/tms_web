import { PackagingType } from './../../models/packaging-type';
import { ActionType } from './../../models/action-type';
import { Action } from './../../models/action';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class PackagingTypeService extends EmsService<PackagingType> {

    constructor(proxy: ProxyService) {
      super(proxy, 'packagingtypes');
    }
}
