import { ActionType } from './action-type';
import { MaintenanceState } from './maintenance-state';
import { MaintenancePlan } from './maintenance-plan';
import { Product } from './product';
import { Uom } from './uom';
import { ActionLine } from './action-line';

export class Action {

  id = 0;
  actionType: ActionType;
  maintenanceState: MaintenanceState;
  maintenancePlan: MaintenancePlan;
  actionLines: ActionLine[] = [];
  

}
