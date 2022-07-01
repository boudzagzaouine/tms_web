import { Day } from './day';
import { Supplier } from ".";
import { Account } from "./account";
import { Owner } from "./owner";


export class Planning {

  id: number;

    day:Day ;
    morning:string;
    morningTimeStart:Date= new Date();
    morningTimeEnd:Date= new Date();
    evering : string;
    everingTimeStart : Date=new Date();
    everingTimeEnd :Date = new Date();
    owner:Owner;

    account: Account;
    supplier: Supplier;
    closingDay:Boolean=false;
}
