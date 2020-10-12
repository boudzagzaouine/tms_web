import { ActionType } from './action-type';
import { MaintenanceState } from './maintenance-state';
import { MaintenancePlan } from './maintenance-plan';
import { Product } from './product';
import { Uom } from './uom';
import { ActionLine } from './action-line';
import { MaintenanceType } from './maintenance-type';
import { ProgramType } from './program-type';
import { OperationType } from './operation-type';
import { ServiceProvider } from './service-provider';
import { Responsability } from './responsability';
import { PeriodicityType } from './periodicity-type';

import { Patrimony } from './patrimony';
import { Day } from './day';
import { Month } from './month';
import { Action } from './action';

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
  agent: string;
  employer: string;
  observation : string;
  declaredDate : Date = new Date();
  duration : number ; 
  dayOfMonth : number; 
   months : Month[] = [];
  days : Day[] = [];  
  maintenancePlan: MaintenancePlan;
  actionType: ActionType;
  
  

}
