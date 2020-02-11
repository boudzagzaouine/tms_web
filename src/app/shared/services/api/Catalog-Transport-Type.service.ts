import { CatalogTransportType } from './../../models/CatalogTransportType';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { TransportCategoryVehicle } from '../../models/transport-category-vehicle';

@Injectable()
export class CatalogTransportTypeServcie extends EmsService<CatalogTransportType> {

    constructor(proxy: ProxyService) {
      super(proxy, 'CatalogTransportTypes');
    }
}
