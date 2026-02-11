import type { TurnType } from './turn-Type';
import type { Ville } from './ville';
import type { Account } from './account';
import type { Company } from './company';
import type { Contact } from './contact';
import type { Address } from './address';
import type { Card } from './card';
import type { Owner } from './owner';
import type { Planning } from './planning';
import type { VehicleCategory } from './vehicle-category';
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
