import { Currency } from './currency';
import { PaymentType } from './payment-method';
import { Owner } from './owner';
import { Warehouse } from './warehouse';
import { Supplier } from './supplier';
import { PurchaseOrder } from './purchase-order';
import { SupplierInvoiceLine } from './supplier-invoice-line';
export class SupplierInvoice {
     id: number;
     code: string;
     creationDate: Date;
     updateDate: Date;
    supplier: Supplier;
     totalPriceHT: number;
     totalPriceTTC: number;
     discount: number;
     vat: number;
     deadLine: Date;
     //  invoiceStatus: InvoiceStatus;
     purshaseOrder: PurchaseOrder;
     warehouse: Warehouse;
     owner: Owner;
     amountPayed = 0;
     currency: Currency;
     paymentType: PaymentType;
     active: boolean;

    supplierInvoiceLines: SupplierInvoiceLine[];
}
