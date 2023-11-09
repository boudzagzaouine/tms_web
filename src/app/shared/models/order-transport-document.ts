import { OrderTransportInfoLineDocument } from './order-transport-info-line-document';
import { OrderTransportDocumentType } from './order-transport-document-type';
import { OrderTransportInfoLine } from './order-transport-info-line';
import { Account } from './account';
import { PaymentType } from './payment-method';
import { PaymentRule } from './payment-rule';
import { TurnStatus } from './turn-status';
import { OrderTransportType } from './order-transport-type';
import { OrderTransportInfo } from './order-transport-info';
import { AddressContactOrderTransportInfo } from './address-contact-order-transport-nfo';


export class OrderTransportDocument {
	id: number;
	file: any;
	fileType: string;
	fileName: string;
	filePath: string;
	orderTransportInfoLineDocument: OrderTransportInfoLineDocument;

}
