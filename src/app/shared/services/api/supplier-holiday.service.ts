import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { SupplierHoliday } from '../../models/supplier-holiday';


@Injectable()
export class SupplierHolidayService extends EmsService<SupplierHoliday> {

  constructor(proxy: ProxyService) {
    super(proxy, 'supplierHolidays');
  }

}
