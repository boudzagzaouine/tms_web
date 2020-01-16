import { BadgeType } from './badge-Type';
import { CommissionType } from './commissionType';
import { Driver } from './driver';

export class BadgeTypeDriver {

  id: number;
  driver: Driver;
  badgeType: BadgeType;
  badgeNumber : String;
  deliveranceDate : Date = new Date();
  validityEndDate : Date = new Date();

}
