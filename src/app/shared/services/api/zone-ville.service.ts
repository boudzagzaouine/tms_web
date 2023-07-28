


import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { ZoneVille } from '../../models/zone-ville';

@Injectable()
export class ZoneVilleService extends EmsService<ZoneVille> {

    constructor(proxy: ProxyService) {
      super(proxy, 'zoneVilles');
    }
}