import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import 'rxjs/add/operator/map';
import { Holiday } from '../../models/holiday';

@Injectable()
export class HolidayService extends EmsService<Holiday> {

  constructor(proxy: ProxyService) {
    super(proxy, 'Holidays');
  }

}
