import { Injectable } from '@angular/core';
import {PaymentAccount} from '../../models';
import {ProxyService} from './proxy.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PaymentAccountService {

  controller = 'paymentAccounts';
  constructor(private proxy: ProxyService) {
  }

  findAll(): Observable<PaymentAccount[]> {
    console.log('from paymentAccount service findAll');
    return this.proxy.findAll(this.controller);
  }

  find(search: string) {
    return this.proxy.find(this.controller, search);
  }

  findById(id: number): Observable<PaymentAccount> {
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
  set(paymentAccount: PaymentAccount) {
    return this.proxy.set(this.controller, paymentAccount);
  }
  add(paymentAccount: PaymentAccount) {
      console.log('add paymentAccount');
    return this.proxy.add(this.controller, paymentAccount);
  }

}
