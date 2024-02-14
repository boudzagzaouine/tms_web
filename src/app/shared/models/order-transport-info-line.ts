import { Address, Vat } from '.';
import { Contact } from './contact';
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
  //addressContactDeliveryInfo :AddressContactOrderTransportInfo ;
  address:Address;
  contact:Contact;
  lineNumber: number;
  orderTransportInfo :OrderTransportInfo;
  account:Account;
  numberOfPalletEnlevement:number=0;
  weightEnlevement :number=0;
  capacityEnlevement : number=0;
  commentEnlevement : string ;
  paymentTypeEnlevement: PaymentType;
  //contreBlEnlevement: Boolean=false;
  //contreFactureEnlevement:Boolean= false;
  paymentAmountEnlevement:number;
  dateEnlevement:Date = new Date();
  fileEnlevement:any[];


  numberOfPalletLivraison:number=0;
  weightLivraison :number=0;
  capacityLivraison : number=0;
  commentLivraison : string ;
  paymentTypeLivraison: PaymentType;
  //contreBlLivraison: Boolean=false;
  //contreFactureLivraison:Boolean= false;
  paymentAmountLivraison:number;
  dateLivraison:Date = new Date();
  fileLivraison:any[];


  turnStatus:TurnStatus;

  weightMaxEnlevement : number;
  weightMaxLivraison:number;

  orderTransportInfoLineDocuments:OrderTransportInfoLineDocument[]=[];

  type: string ;
  priceHT: number = 0;
  vat :Vat;
  priceTTC: number =0;



 dateArriver :Date;
 dateCommancerChargement:Date;
 dateCommancerDechargement:Date;
 dateFinDechargement:Date;
 dateFinChargement:Date;

}
