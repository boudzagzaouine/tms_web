import type { ActionType } from './action-type';
import type { MaintenanceState } from './maintenance-state';
import type { MaintenancePlan } from './maintenance-plan';
import type { Product } from './product';
import type { Uom } from './uom';
import type { ActionLine } from './action-line';
import type { MaintenanceType } from './maintenance-type';
import type { ProgramType } from './program-type';
import type { OperationType } from './operation-type';
import type { ServiceProvider } from './service-provider';
import type { Responsability } from './responsability';
import type { PeriodicityType } from './periodicity-type';

import type { Patrimony } from './patrimony';
import type { Day } from './day';
import type { Month } from './month';
import type { Action } from './action';
import type { ConditionalType } from './contional-Type';
import type { Owner } from './owner';
import type { Agent } from './agent';

export class ActionPlan {

  id = 0;
  startDate: Date = new Date();
  endDate: Date = new Date();
  maintenanceType: MaintenanceType;
  programType: ProgramType;
  //operationType: OperationType;
  serviceProvider: ServiceProvider;
  responsability: Responsability;
  service: Responsability;
  periodicityType: PeriodicityType;
  triggerDay: number;
  triggerDate: Date  = new Date();
  interventionDate: Date  = new Date();
 // mileage = 0.0;
 // totalPrice = 0;
  agent: Agent;
  employer: string;
  observation : string;
  declaredDate : Date = new Date();
  duration : number ;
  dayOfMonth : number;
   months : Month[] = [];
  days : Day[] = [];
  maintenancePlan: MaintenancePlan;
  actionType: ActionType;
  blocking: string;

  conditionalType:ConditionalType;
  valueconditionalType :number;
  owner : Owner;

}
