import { NotificationType} from './notificationType';
import { NotificationState } from './notificationState';
import { Maintenance } from './maintenance';
import { Product } from '.';

export class Notification {

  id: number;
  code: string;
  type: string;
  notificationState: NotificationState;
  product:Product;
  maintenance:Maintenance;
  productId :number;
  maintenanceId :number;
  patimonyCode :String;
  typePatrimony :String;
  notificationType : NotificationType;
  patrimonyType:String;
  action :String;
  

}
