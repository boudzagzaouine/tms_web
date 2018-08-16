import { MaintenanceState } from "./maintenanceState";
import { TypeMaintenance } from "./typeMaintenance";
import { User } from "./user";

export class MaintenancePlan {
    id: number;
    vehicle: Vehicle;
    code: string;
    descriptif: string;
    date: Date;
    state: MaintenanceState;
    title: string;
    creationDate: Date;
    creationUser: User;
    upDateDate: Date;
    typeMaintenance: TypeMaintenance;
}