import { Injectable } from '@angular/core';
import {GroupHabilitation} from '../../models';
import {ProxyService} from './proxy.service';
import {Observable} from 'rxjs/Observable';
import { EmsService } from './ems.service';

@Injectable()
export class GroupHabilitationService extends EmsService<GroupHabilitation> {

  
  constructor(proxy: ProxyService) {
    super(proxy, 'groupHabilitations');
  }
  
   
}

  