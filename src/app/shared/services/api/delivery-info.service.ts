import { DeliveryInfo } from './../../models/delivery-info';
import { Transport } from './../../models/transport';
import { PackagingType } from './../../models/packaging-type';
import { PackageDetail } from './../../models/package-detail';
import { AddressContactDeliveryInfo } from './../../models/address-contact-delivery-info';
import { Subject } from 'rxjs';
import { EmsService } from './ems.service';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';
import { Account } from '../../models';

@Injectable()
export class DeliveryInfoService  extends EmsService<DeliveryInfo> {


  constructor(proxy: ProxyService) {
    super(proxy, 'orderDeliveries');
  }


}
