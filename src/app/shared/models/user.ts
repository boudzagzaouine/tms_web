import { Driver } from './driver';
import { UserGroup } from './user-group';
import { SaleOrder } from './sale-order';
import { Owner } from './owner';
//import { Agency } from './agency';

export class User {
    id: number;
    code: string;
    password: string;
    name: string;
    surname: string;
    dateOfBirth: Date;
    tel: string;
    passportNumber: string;
    comment: string;
    email: string;
    active: boolean;
    isResponsible: boolean;
    owner: Owner;
    type: number;
    //agency: Agency;
    columns: string;
    saleOrders: SaleOrder[];
    userGroup: UserGroup;
    driver :Driver;

}
