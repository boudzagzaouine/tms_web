import { PaymentRule } from './payment-rule';
import { TurnStatus } from './turn-status';
import { OrderTransportType } from './order-transport-type';
import { OrderTransportInfo } from './order-transport-info';
import { AddressContactOrderTransportInfo } from './address-contact-order-transport-nfo';


export class OrderTransportInfoLineType {
  id: number;

  //orderTransportInfoLine :OrderTransportInfoLine ;

  numberOfPallet:number;
  weight :number;
  capacity : number;
  comment : string ;
  paymentRuleEnlevement :PaymentRule;
  lineNumber: number;
  turnStatus:TurnStatus;




}
