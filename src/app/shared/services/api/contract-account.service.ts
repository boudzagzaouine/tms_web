import { EmsService } from './ems.service';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';
import { Account } from '../../models';
import { ContractAccount } from '../../models/contract-account';

@Injectable()
export class ContractAccountService  extends EmsService<ContractAccount> {

  constructor(proxy: ProxyService) {
    super(proxy, 'contractaccounts');
  }

}
