import { BadgeType } from './badge-Type';
import { NotificationState } from './notificationState';

export class Notification {

  id: number;
  code: string;
  type: string;
  notificationState: NotificationState;
  state :NotificationState
}
