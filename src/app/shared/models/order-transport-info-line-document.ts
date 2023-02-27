import { OrderTransportInfoLine } from './order-transport-info-line';
import { Account } from './account';
import { PaymentType } from './payment-method';
import { PaymentRule } from './payment-rule';
import { TurnStatus } from './turn-status';
import { OrderTransportType } from './order-transport-type';
import { OrderTransportInfo } from './order-transport-info';
import { AddressContactOrderTransportInfo } from './address-contact-order-transport-nfo';


export class OrderTransportInfoLineDocument {
  id: number;
   contreType :string ; // BL ou FACTURE
   type:number ; // 1 Enlevement . 2 Livraison . 3 Enlevement/Livraison
   numero:string="";
   file:any;
	  fileType:string;
	  fileName :string;
	  date :Date=new Date();
	  orderTransportInfoLine :OrderTransportInfoLine;

}
