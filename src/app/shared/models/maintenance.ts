import type { ActionMaintenance } from './action-maintenance';
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
import type { ActionLineMaintenance } from './action-line-maintenance';
import type { ActionType } from './action-type';
import type { ConditionalType } from './contional-Type';
import type { SaleOrder } from './sale-order';
import type { Supplier } from './supplier';
import type { PurchaseOrder } from './purchase-order';
import type { Owner } from './owner';
import type { Driver } from './driver';
import type { Agent } from './agent';



export class Maintenance {

  id = 0;
  code: string;
  description: string;
  startDate: Date = new Date();
  endDate: Date = new Date();
  maintenanceType: MaintenanceType;
  maintenanceState: MaintenanceState;
  programType: ProgramType;
  operationType: OperationType;
  serviceProvider: ServiceProvider;
  responsability: Responsability;
  service: Responsability;
  periodicityType: PeriodicityType;
  actionLineMaintenances: ActionLineMaintenance[] = [];
  actionType :ActionType;
  patrimony: Patrimony;
  mileage :number;
  totalPrice = 0;
  agent: Agent;
  employer: string;
  triggerDay: number;
  triggerDate: Date  = new Date();
  interventionDate: Date= new Date();
  maintenanceDate: Date = new Date();

  duration : number ;
  declaredDate : Date = new Date();
  observation : string;

  dayOfMonth : number;
  mileageNext:number;
conditionalType :ConditionalType;
valueconditionalType :number;

purshaseOrder: PurchaseOrder;
supplier :Supplier;

owner: Owner;

driver:Driver;
blocking:String;
}
