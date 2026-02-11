import type {DeliveryLine} from './delivery-line';
import type {SaleOrder} from './sale-order';

export class Warehouse {
  id: number;
  code: string;
  description: string;
  active: boolean;
  telephone: string;
  email: string;
  creationDate: Date;
  updateDate: Date;
}
