import { Setting } from './../models/setting';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { WarehouseService } from './http/warehouse.service';
import { OrderTypeService } from './http/order-type.service';
import { OrderStatusService } from './http/order-status.service';
import { CurrencyService } from './http/currency.service';
import { AccountService } from './http/account.service';
import { AuthenticationService } from './http/authentication.service';
import {
    Owner,
    Currency,
    Account,
    OrderStatus,
    OrderType,
    Warehouse
} from '../models';

@Injectable()
export class GlobalService implements OnInit {
    private defaultOwner: Owner;
    private defaultCurrency: Currency;
    private completedOrderStatus: OrderStatus;
    private orderTypeSale: OrderType;
    private defaultWarehouse: Warehouse;
    private defaultAccount: Account;
    public showProductsPanel = true;
    constructor(
        private currencyService: CurrencyService,
        private orderStatusService: OrderStatusService,
        private orderTypeService: OrderTypeService,
        private warehouseService: WarehouseService,
        private accountService: AccountService,
        private authService: AuthenticationService,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.searchForDefaultOwner();
        this.searchForDefaultCurrency();
        this.searchForCompletedOrderStatus();
        this.searchForOrderTypeSale();
        this.searchDefaultWarehouse();
        this.retreiveDefaultAccount();

        this.http
            .get<Setting>('../../../assets/conf/config.json')
            .subscribe(data => console.log(data));
    }
    getDefaultAccount(): Account {
        return this.defaultAccount;
    }
    getDefaultOwner(): Owner {
        return this.defaultOwner;
    }
    getDefaultCurrency(): Currency {
        return this.defaultCurrency;
    }
    getCompletedOrderStatus(): OrderStatus {
        return this.completedOrderStatus;
    }
    getSaleOrderType(): OrderType {
        return this.orderTypeSale;
    }
    getDefaultWarehouse(): Warehouse {
        return this.defaultWarehouse;
    }

    private searchForDefaultOwner() {
        this.defaultOwner = this.authService.getCurrentUser().owner;
    }

    searchForDefaultCurrency() {
        this.currencyService.find('byDefault:true').subscribe(data => {
            console.log('default currency : ' + (data[0] as Currency).code);
            this.defaultCurrency = data[0] as Currency;
        });
    }

    searchForCompletedOrderStatus() {
        this.orderStatusService
            .findById(4)
            .subscribe(data => (this.completedOrderStatus = data));
    }

    searchForOrderTypeSale() {
        this.orderTypeService
            .findById(10012)
            .subscribe(data => (this.orderTypeSale = data));
    }

    searchDefaultWarehouse() {
        this.warehouseService
            .findById(10284)
            .subscribe(data => (this.defaultWarehouse = data));
    }

    retreiveDefaultAccount() {
        this.accountService.findById(1).subscribe(data => {
            this.defaultAccount = data;
            console.log('default account is : ' + data.code);
        });
    }

    logOut() {}
}
