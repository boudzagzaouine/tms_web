import { Injectable } from '@angular/core';
import {Habilitation} from '../../models';
import {ProxyService} from './proxy.service';
import {Observable} from 'rxjs';
import { EmsService } from './ems.service';

@Injectable()
export class HabilitationService extends EmsService<Habilitation>{

  constructor(proxy: ProxyService) {
    super(proxy, 'habilitations');
  }


}
