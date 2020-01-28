import { CommissionType } from './../../models/commissionType';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class CommissionTypeService  extends EmsService<CommissionType> {

  constructor(proxy: ProxyService) {
    super(proxy, 'commissiontypes');
  }

}
