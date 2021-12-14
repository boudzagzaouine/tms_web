import { Supplier } from '.';
import { Owner } from './owner';


export class SupplierHoliday {

  id: number;
  description: string;
  supplier:Supplier;
  holidayDate:Date = new Date();
  owner:Owner ;

}
