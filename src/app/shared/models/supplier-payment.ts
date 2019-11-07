import { SupplierInvoice } from './supplier-invoice';
import { PaymentStatus } from './payment-status';
import { PurchaseOrder } from './purchase-order';
import { Supplier } from './supplier';
//import { Vat, PaymentType } from '.';
import { Currency } from './currency';
//import { CashRegister } from './cash-register';
export class SupplierPayment {
    id: number;
    paymentDate: Date;
    number: string;
    creationDate: Date;
    updateDate: Date;
    amount: number;
    vat: number;
    supplier: Supplier;
 //   paymentType: PaymentType;
    currency: Currency;
    purshaseOrders: PurchaseOrder[] = [];
    supplierInvoices: SupplierInvoice[] = [];
    paymentStatus: PaymentStatus;
   // box: CashRegister;

}
