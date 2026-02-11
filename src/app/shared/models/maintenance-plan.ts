import type { Day } from './day';
import type { Month } from './month';
import { SelectItem } from 'primeng/api';
import type { Action } from './action';
import type { PeriodicityType } from './periodicity-type';
import type { Responsability } from './responsability';
import type { ServiceProvider } from './service-provider';
import type { OperationType } from './operation-type';
import type { ProgramType } from './program-type';
import type { MaintenanceLine } from './maintenance-line';
import type { Vehicle } from './vehicle';
import type { MaintenanceType } from './maintenance-type';
import type { MaintenanceState } from './maintenance-state';
import type { Patrimony } from './patrimony';
import type { ActionPlan } from './action-plan';
import type { Owner } from './owner';



export class MaintenancePlan {

  id = 0;
  code: string;
  description: string;
  actionPlans: ActionPlan[] = [];
   
  owner:Owner;

}
