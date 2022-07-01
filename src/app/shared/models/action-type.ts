import { ActionTypeRepair } from './action-type-repair';
import { Owner } from './owner';


export class ActionType {

  id: number;
  code: string;
  description: string;
  actionTypeRepairs:ActionTypeRepair[]=[];
   owner :Owner;
}
