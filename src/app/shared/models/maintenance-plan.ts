import { Day } from './day';
import { Month } from './month';
import { SelectItem } from 'primeng/api';
import { Action } from './action';
import { PeriodicityType } from './periodicity-type';
import { Responsability } from './responsability';
import { ServiceProvider } from './service-provider';
import { OperationType } from './operation-type';
import { ProgramType } from './program-type';
import { MaintenanceLine } from './maintenance-line';
import { Vehicle } from './vehicle';
import { MaintenanceType } from './maintenance-type';
import { MaintenanceState } from './maintenance-state';
import { Patrimony } from './patrimony';
import { ActionPlan } from './action-plan';



export class MaintenancePlan {

  id = 0;
  code: string;
  description: string;
  actionPlans: ActionPlan[] = [];


}
