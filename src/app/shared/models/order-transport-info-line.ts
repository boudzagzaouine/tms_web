import { OrderTransportType } from './order-transport-type';
import { OrderTransportInfo } from './order-transport-info';
import { AddressContactOrderTransportInfo } from './address-contact-order-transport-nfo';


export class OrderTransportInfoLine {
  id: number;

  orderTransportType :OrderTransportType ;
  addressContactDeliveryInfo :AddressContactOrderTransportInfo ;
  numberOfPalletEnlevement:number;
  weightEnlevement :number;
  capacityEnlevement : number;
  commentEnlevement : string ;
  numberOfPalletLivraison:number;
  weightLivraison :number;
  capacityLivraison : number;
  commentLivraison : string ;
  lineNumber: number;
  orderTransportInfo :OrderTransportInfo;



  weightMaxEnlevement : number;
  weightMaxLivraison:number;
}
