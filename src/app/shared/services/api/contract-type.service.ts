import { EmsService } from './ems.service';
import { ContractType } from '../../models/contract-type';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { ProxyService } from './proxy.service';

@Injectable()
export class ContractTypeService  extends EmsService<ContractType> {

  constructor(proxy: ProxyService) {
    super(proxy, 'contractTypes');
  }

}
