import { Stock } from './../../models/stock';
import { EmsService } from './ems.service';
import { InsuranceTerm } from '../../models/insurance-term';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { ProxyService } from './proxy.service';

@Injectable()
export class StockService extends EmsService<Stock> {

  constructor(proxy: ProxyService) {
    super(proxy, 'stocks');
  }



}
