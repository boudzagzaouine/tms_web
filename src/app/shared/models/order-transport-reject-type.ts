import { ActionTypeRepair } from './action-type-repair';
import { Owner } from './owner';


export class OrderTransportRejectType {

  id: number;
  code: string;
  description: string;
  type :number ;//1 = rejeter(prestataire) // 2=refus (voie) ;
   owner :Owner;
}
