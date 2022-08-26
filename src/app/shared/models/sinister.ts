import { Supplier } from '.';
import { SinisterType } from './sinister-type';
import { Driver } from './driver';
import { Vehicle } from './vehicle';
import { ActionTypeRepair } from './action-type-repair';
import { Owner } from './owner';


export class Sinister {

  id: number;
  code: string;
  description: string;
  vehicle:Vehicle;
  driver:Driver;
  sinisterType:SinisterType;
  date:Date = new Date();
  venue:String ;
  supplier:Supplier;
  repayment :number;
  owner :Owner;
}
