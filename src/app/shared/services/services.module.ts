import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    AccountService,
    DriverService,
    ZoneService,
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
        ZoneService,
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
