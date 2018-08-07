import { Injectable } from '@angular/core';
import {OrderStatus} from '../../models';
import {ProxyService} from './proxy.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class OrderStatusService {

  controller = 'orderStatuss';
  constructor(private proxy: ProxyService) {
  }

  findAll(): Observable<OrderStatus[]> {
    console.log('from orderStatus service findAll');
    return this.proxy.findAll(this.controller);
  }

  find(search: string) {
    return this.proxy.find(this.controller, search);
  }

  findById(id: number): Observable<OrderStatus> {
    // let TOKEN = this.token.computeToken('ems@ems.com', 'EMS', '77d2896c3eb544541f9389fe42651b0d');
    return this.proxy.findById(this.controller, id);
  }
}
