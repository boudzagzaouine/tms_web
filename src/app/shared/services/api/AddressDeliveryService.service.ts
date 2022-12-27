import { AddressDelivery } from './../../import/address-delivery';
import { Action } from './../../models/action';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class AddressDeliveryService extends EmsService<AddressDelivery> {

    constructor(proxy: ProxyService) {
      super(proxy, 'dataExchanges');
    }
}
