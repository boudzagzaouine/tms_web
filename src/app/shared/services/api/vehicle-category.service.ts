import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ProxyService } from './proxy.service';
import { VehicleCategory } from '../../models/vehicle-category';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class VehicleCategoryService  extends EmsService<VehicleCategory> {

  constructor(proxy: ProxyService) {
    super(proxy, 'vehicleCategories');
  }

}
