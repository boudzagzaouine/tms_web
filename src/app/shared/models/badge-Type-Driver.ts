import { BadgeType } from './badge-Type';
import { Driver } from './driver';
import { Owner } from './owner';

export class BadgeTypeDriver {

  id: number;
  driver: Driver;
  badgeType: BadgeType;
  badgeNumber : String;
  deliveranceDate : Date = new Date();
  validityEndDate : Date = new Date();
   owner:Owner;
}
