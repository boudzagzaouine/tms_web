import { RoadState } from "./roadState";
import { User } from "./user";
import { Address } from "./address";
import { Driver } from "./driver";
import { SaleOrder } from "./saleOrder";
import { Vehicle } from "./vehicle";

export class Road {
    id: number;
    code: string;
    duration: number;
    cost: number;
    distance: number;
    driver: Driver;
    adjunct: Driver;
    date: Date;
    state: RoadState;
    saleOrder: SaleOrder;
    stockAddresses: Array<Address>;
    vehicle: Vehicle;
    creationDate: Date;
    creationUser: User;
    upDateDate: Date;
}