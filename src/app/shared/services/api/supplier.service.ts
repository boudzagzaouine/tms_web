import { Supplier } from './../../models/supplier';
import { EmsService } from './ems.service';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class SupplierService  extends EmsService<Supplier> {

  constructor(proxy: ProxyService) {
    super(proxy, 'suppliers');
  }

}
