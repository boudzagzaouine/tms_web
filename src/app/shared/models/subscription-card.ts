import { SubscriptionCardType } from './subscription-card-type';
import { Owner } from './owner';


export class SubscriptionCard {

  id: number;
  code: string;
  description: string;
  subscriptionCardType :SubscriptionCardType;
  price : number; 
  owner:Owner ;
}
