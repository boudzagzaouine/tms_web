import type { SupplierProduct } from './supplier-product';

import type { SupplierType } from './supplier-type';
import type { Address } from './address';
import type { Contact } from './contact';
import type { Owner } from './owner';
import type { Planning } from './planning';
import type { Reception } from './reception';
import type { SupplierInvoice } from './supplier-invoice';
export class Supplier {
    id: number;
    code: string;
    description: string;
    contact: Contact;
    address: Address;
    creationDate: Date;
    updateDate: Date;
    invoice: SupplierInvoice[];
    receptions: Reception[];
    owner: Owner;
    active: boolean;
    charge: boolean;
    balance: number;
    commonIdentifierOfCompany: string;
    fiscalIdentifier: string;
    professionalTax: string;
    tradeRegister: string;
    cnssNumber: string;
    company: string;
    plannings :Planning[]=[];
    supplierProducts:SupplierProduct[]=[];
    supplierType:SupplierType;

}
