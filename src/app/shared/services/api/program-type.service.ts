import { ProgramType } from './../../models/program-type';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { BadgeType } from '../../models/badge-type';
import 'rxjs/add/operator/map';

@Injectable()
export class ProgramTypeService extends EmsService<ProgramType> {

  constructor(proxy: ProxyService) {
    super(proxy, 'programtypes');
  }

}
