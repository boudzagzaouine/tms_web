import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { OrderType } from '../../models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderTypeService {
    controller = 'orderTypes';
  constructor(private proxy: ProxyService) { }

  findAll(): Observable<OrderType[]> {
    console.log('from orderStatus service findAll');
    return this.proxy.findAll(this.controller);
  }

  find(search: string) {
    return this.proxy.find(this.controller, search);
  }

  findById(id: number): Observable<OrderType> {
    return this.proxy.findById(this.controller, id);
  }

}
