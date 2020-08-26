import { ReceptionLine } from './../../models/reception-line';
import { PurchaseOrder } from './../../models/purchase-order';
import { EmsService } from './ems.service';
import { InsuranceTerm } from '../../models/insurance-term';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { ProxyService } from './proxy.service';

@Injectable()
export class ReceptionLineService extends EmsService<ReceptionLine> {

  constructor(proxy: ProxyService) {
    super(proxy, 'receptionLines');
  }



}
