import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ProxyService } from './proxy.service';


@Injectable()
export class EmsService<T> {
  controller: string;


  constructor(
    private proxy: ProxyService, controller: string) {
    this.controller = controller;

  }

  findAll(): Observable<T[]> {
    console.log('from driver service findAll');
    return this.proxy.findAll(this.controller);
  }

  find(search: string) {
    return this.proxy.find(this.controller, search);
  }

  findById(id: number): Observable<T> {
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

  set(t: T): Observable<T> {
    return this.proxy.set(this.controller, t);
  }
  setAll(t: T[]): Observable<T[]> {
    return this.proxy.setAll(this.controller, t);
  }

  add(t: T): Observable<T> {
    return this.proxy.add(this.controller, t);
  }
  saveAll(t: T[]): Observable<T[]> {
    return this.proxy.addAll(this.controller, t);
  }

  delete(id: number) {
    return this.proxy.delete(this.controller, id);
  }

  deleteAllByIds(ids: number[]) {
    return this.proxy.deleteAllByIds(this.controller, ids);
  }

  findByPatrimony(idVehicle: number): Observable<T> {
    return this.proxy.findByPatrimony(this.controller, idVehicle);
  }

  generateCode(): Observable<string> {
    return this.proxy.generateCode(this.controller);
}

verify() {
  return this.proxy.verify(this.controller);
}

}
