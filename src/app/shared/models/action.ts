import type { ActionType } from './action-type';
import type { MaintenanceState } from './maintenance-state';
import type { MaintenancePlan } from './maintenance-plan';
import type { Product } from './product';
import type { Uom } from './uom';
import type { ActionLine } from './action-line';

export class Action {

  id = 0;
  actionType: ActionType;
  maintenanceState: MaintenanceState;
  maintenancePlan: MaintenancePlan;
  actionLines: ActionLine[] = [];
  

}
