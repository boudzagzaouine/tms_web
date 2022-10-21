import { ContainerType } from './../../models/container-type';
import { EmsService } from './ems.service';
import { ContractType } from '../../models/contract-type';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class ContainerTypeService  extends EmsService<ContainerType> {
  ggh :string;
  constructor(proxy: ProxyService) {
    super(proxy, 'containerTypes');
  }

}
