import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { Pump } from '../../models/pump';
import { FuelPump } from '../../models/fuel-pump';

@Injectable()
export class FuelPumpService extends EmsService<FuelPump> {

  constructor(proxy: ProxyService) {
    super(proxy, 'fuelPumps');
  }

}
