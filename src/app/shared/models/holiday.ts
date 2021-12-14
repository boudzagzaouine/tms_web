import { Owner } from './owner';


export class Holiday {

  id: number;
  code: string;
  description: string;
  account:Account;
  holidayDate:Date = new Date();
  holidayDay :string;
  holidayMonth:string;
  owner:Owner ;

}
