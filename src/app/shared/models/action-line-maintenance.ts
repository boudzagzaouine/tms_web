import type { ActionMaintenance } from './action-maintenance';
import type { Action } from './action';
import type { MaintenanceState } from './maintenance-state';
import type { MaintenancePlan } from './maintenance-plan';
import type { Product } from './product';
import type { Uom } from './uom';
import type { Owner } from './owner';

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
  owner :Owner;
 // maintenanceState:MaintenanceState;
}
