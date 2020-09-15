import { ActionMaintenance } from './action-maintenance';
import { Action } from './action';
import { MaintenanceState } from './maintenance-state';
import { MaintenancePlan } from './maintenance-plan';
import { Product } from './product';
import { Uom } from './uom';

export class ActionLineMaintenance {

  id = 0;
  product: Product;
  actionMaintenance: ActionMaintenance ;
  description: string;
  quantity = 1;
  quantityServed = 1;
  unitPrice = 0;
  totalPriceHT = 0;
  totalPriceTTC = 0;
  amountVat = 0;
  maintenanceState:MaintenanceState;
}
