import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { VehicleCategory } from '../../models/vehicle-category';


@Injectable()
export class VehicleCategoryService  extends EmsService<VehicleCategory> {

  constructor(proxy: ProxyService) {
    super(proxy, 'vehicleCategories');
  }

}
