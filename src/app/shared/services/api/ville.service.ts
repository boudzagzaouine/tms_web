import { Ville } from './../../models/ville';
import { EmsService } from './ems.service';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';
import { Account } from '../../models';

@Injectable()
export class VilleService  extends EmsService<Ville> {

  constructor(proxy: ProxyService) {
    super(proxy, 'villes');
  }

}
