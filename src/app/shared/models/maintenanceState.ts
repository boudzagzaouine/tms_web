import { User } from "./user";
import { TypeMaintenance } from "./typeMaintenance";
import { Vehicle } from "./vehicle";
export class MaintenanceState {
    id: number;
    vehicle: Vehicle;
    code: string;
    descriptif: string;
    date: Date;
    state: string;
    title: string;
    creationDate: Date;
    creationUser: User;
    upDateDate: Date;
    typeMaintenance: TypeMaintenance;
}