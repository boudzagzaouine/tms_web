import { DriverService} from './http/driver.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    AccountService,
    AuthenticationService,
   /*DeliveryService,
    DeliveryLineService,
    ProductService,
    ProductTypeService,
    SaleOrderLineService,
    SaleOrderService,
    UserService,
    WarehouseService,
    AdminService,*/
} from '.';


@NgModule({
    imports: [CommonModule],
    providers: [
        AccountService,
        DriverService,
        AuthenticationService,
       /* CheckoutService,
        CurrencyService,
        DeliveryService,
        DeliveryLineService,
        ProductService,
        SaleOrderLineService,
        WarehouseService,
        AdminService,
        StockService,
        ContactService,
        OrderTypeService*/
    ]
})
export class ServicesModule {}
