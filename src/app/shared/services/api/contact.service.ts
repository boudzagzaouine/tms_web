import { Contact } from './../../models/contact';
import { Action } from './../../models/action';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class ContactService extends EmsService<Contact> {

    constructor(proxy: ProxyService) {
      super(proxy, 'contacts');
    }
}
