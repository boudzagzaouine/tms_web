import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';

import 'rxjs/add/operator/map';

@Injectable()
export class BadgeService extends EmsService<Badge> {

    constructor(proxy: ProxyService) {
      super(proxy, 'badges');
    }

}
