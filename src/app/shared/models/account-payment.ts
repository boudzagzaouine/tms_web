import { Account, PaymentType, AccountInvoice, AccountAsset, Currency } from '.';

export class PaymentAccount {
    id: number;
    paymentDate: Date;
    creationDate: Date;
    amount: number;
    updateDate: Date;
    account: Account;
    paymentType: PaymentType;
    number: number; // Number Of payment type {cheque or traite or versement)
    accountInvoice: AccountInvoice;
    assetAccount: AccountAsset;
    currency: Currency;
    vat: number;
}
