import { Product } from './../../models/product';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable({
  providedIn: 'root'
})
export class ExportService extends EmsService<any> {

  constructor(proxy: ProxyService) {
    super(proxy, 'exports');
  }

}
