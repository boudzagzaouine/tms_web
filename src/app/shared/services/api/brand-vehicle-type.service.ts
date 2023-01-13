import { BrandVehicleType } from './../../models/brand-vehicle-type';
import { EmsService } from './ems.service';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';
import { Account } from '../../models';

@Injectable()
export class BrandVehicleTypeService  extends EmsService<BrandVehicleType> {

  constructor(proxy: ProxyService) {
    super(proxy, 'brandVehicleTypes');
  }

}
