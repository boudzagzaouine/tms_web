import { Supplier } from '.';
import { Owner } from './owner';


export class ActionTypeRepair {

  id: number;
  repairType:string;
  workshop:String;
  supplier: Supplier;
  city :String
  price: number;
  duration: number;
  durationType :string;
  owner :Owner;
}
