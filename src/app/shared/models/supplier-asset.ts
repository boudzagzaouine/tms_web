import { PurchaseOrder } from './purchase-order';
import { Currency } from '.';

export class SupplierAsset {
    id: number;
    code: string;
    amount: number;
    expirationDate: Date;
    sUsed: boolean;
    creationDate: Date;
    updateDate: Date;
    currency: Currency;
    purchaseOrder: PurchaseOrder;

}
