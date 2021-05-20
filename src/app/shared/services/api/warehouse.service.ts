import { Zone } from './../../models/Zone';
import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { TransportCategoryVehicle } from '../../models/transport-category-vehicle';
import { Warehouse } from '../../models';

@Injectable()
export class WarehouseServcie extends EmsService<Warehouse> {

  private defaultWarehouse: Warehouse;
  constructor(proxy: ProxyService) {
    super(proxy, 'warehouses');
    this.searchDeafaulrWarehouse();
  }





  getDefaultWarehouse() {
    return this.defaultWarehouse;
  }

  searchDeafaulrWarehouse() {

    this.findById(1).subscribe(
      data => this.defaultWarehouse = data
    );
  }
}
