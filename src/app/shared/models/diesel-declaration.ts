import { NotificationType} from './notificationType';
import { NotificationState } from './notificationState';
import { Vehicle } from './vehicle';
import { Owner } from './owner';
import { Driver } from './driver';
import { SubscriptionCard } from './subscription-card';

export class DieselDeclaration {


  id: number;
  code: string;
  vehicle: Vehicle;
  driver:Driver;
  typeDeclaration:number;
  subscriptionCard :SubscriptionCard;
  bon:string;
  amount: number;
  mileage :number;
  dieselDeclarationDate :Date=new Date();
  owner:Owner;
}
