import { Transport } from './../../models/transport';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class TransportServcie extends EmsService<Transport> {

    constructor(proxy: ProxyService) {
      super(proxy, 'transports');
    }
}
