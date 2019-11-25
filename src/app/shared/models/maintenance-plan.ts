import { Vehicle } from './vehicle';
import { MaintenanceType } from './maintenance-type';
import { MaintenanceState } from './maintenance-state';


export class MaintenancePlan {

  id: number;
  code: string;
  description: string;
  begin: Date=new Date();
  end: Date = new Date();
  maintenanceType: MaintenanceType;
  maintenanceState: MaintenanceState;
  vehicle: Vehicle;

}
