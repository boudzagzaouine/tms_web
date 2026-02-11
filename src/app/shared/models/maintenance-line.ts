import type { Action } from './action';
import type { MaintenanceState } from './maintenance-state';
import type { MaintenancePlan } from './maintenance-plan';
import type { Product } from './product';
import type { Uom } from './uom';

export class MaintenanceLine {

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
