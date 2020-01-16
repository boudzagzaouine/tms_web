import { CommissionType } from './commissionType';
import { Driver } from './driver';

export class Commission {

  id: number;
  driver: Driver;
  commissionType: CommissionType;
  amount: number;

}
