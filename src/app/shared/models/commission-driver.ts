import type { CommissionType } from './commissionType';
import type { Driver } from './driver';

export class CommissionDriver {

  id: number;
  driver: Driver;
  commissionType: CommissionType;
  datee: Date = new Date();
  amount: number;

}
