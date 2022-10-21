import { Pays } from './../../models/pays';
import { EmsService } from './ems.service';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';
import { Account } from '../../models';

@Injectable()
export class PaysService  extends EmsService<Pays> {

  constructor(proxy: ProxyService) {
    super(proxy, 'pays');
  }

}
