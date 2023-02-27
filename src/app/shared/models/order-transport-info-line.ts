import { OrderTransportInfoLineDocument } from './order-transport-info-line-document';
import { Account } from './account';
import { PaymentType } from './payment-method';
import { PaymentRule } from './payment-rule';
import { TurnStatus } from './turn-status';
import { OrderTransportType } from './order-transport-type';
import { OrderTransportInfo } from './order-transport-info';
import { AddressContactOrderTransportInfo } from './address-contact-order-transport-nfo';


export class OrderTransportInfoLine {
  id: number;

  orderTransportType :OrderTransportType ;
  addressContactDeliveryInfo :AddressContactOrderTransportInfo ;
  lineNumber: number;
  orderTransportInfo :OrderTransportInfo;
  account:Account;

  numberOfPalletEnlevement:number;
  weightEnlevement :number;
  capacityEnlevement : number;
  commentEnlevement : string ;
  paymentTypeEnlevement: PaymentType;
  contreBlEnlevement: Boolean=false;
  contreFactureEnlevement:Boolean= false;
  paymentAmountEnlevement:number;
  fileEnlevement:any[];


  numberOfPalletLivraison:number;
  weightLivraison :number;
  capacityLivraison : number;
  commentLivraison : string ;
  paymentTypeLivraison: PaymentType;
  contreBlLivraison: Boolean=false;
  contreFactureLivraison:Boolean= false;
  paymentAmountLivraison:number;

  fileLivraison:any[];


  turnStatus:TurnStatus;

  weightMaxEnlevement : number;
  weightMaxLivraison:number;

  orderTransportInfoLineDocuments:OrderTransportInfoLineDocument[]=[];

  type: string ;


}
