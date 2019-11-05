import {PaymentAccount} from './account-payment';
import {SaleOrder} from './sale-order';

export class PaymentAccountSaleOrder {
    id = 0;
    paymentAccount: PaymentAccount;
    amount: number;

    constructor(private saleOrder: SaleOrder) {
    }
}
