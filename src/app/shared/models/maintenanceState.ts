import { User } from "./user";
import { TypeMaintenance } from "./typeMaintenance";
import { Vehicle } from "./vehicle";
export class MaintenanceState {
    id: number;
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
