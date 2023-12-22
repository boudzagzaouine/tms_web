import { OrderTransportInfoLineDocument } from './order-transport-info-line-document';


export class OrderTransportDocument {
	id: number;
	file: any;
	fileType: string;
	fileName: string;
	filePath: string;
	orderTransportInfoLineDocument: OrderTransportInfoLineDocument;

}
