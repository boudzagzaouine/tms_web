import type { ActionTypeRepair } from './action-type-repair';
import type { Owner } from './owner';


export class DurationType {

  code: string;

   owner :Owner;

   constructor(code ){
   this.code=code
   }
}
