import type { NotificationType} from './notificationType';
import type { NotificationState } from './notificationState';
import type { Vehicle } from './vehicle';
import type { Owner } from './owner';
import type { Driver } from './driver';
import type { SubscriptionCard } from './subscription-card';
import type { PurchaseOrder } from './purchase-order';
import type { FuelPump } from './fuel-pump';

export class DieselDeclaration {


  id: number;
  code: string;
  vehicle: Vehicle;
  driver:Driver;
  typeDeclaration:number;
  subscriptionCard :SubscriptionCard;
  purshaseOrder :PurchaseOrder;
  bon:string;
  amount: number;
  mileage :number;
  dieselDeclarationDate :Date=new Date();
  owner:Owner;
  fuelPump:FuelPump;
  quantity:number;
}
