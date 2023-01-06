import { CatalogTransportPricing } from './../../models/CatalogTransportPricing';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { TransportCategoryVehicle } from '../../models/transport-category-vehicle';

@Injectable()
export class CatalogTransportPricingService extends EmsService<CatalogTransportPricing> {

    constructor(proxy: ProxyService) {
      super(proxy, 'CatalogTransportPricings');
    }
}
