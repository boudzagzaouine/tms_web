import { User } from './../../models/user';
import { EmsService } from './ems.service';
import { InsuranceTerm } from '../../models/insurance-term';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { ProxyService } from './proxy.service';

@Injectable()
export class UserService extends EmsService<User> {

  constructor(proxy: ProxyService) {
    super(proxy, 'users');
  }

}
