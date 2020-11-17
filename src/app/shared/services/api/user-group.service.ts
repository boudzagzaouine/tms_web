import { Injectable } from '@angular/core';
import {UserGroup} from '../../models';
import {ProxyService} from './proxy.service';
import {Observable} from 'rxjs/Observable';
import { EmsService } from './ems.service';

@Injectable()
export class UserGroupService extends EmsService<UserGroup>{

  constructor(proxy: ProxyService) {
    super(proxy, 'userGroups');
  }

}
