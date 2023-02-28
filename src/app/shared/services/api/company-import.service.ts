import { CompanyImport } from './../../import/company-import';
import { TrajetImport } from './../../import/trajet-import';
import { AccountPricingImport } from './../../import/account-pricing-import';
import { CatalogPricingImport } from './../../import/catalog-pricing-import';
import { CatalogPricing } from './../../models/catalog-pricing';
import { AddressDelivery } from './../../import/address-delivery';
import { Action } from './../../models/action';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class CompanyImportService extends EmsService<CompanyImport> {

    constructor(proxy: ProxyService) {
      super(proxy, 'dataExchanges');
    }
}
