import { ActionLineMaintenance } from './action-line-maintenance';
import { ActionType } from './action-type';
import { MaintenanceState } from './maintenance-state';
import { MaintenancePlan } from './maintenance-plan';
import { Product } from './product';
import { Uom } from './uom';
import { ActionLine } from './action-line';
import { Maintenance } from './maintenance';

export class ActionMaintenance {

  id = 0;
  actionType: ActionType;
  maintenanceState: MaintenanceState;
  maintenance: Maintenance;
  actionLineMaintenances: ActionLineMaintenance[] = [];


}
