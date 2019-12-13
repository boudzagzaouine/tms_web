import { MaintenanceLine } from './maintenance-line';
import { Vehicle } from './vehicle';
import { MaintenanceType } from './maintenance-type';
import { MaintenanceState } from './maintenance-state';


export class MaintenancePlan {

  id = 0;
  code: string;
  description: string;
  startDate: Date = new Date();
  endDate: Date = new Date();
  maintenanceType: MaintenanceType;
  maintenanceState: MaintenanceState;
  maintenanceLineList: MaintenanceLine [] = [];
  vehicle: Vehicle;
  mileage = 0.0;
  totalPrice = 0;

}
