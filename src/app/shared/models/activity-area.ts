import type { ActionTypeRepair } from './action-type-repair';
import type { Owner } from './owner';


export class ActivityArea {

  id: number;
  code: string;
  description: string;
  owner :Owner;
}
