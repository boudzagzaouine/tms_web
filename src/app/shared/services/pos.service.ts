import { SaleOrderValidation } from './../utils/sale-order-validation';
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/Subject';
import {
    Account,
    CashRegister,
    Product,
    SaleOrder,
    SaleOrderLine
} from '../models';
import { PaymentAccount } from './../models/account-payment';
import {
    POS_INIT_AMOUNT_STORAGE,
    POS_ORDERS_Of_TODAY,
    POS_SELECTED_SALE_ORDER
} from './../utils/constants';
import { GlobalService } from './global.service';
import {
    AccountInvoiceService,
    DeliveryService,
    PaymentAccountService,
    ProductPackService
} from './http';
import { SaleOrderStockService } from './http/sale-order-stock.service';
import { SaleOrderService } from './http/sale-order.service';

@Injectable()
export class PosService implements OnInit {
    private selectedPos: CashRegister;
    private todaySaleOrders: SaleOrder[] = [];
    private heldSaleOrder: SaleOrder;
    private selectedSaleOrder: SaleOrder = new SaleOrder();
    private selectedPaymentAccount = new PaymentAccount();

    private posInitialized = false;
    private todayTotalTTC = 0;

    public isWithInvoice = false;
    public iswithVat = true;
    public selectedSaleOrderChanged = new Subject<SaleOrder>();
    public itemsCountChanged = new Subject<number>();
    public TodaySaleOrdersChanged = new Subject<SaleOrder[]>();
    public todayTotalTTCChanged = new Subject<number>();
    public SaleOrerHoldChanged = new Subject<number>();
    public selectedPosChanged = new Subject<CashRegister>();
    public isWithInvoiceChanged = new Subject<boolean>();
    public isWithVatChanged = new Subject<boolean>();

    constructor(
        private saleOrderService: SaleOrderService,
        private deliveryService: DeliveryService,
        private paymentAccountService: PaymentAccountService,
        private accountInvoiceService: AccountInvoiceService,
        private saleOrderStockService: SaleOrderStockService,
        private globalService: GlobalService,
        private productPackService: ProductPackService,
        private toastr: ToastrService,
        private router: Router
    ) {
        this.selectedPos = new CashRegister();
    }

    ngOnInit() {
        this.selectedSaleOrder.account = this.globalService.getDefaultAccount();
    }

    private emitChanges() {
        // this.calculateTotals();
        console.log(
            'selected saleOrder ' + this.selectedSaleOrder.totalPriceTTC
        );

        this.selectedSaleOrderChanged.next(this.selectedSaleOrder);
        this.itemsCountChanged.next(this.selectedSaleOrder.lines.length);
        this.TodaySaleOrdersChanged.next(this.todaySaleOrders);
        this.selectedPosChanged.next(this.selectedPos);
        this.isWithInvoiceChanged.next(this.isWithInvoice);
        this.isWithVatChanged.next(this.iswithVat);

        localStorage.setItem(
            POS_SELECTED_SALE_ORDER,
            JSON.stringify(this.selectedSaleOrder)
        );
        localStorage.setItem(
            POS_ORDERS_Of_TODAY,
            JSON.stringify(this.todaySaleOrders)
        );
    }

    isPosdInitialized(): boolean {
        if (localStorage.getItem(POS_INIT_AMOUNT_STORAGE) != null) {
            this.posInitialized = true;
            this.initPos(JSON.parse(
                localStorage.getItem(POS_INIT_AMOUNT_STORAGE)
            ) as number);
        }

        console.log(
            'POS_INIT_AMOUNT_STORAGE : ' +
                localStorage.getItem(POS_INIT_AMOUNT_STORAGE)
        );

        return this.posInitialized;
    }

    getSaleOrderLines() {
        console.log(this.selectedSaleOrder.lines.length);

        return this.selectedSaleOrder.lines;
    }

    // add a saleOrderLine
    // search for the product on saleOrderLines
    // if new add the product as new line
    // if exisant increment quantity and recalculate the prices
    addSaleOdrerLine(product: Product) {
        console.log(
            'stock quantity : ' + product.code + ' -> ' + product.stockQuantity
        );

        // check if the saleOrderLine already exists in the list,
        // if so just increment its quantity, else add new line to the list

        if (!product.active || product.outOfStock) {
            this.toastr.error('produit out of stock', 'Produit');
            return;
        }

        const index = this.selectedSaleOrder.lines.findIndex(
            line => line.product.code === product.code
        );
        console.log('vat : ' + product.vat);
        if (index > -1) {
            // existant line
            const line = this.selectedSaleOrder.lines[index];
            if (line.discount == null) {
                line.discount = 0.0;
            }
            line.quantity += 1;
            const priceHT =
            line.product.salePriceUB *
            line.quantity;
            const discount =
                (priceHT * line.discount) / 100;
            const totalPriceHT = priceHT - discount;
            const vat =
                (totalPriceHT * line.vat.value) /
                100;

            const totalPriceTTC = totalPriceHT + vat;
            line.totalPriceHT = totalPriceHT;
            line.totalPriceTTC = totalPriceTTC;

            console.log(
                'total: ' + this.selectedSaleOrder.lines[index].totalPriceTTC
            );
        } else {
            // new Line
            const saleOrderLine = new SaleOrderLine();
            this.productPackService
                .find('uom.id:' + product.uomByProductUomSale.id)
                .subscribe(data => {
                    console.log('looking forproduct Pack .....');
                    if (data.length) {
                        console.log('product Pack : + ' + data[0].id);
                        saleOrderLine.productPack = data[0];
                    }
                    saleOrderLine.product = product;
                    saleOrderLine.totalPriceHT = product.salePriceUB;
                    saleOrderLine.uom = product.uomByProductUomSale;

                    saleOrderLine.quantity = 1;
                    if (!isNaN(product.vat.value)) {
                        saleOrderLine.totalPriceTTC =
                            saleOrderLine.totalPriceHT +
                            (product.vat.value * saleOrderLine.totalPriceHT) /
                                100;
                        console.log('entered here ' + 1);
                        console.log(
                            'entered here ttc' + saleOrderLine.totalPriceTTC
                        );
                    } else {
                        saleOrderLine.totalPriceTTC =
                            saleOrderLine.totalPriceHT;
                        console.log('entered here ' + 2);
                    }
                    saleOrderLine.vat = product.vat;
                    // saleOrderLine.discount = product.discount;
                    this.selectedSaleOrder.lines.push(saleOrderLine);
                    this.calculateTotals();
                    this.emitChanges();
                });
        }

        this.calculateTotals();
        this.emitChanges();
        this.toastr.success('Product was successfully added', 'Added');
    }

    // delete a saleOrderLine
    deleteSaleOrderLine(saleOrderLine: SaleOrderLine) {
        this.selectedSaleOrder.lines.splice(
            this.selectedSaleOrder.lines.indexOf(saleOrderLine),
            1
        );
        this.calculateTotals();
        this.emitChanges();
        this.toastr.success('line was deleted successfully', 'delete');
    }

    // update a saleOrderLine
    updateSaleOrderLine(saleOrderLine: SaleOrderLine) {
        const index = this.selectedSaleOrder.lines.findIndex(
            line => line.product.code === saleOrderLine.product.code
        );
        if (index > -1) {
            this.selectedSaleOrder.lines[index].quantity +=
                saleOrderLine.quantity;
        }
        this.calculateTotals();
        this.emitChanges();
    }

    calculateTotals(): void {
        console.log('calculating totals ....' + this.selectedSaleOrder.lines);
        console.log(
            'this.selectedSaleOrder.discount ' + this.selectedSaleOrder.discount
        );
        this.selectedSaleOrder.totalPriceHT = 0.0;
        this.selectedSaleOrder.vat = 0.0;
        this.selectedSaleOrder.totalPriceTTC = 0.0;

        for (const line of this.selectedSaleOrder.lines) {
            this.selectedSaleOrder.totalPriceHT += line.totalPriceHT;
            console.log(line);
            if (isNaN(line.vat.value)) {
                line.vat.value = 0;
            }
            this.selectedSaleOrder.vat +=
                (line.vat.value * line.totalPriceHT) / 100;
            console.log('tva : ' + line.vat.value);
            console.log('ht : ' + line.totalPriceHT);
            console.log('ttc : ' + line.totalPriceTTC);
            this.selectedSaleOrder.totalPriceTTC += line.totalPriceTTC;
        }

        console.log('this.selectedSaleOrder.vat ' + this.selectedSaleOrder.vat);
        console.log(
            'this.selectedSaleOrder.discount ' + this.selectedSaleOrder.discount
        );
        console.log(
            'total saleOrder TTC' + this.selectedSaleOrder.totalPriceTTC
        );
    }

    getSelectedPos() {
        return this.selectedPos;
    }

    getItemsCount() {
        return this.selectedSaleOrder.lines.length;
    }

    getTodayTotalTTC() {
        return this.todayTotalTTC;
    }

    resetOrder() {
        this.selectedSaleOrder = new SaleOrder();
        this.emitChanges();
    }

    getSelectedSaleOrder() {
        return this.selectedSaleOrder;
    }
    getSaleOrderInHold() {
        return this.heldSaleOrder;
    }

    getSelectedPayementAccount() {
        return this.selectedPaymentAccount;
    }
    setSelectedPayementAccount(paymentAccount: PaymentAccount) {
        this.selectedPaymentAccount = paymentAccount;
    }

    // pass the selectedSaleOrder to held state
    holdSaleOrder() {
        this.heldSaleOrder = this.selectedSaleOrder;
        this.resetOrder();
        this.SaleOrerHoldChanged.next(1);
    }

    // restore the heldSaleOrder to be the selectedSaleOrder
    restoreHeldSaleOrder() {
        this.selectedSaleOrder = this.heldSaleOrder;
        this.heldSaleOrder = null;
        this.SaleOrerHoldChanged.next(0);
        this.calculateTotals();
        this.emitChanges();
    }

    validateSaleOrder(validtionType: SaleOrderValidation) {
        console.log('here is the account');
        console.log(this.globalService.getDefaultAccount());
        if (!this.selectedSaleOrder.account) {
            this.selectedSaleOrder.account = this.globalService.getDefaultAccount();
        }
        if (!this.selectedPaymentAccount.account) {
            this.selectedPaymentAccount.account = this.globalService.getDefaultAccount();
        }
        this.selectedSaleOrder.deliveryAddress = this.selectedSaleOrder.account.deliveryAddress;
        let lineNumber = 0;

        this.saleOrderService.generateCode().subscribe(code => {
            this.selectedSaleOrder.code = code;
            this.selectedSaleOrder.accounted = this.isWithInvoice;
            this.selectedSaleOrder.warehouse = this.globalService.getDefaultWarehouse();
            this.selectedSaleOrder.owner = this.globalService.getDefaultOwner();
            this.selectedSaleOrder.currency = this.globalService.getDefaultCurrency();
            this.selectedSaleOrder.orderStatus = this.globalService.getCompletedOrderStatus();
            this.selectedSaleOrder.orderType = this.globalService.getSaleOrderType();
            this.selectedSaleOrder.lines.forEach(line => {
                line.lineNumber = lineNumber + 1000;
                line.orderStatus = this.globalService.getCompletedOrderStatus();
                lineNumber += 1000;
            });

            if (validtionType === SaleOrderValidation.COMPLET) {
               return this.ValidateSaleOrderComplet();
            } else if (validtionType === SaleOrderValidation.SIMPLE) {
                return this.validateSaleOrderOnly();
            } else if (validtionType === SaleOrderValidation.DIFFERED_DELIVERY) {
                return this.validateSaleOrderWithDifferedDelivery();
            } else if (validtionType === SaleOrderValidation.INSTANT_DELIVERY) {
                return this.validateSaleOrderWithInstantDelivery();
            }
        });
        console.log('return true from global validateSaleOrder');
        return true;
    }
    validateSaleOrderWithDifferedDelivery() {
        this.saleOrderService.add(this.selectedSaleOrder).subscribe(
            saleOrder => {
                this.paymentAccountService
                    .add(this.selectedPaymentAccount)
                    .subscribe(pa => {
                        this.toastr.success(
                            'Order validé avec succés',
                            'Validation'
                        );
                        this.todayTotalTTC += this.selectedSaleOrder.totalPriceTTC;
                        this.router.navigate(['/pos']);
                        this.emitChanges();
                        this.resetOrder();
                        console.log('validate sale 1');
                        return true;
                    });
            },
            error => {
                this.toastr.error(
                    'Erreur de validation du paiement',
                    'Validation'
                );
                console.log(error);
                return false;
            }
        );
        this.emitChanges();
        console.log('validate sale 3');
        return true;
    }

    validateSaleOrderOnly() {
        this.saleOrderService.add(this.selectedSaleOrder).subscribe(
            saleOrder => {
                this.toastr.success('Ordre validé avec succés', 'Validation');
                this.todayTotalTTC += this.selectedSaleOrder.totalPriceTTC;
                this.router.navigate(['/pos']);
                this.emitChanges();
                this.resetOrder();
                console.log('after saving saleOrder');
                return true;
            },
            error => {
                this.toastr.error('Erreur de validation d\'ordre', 'Validation');
                console.log(error);
                return false;
            }
        );
        this.emitChanges();
        return true;
    }
    validateSaleOrderWithInstantDelivery(): boolean {
        this.saleOrderService.add(this.selectedSaleOrder).subscribe(
            saleOrder => {
                this.deliveryService
                    .generateDeliveryFromSaleOrder(saleOrder)
                    .subscribe(dlv => {
                        this.toastr.success(
                            'Order validé avec succés',
                            'Validation'
                        );
                    });
                this.todayTotalTTC += this.selectedSaleOrder.totalPriceTTC;
                this.router.navigate(['/pos']);
                this.emitChanges();
                this.resetOrder();
                return true;
            },
            error => {
                this.toastr.error('Erreur de validation d\'ordre', 'Validation');
                console.log(error);
                return false;
            }
        );
        this.emitChanges();
        return true;
    }

    // validate SaleOrder after checkout
    ValidateSaleOrderComplet(): boolean {
        // Validation Order :
        // SaleOrder -> Accountpayment -> Delivery -> [AccountInvoice] -> (stockout: create SalOrderStock)
        // order created after payment is saved.
        // this.selectedSaleOrder.user = this.authService.getCurrentUser();
        this.saleOrderService.add(this.selectedSaleOrder).subscribe(
            saleOrder => {
                this.paymentAccountService
                    .add(this.selectedPaymentAccount)
                    .subscribe(
                        pa => {
                            this.deliveryService
                                .generateDeliveryFromSaleOrder(saleOrder)
                                .subscribe(dlv => {
                                    if (this.isWithInvoice) {
                                        this.accountInvoiceService
                                            .generateAccountInvocieFromSaleOrder(
                                                this.selectedSaleOrder
                                            )
                                            .subscribe(inv => {
                                                this.saleOrderStockService.deliver(
                                                    dlv
                                                );
                                                this.toastr.success(
                                                    'Order validé avec succés',
                                                    'Validation'
                                                );
                                            });
                                        this.todaySaleOrders.unshift(
                                            this.selectedSaleOrder
                                        );
                                    } else {
                                        this.saleOrderStockService.deliver(dlv);
                                        this.toastr.success(
                                            'Order validé avec succés',
                                            'Validation'
                                        );
                                        this.todaySaleOrders.unshift(
                                            this.selectedSaleOrder
                                        );
                                    }

                                    this.todayTotalTTC += this.selectedSaleOrder.totalPriceTTC;
                                    this.router.navigate(['/pos']);
                                    this.emitChanges();
                                    this.resetOrder();
                                    return true;
                                });
                        },
                        err => {
                            this.toastr.error(
                                'Erreur de validation du paiement',
                                'Validation'
                            );
                            console.log(err);

                            return false;
                        }
                    );
            },
            err => {
                this.toastr.error(
                    'Erreur de validation de l\'ordre',
                    'Validation'
                );
                console.log(err);
                return false;
            }
        );

        this.emitChanges();
        return true;
    }

    getTodaySaleOrders() {
        return this.todaySaleOrders;
    }

    appendAccount(account: Account) {
        console.log('account  : ' + account);
        this.selectedSaleOrder.account = account;
        this.selectedSaleOrder.deliveryAddress = account.deliveryAddress;
        this.selectedPaymentAccount.account = account;
    }

    initPos(amount: number) {
        this.resetAll();
        this.selectedPos.initAmount = amount;
        this.selectedPos.initDate = new Date();
        console.log(this.selectedPos);

        this.emitChanges();
        console.log('pos initialized ? : ' + this.posInitialized);
        localStorage.removeItem(POS_INIT_AMOUNT_STORAGE);
        localStorage.setItem(POS_INIT_AMOUNT_STORAGE, JSON.stringify(amount));
    }

    closePos() {
        this.selectedPos.flashDate = new Date();
        this.selectedPos.flashAmount = this.selectedSaleOrder.totalPriceTTC;
        this.posInitialized = false;
        this.resetAll();
        this.globalService.logOut();
    }

    resetAll() {
        this.selectedSaleOrder = new SaleOrder();
        this.heldSaleOrder = new SaleOrder();
        this.selectedSaleOrder.account = this.globalService.getDefaultAccount();
        this.selectedPaymentAccount = new PaymentAccount();
        this.todaySaleOrders.slice();
    }

    applyDiscount(discount: number) {
        this.selectedSaleOrder.totalPriceHT = 0.0;
        this.selectedSaleOrder.totalPriceTTC = 0.0;
        this.selectedSaleOrder.vat = 0.0;
        for (const line of this.selectedSaleOrder.lines) {
            const lineDiscount = (line.totalPriceHT * discount) / 100;
            const priceHTWithDiscount = line.totalPriceHT - lineDiscount;
            const vat = (priceHTWithDiscount * line.vat.value) / 100;
            const priceTTCWithVat = priceHTWithDiscount + vat;
            this.selectedSaleOrder.totalPriceHT += priceHTWithDiscount;
            this.selectedSaleOrder.vat += vat;
            this.selectedSaleOrder.totalPriceTTC += priceTTCWithVat;

            console.log('tva : ' + line.vat.value);
            console.log('ht : ' + line.totalPriceHT);
            console.log('ttc : ' + line.totalPriceTTC);
        }

        this.selectedSaleOrder.discount = discount;
        console.log(
            'this.selectedSaleOrder.discount before emit' +
                this.selectedSaleOrder.discount
        );
        this.emitChanges();
    }

    resetSaleOrderDiscount() {
        this.selectedSaleOrder.discount = 0.0;
        this.calculateTotals();
        this.emitChanges();
    }

    refresh() {
        this.calculateTotals();
        this.emitChanges();
    }
}
