import { CatalogTransportAccountPricing } from './../../models/catalog-transport-account-pricing';
import { CatalogTransportPricing } from './../../models/CatalogTransportPricing';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { TransportCategoryVehicle } from '../../models/transport-category-vehicle';

@Injectable()
export class CatalogTransportAccountPricingService extends EmsService<CatalogTransportAccountPricing> {

    constructor(proxy: ProxyService) {
      super(proxy, 'CatalogTransportAccountPricings');
    }
}
