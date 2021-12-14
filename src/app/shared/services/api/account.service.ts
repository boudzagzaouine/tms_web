import { EmsService } from './ems.service';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';
import { Account } from '../../models';

@Injectable()
export class AccountService  extends EmsService<Account> {

  constructor(proxy: ProxyService) {
    super(proxy, 'accounts');
  }

}
