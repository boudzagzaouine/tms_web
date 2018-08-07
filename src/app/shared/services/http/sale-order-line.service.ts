import { Injectable, Inject } from '@angular/core';
import { SaleOrderLine } from '../../models';
import { ProxyService } from './proxy.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SaleOrderLineService {

  controller = 'saleOrderLines';

  constructor(private proxy: ProxyService) {}

  findAll(): Observable<SaleOrderLine[]> {
    console.log('from saleOrderLine service findAll');
    return this.proxy.findAll(this.controller);
  }

  find(search: string) {
    return this.proxy.find(this.controller, search);
  }

  findById(id: number): Observable<SaleOrderLine> {
    // let TOKEN = this.token.computeToken('ems@ems.com', 'EMS', '77d2896c3eb544541f9389fe42651b0d');
    return this.proxy.findById(this.controller, id);
  }

  size() {
    return this.proxy.size(this.controller);
  }

  findAllPagination(page: number, size: number) {
    return this.proxy.findAllPagination(this.controller, page, size);
  }

  findPagination(page: number, size: number, search: string) {
    return this.proxy.findPagination(this.controller, search, page, size);
  }

  sizeSearch(search: string) {
    return this.proxy.sizeSearch(this.controller, search);
  }

  set(saleOrderLine: SaleOrderLine) {
    return this.proxy.add(this.controller, saleOrderLine);
  }

  add(saleOrderLine: SaleOrderLine) {
    return this.proxy.add(this.controller, saleOrderLine);
  }
}
