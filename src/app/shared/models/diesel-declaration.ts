import { NotificationType} from './notificationType';
import { NotificationState } from './notificationState';
import { Vehicle } from './vehicle';
import { Owner } from './owner';

export class DieselDeclaration {


  id: number;
  code: string;
  vehicle: Vehicle;
  amount: number;
  mileage :number;
  dieselDeclarationDate :Date=new Date();

 owner:Owner;
}
