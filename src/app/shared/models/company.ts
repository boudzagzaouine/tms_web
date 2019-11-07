import { Address } from './address';
//import { Owner } from '.';
export class Company {
    id: number;
    code: string;
    name: string;
    siret: string;
    vatNumber: string;
   // owner: Owner;
    address: Address;
    commonIdentifierOfCompany: string;
    fiscalIdentifier: string;
    professionalTax: string;
    tradeRegister: string;
    cnssNumber: string;
    creationDate = new Date();
    updateDate = new Date();



}
