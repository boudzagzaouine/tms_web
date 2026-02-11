import type { User } from './user';
import type { BadgeType } from './badge-Type';
import type { Driver } from './driver';

export class BadgeTypeDriver {

  id: number;
  query: string;
  name: string;
  user: User;

}
