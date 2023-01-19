import { CatalogService } from './../../models/catalog-service';

import { CatalogPricing } from '../../models/catalog-pricing';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { Driver } from '../../models/driver';
import { Agent } from '../../models/agent';


@Injectable()
export class CatalogServiceService  extends EmsService<CatalogService> {

  constructor(proxy: ProxyService) {
    super(proxy, 'catalogServices');
  }r

}
