import { ServiceProvider } from './../../models/service-provider';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

@Injectable()
export class ServiceProviderService extends EmsService<ServiceProvider> {

  constructor(proxy: ProxyService) {
    super(proxy, 'serviceproviders');
  }

}
