import { Injectable } from '@angular/core';
import {Room} from '../../models';
import {ProxyService} from './proxy.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RoomService {

  controller = 'rooms';
  constructor(private proxy: ProxyService) {
  }

  findAll(): Observable<Room[]> {
    console.log('from room service findAll');
    return this.proxy.findAll(this.controller);
  }

  find(search: string) {
    return this.proxy.find(this.controller, search);
  }

  findById(id: number): Observable<Room> {
    // let TOKEN = this.token.computeToken('ems@ems.com', 'EMS', '77d2896c3eb544541f9389fe42651b0d');
    return this.proxy.findById(this.controller, id);
  }

  findByCode(code: string): Observable<Room> {
    // let TOKEN = this.token.computeToken('ems@ems.com', 'EMS', '77d2896c3eb544541f9389fe42651b0d');
    return this.proxy.findByCode(this.controller, code);
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
  set(room: Room) {
    this.proxy.add(this.controller, room);
  }
  add(room: Room) {
    this.proxy.add(this.controller, room);
  }

}
