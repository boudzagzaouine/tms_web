import {AccountInvoice} from './account-invoice';
import {PaymentAccount} from './account-payment';

export class PaymentAccountInvoice {
    id = 0;
    paymentAccount: PaymentAccount;
    amount: number;

    constructor(private accountInvoice: AccountInvoice) {
    }
}
