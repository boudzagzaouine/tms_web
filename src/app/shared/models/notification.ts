import { NotificationType} from './notificationType';
import { NotificationState } from './notificationState';
import { Maintenance } from './maintenance';
import { Product } from '.';
import { Responsability } from './responsability';
import { ServiceProvider } from './service-provider';

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
  intervention:String;
  action :String;
  responsability: Responsability ;
  serviceProvider: ServiceProvider ;
   agent:String;

}
