import type { BadgeType } from './badge-Type';
import type { Driver } from './driver';
import type { Owner } from './owner';

export class BadgeTypeDriver {

  id: number;
  driver: Driver;
  badgeType: BadgeType;
  badgeNumber : String;
  deliveranceDate : Date = new Date();
  validityEndDate : Date = new Date();
   owner:Owner;
}
