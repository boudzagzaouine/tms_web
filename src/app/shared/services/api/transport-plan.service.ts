import { TransportPlan } from './../../models/transport-plan';
import { EmsService } from './ems.service';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { TurnType } from '../../models/turn-Type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { REST_URL } from './../../utils/constants';
import { CashCollection } from './../../models/cash-collection';

@Injectable()
export class TransportPlanService extends EmsService<TransportPlan> {

  constructor(private proxyService: ProxyService, private http: HttpClient) {
    super(proxyService, 'transportPlans');
  }

  /** Cash the driver declared collecting on this plan ("retour de fonds"), most recent first. */
  getCashCollections(planId: number): Observable<CashCollection[]> {
    return this.http.get<CashCollection[]>(
      `${REST_URL}transportPlans/${planId}/cash-collection?token=${this.proxyService.getToken()}`
    );
  }

}
