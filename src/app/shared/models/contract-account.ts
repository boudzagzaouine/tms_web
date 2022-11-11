import { TurnType } from './turn-Type';
import { Ville } from './ville';
import { Account } from './account';
import { Company } from './company';
import { Contact } from './contact';
import { Address } from './address';
import { Card } from './card';
import { Owner } from './owner';
import { Planning } from './planning';
import { VehicleCategory } from './vehicle-category';
export class ContractAccount {

    id: number;
    code :string;
    date :Date =new Date();
    account:Account;
    contractType : String;
    vehicleCategory : VehicleCategory;
    quantity : number;

    source :Ville;
    distination :Ville;

    senderAddress : Address;
    receiverAdresse :Address;

    startDate :Date =new Date();
    endDate:Date =new Date();
    price :number ;
    packageType : String;

  turnType :TurnType;


}
