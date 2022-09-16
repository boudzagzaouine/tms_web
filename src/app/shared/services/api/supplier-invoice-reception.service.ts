import { SupplierInvoiceReception } from './../../models/supplier-invoice-reception';
import { EmsService } from './ems.service';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';
import { Account } from '../../models';

@Injectable()
export class SupplierInvoiceReceptionService  extends EmsService<SupplierInvoiceReception> {

  constructor(proxy: ProxyService) {
    super(proxy, 'supplierInvoiceReceptions');
  }

}
