import { MaintenanceState } from './maintenance-state';
import { Action } from './action';
import { MaintenancePlan } from './maintenance-plan';
import { Product } from './product';
import { Uom } from './uom';

export class MaintenanceLine {

  id = 0;
  product: Product;
  action: Action ;
  maintenanceState: MaintenanceState;
  description: string;
  quantity = 1;
  unitPrice = 0;
  totalPriceHT = 0;
  totalPriceTTC = 0;
  amountVat = 0;
  maintenancePlan: MaintenancePlan;

}
