import { Agency } from './../../models/agency';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import 'rxjs/add/operator/map';
import { Holiday } from '../../models/holiday';

@Injectable()
export class AgencyService extends EmsService<Agency> {

  constructor(proxy: ProxyService) {
    super(proxy, 'agencies');
  }

}
