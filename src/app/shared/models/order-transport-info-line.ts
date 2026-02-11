import type { Address } from './address';
import type { Vat } from './vat';
import type { Contact } from './contact';
import type { OrderTransportInfoLineDocument } from './order-transport-info-line-document';
import type { Account } from './account';
import type { PaymentType } from './payment-method';
import type { PaymentRule } from './payment-rule';
import type { TurnStatus } from './turn-status';
import type { OrderTransportType } from './order-transport-type';
import type { OrderTransportInfo } from './order-transport-info';
import type { AddressContactOrderTransportInfo } from './address-contact-order-transport-nfo';


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

  date : Date ;//local



 dateArriver :Date;
 dateCommancerChargement:Date;
 dateCommancerDechargement:Date;
 dateFinDechargement:Date;
 dateFinChargement:Date;
 closeDate:Date;

}
