import { NotificationType} from './notificationType';
import { NotificationState } from './notificationState';

export class Notification {

  id: number;
  code: string;
  type: string;
  notificationState: NotificationState;
  productId :number;
  maintenanceId :number;
  patimonyCode :String;
  typePatrimony :String;
  notificationType : NotificationType;
  action :String;
}
