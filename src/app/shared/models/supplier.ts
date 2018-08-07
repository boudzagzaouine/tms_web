import { Reception } from './reception';
import { SupplierInvoice } from './supplier-invoice';
export class Supplier {
    id: number;
    code: string;
    description: string;
    contactName: string;
    tel: string;
    email;
    addressLine1: string;
    addressLine2: string;
    zipCode: string;
    city: string;
    country: string;
    creationDate: Date;
    updateDate: Date;
    invoice: SupplierInvoice[];
    receptions: Reception[];
}
