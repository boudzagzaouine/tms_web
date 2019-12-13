import { MaintenanceLine } from './maintenance-line';
import { Vehicle } from './vehicle';
import { MaintenanceType } from './maintenance-type';
import { MaintenanceState } from './maintenance-state';


export class MaintenancePlan {

  id = 0;
  code: string;
  description: string;
  begin: Date = new Date();
  end: Date = new Date();
  maintenanceType: MaintenanceType;
  maintenanceState: MaintenanceState;
  maintenanceLineList: MaintenanceLine [] = [];
  vehicle: Vehicle;
  price = 0;

}
