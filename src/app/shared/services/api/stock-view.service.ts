import { Stock } from './../../models/stock';
import { EmsService } from './ems.service';
import { InsuranceTerm } from '../../models/insurance-term';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { ProxyService } from './proxy.service';
import { StockView } from '../../models/stock-view';

@Injectable()
export class StockViewService extends EmsService<StockView> {

  constructor(proxy: ProxyService) {
    super(proxy, 'stockViews');
  }



}
