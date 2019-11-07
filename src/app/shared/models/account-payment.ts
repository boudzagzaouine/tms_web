import { PaymentStatus } from './payment-status';
import { PaymentType } from './payment-method';
import { AccountAsset } from './account-asset';
import { Currency } from './currency';
import { AccountInvoice } from './account-invoice';
import { Account } from './account';
import { SaleOrder } from './sale-order';
import { PaymentAccountInvoice } from './payment-account-invoice';
import { PaymentAccountSaleOrder } from './payment-account-sale-order';
//import { CashRegister } from './cash-register';

export class PaymentAccount {
    id: number;
    paymentDate: Date;
    creationDate: Date;
    amount: number;
    updateDate: Date;
    account: Account;
    paymentType: PaymentType;
    number: number; //  Number Of payment type {cheque or traite or versement)
    assetAccount: AccountAsset;
    currency: Currency;
    vat: number;
    accountInvoices: AccountInvoice[] = [];
    saleOrders: SaleOrder[] = [];
    paymentStatus: PaymentStatus;
    deadLine: Date;
    paymentAccountInvoices: PaymentAccountInvoice[] = [];
    paymentAccountSaleOrders: PaymentAccountSaleOrder[] = [];
  //  box: CashRegister;
    chequeBanK: string;
    chequeOwner: string;
    chequeAmount: number;
    chequeOwnerRib: string;
    chequeBankCity: string;
}
