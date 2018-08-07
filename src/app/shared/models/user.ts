import { SaleOrder } from './sale-order';
import { Owner } from './owner';

export class User {
    id: number;
    code: string;
    password: string;
    name: string;
    surName: string;
    dateOfBirth: Date;
    tel: string;
    passportNumber: string;
    comment: string;
    email: string;
    isActive: boolean;
    isResponsible: boolean;
    owner: Owner;
    type: number;
    agencies: any;
    columns: string;
    userGroup: any;
}
