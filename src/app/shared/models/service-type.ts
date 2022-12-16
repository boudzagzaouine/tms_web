import { ActionTypeRepair } from './action-type-repair';
import { Owner } from './owner';


export class ServiceType {

  id: number;
  code: string;
  description: string;
  owner :Owner;
}
