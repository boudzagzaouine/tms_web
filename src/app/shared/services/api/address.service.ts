import { Address } from './../../models/address';
import { EmsService } from './ems.service';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class AddressService  extends EmsService<Address> {

  constructor(proxy: ProxyService) {
    super(proxy, 'addresses');
  }

}
