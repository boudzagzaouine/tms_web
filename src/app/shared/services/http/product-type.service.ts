import { Injectable } from '@angular/core';
import {ProductType} from '../../models';
import {ProxyService} from './proxy.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProductTypeService {

  controller = 'productTypes';
  constructor(private proxy: ProxyService) {
  }

  findAll(): Observable<ProductType[]> {
    console.log('from productType service findAll');
    return this.proxy.findAll(this.controller);
  }

  find(search: string) {
    return this.proxy.find(this.controller, search);
  }

  findById(id: number): Observable<ProductType> {
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
  set(productType: ProductType) {
    this.proxy.add(this.controller, productType);
  }
  add(productType: ProductType) {
    this.proxy.add(this.controller, productType);
  }

}
