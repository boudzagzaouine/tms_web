import { ActionMaintenance } from './action-maintenance';
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
import { ActionLineMaintenance } from './action-line-maintenance';
import { ActionType } from './action-type';
import { ConditionalType } from './contional-Type';
import { SaleOrder } from './sale-order';
import { Supplier } from '.';
import { PurchaseOrder } from './purchase-order';
import { Owner } from './owner';



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
  agent: string;
  employer: string;
  triggerDay: number;
  triggerDate: Date  = new Date();
  interventionDate: Date= new Date();
  maintenanceDate: Date= new Date();

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
}
