import { ActivityArea } from './activity-area';
import { Owner } from './owner';
import { Address } from './address';
//import { Owner } from '.';
export class Company {
    id: number;
    code: string;
    description:string;
    owner:Owner;
    name: string;
    siret: string;
    vatNumber: string;
   // owner: Owner;
    address: Address;
    commonIdentifierOfCompany: string; ////ice
    fiscalIdentifier: string; // IF
    professionalTax: string;
    tradeRegister: string;
    cnssNumber: string;
    threshold:number; //seuil
    turnover : number; //chiffre affr
    activityArea : ActivityArea;
    creationDate = new Date();
    updateDate = new Date();



}
