import { Address } from './address';
import { Contact } from './contact';
import { Owner } from './owner';
import { Planning } from './planning';
import { Reception } from './reception';
import { SupplierInvoice } from './supplier-invoice';
export class Supplier {
    id: number;
    code: string;
    description: string;
    contact: Contact = new Contact();
    address: Address = new Address();
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

}
