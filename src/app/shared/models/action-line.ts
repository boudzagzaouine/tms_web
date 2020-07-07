import { Action } from './action';
import { MaintenanceState } from './maintenance-state';
import { MaintenancePlan } from './maintenance-plan';
import { Product } from './product';
import { Uom } from './uom';

export class ActionLine {

  id = 0;
  product: Product;
  action: Action ;
  description: string;
  quantity = 1;
  unitPrice = 0;
  totalPriceHT = 0;
  totalPriceTTC = 0;
  amountVat = 0;
}
