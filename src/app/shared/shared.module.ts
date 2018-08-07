import { RoomService } from './services/http/room.service';
import { TableService } from './services/http/table.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LocalCurrencyPipe } from './pipes';
import { NumberDirective } from './directives';
import { AccountAssetService,
    AccountInvoiceService,
    AccountInvoiceLineService,
    AccountService,
    AuthenticationService,
    CardService,
    CashRegisterService,
    CheckoutService,
    CurrencyService,
    DeliveryService,
    DeliveryLineService,
    DeliveryMethodService,
    KitService,
    OrderStatusService,
    OwnerService,
    PaymentMethodService,
    ProductPackService,
    ProductService,
    ProductTypeService,
    ProxyService,
    SaleOrderLineService,
    SaleOrderService,
    UomService,
    UserService,
    WarehouseService,
    AdminService,
    PosService,
    PurchaseOrderService,
    PurchaseOrderLineService,
    SupplierService,
    PaymentAccountService,
    VatService,
    GlobalService,
    SaleOrderStockService,
    StockService,
    ContactService,
    OrderTypeService} from './services';
import { PaymentGuard } from './guard/payment-guard';


@NgModule({
    imports: [
        CommonModule
    ],

    declarations: [LocalCurrencyPipe, NumberDirective],
    exports: [
        LocalCurrencyPipe, NumberDirective
    ]

})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
          ngModule: SharedModule,
          providers: [
            AccountAssetService,
            AccountInvoiceService,
            AccountInvoiceLineService,
            AccountService,
            AuthenticationService,
            CardService,
            CashRegisterService,
            CheckoutService,
            CurrencyService,
            DeliveryService,
            DeliveryLineService,
            DeliveryMethodService,
            KitService,
            OrderStatusService,
            OwnerService,
            PaymentMethodService,
            ProductPackService,
            ProductService,
            ProductTypeService,
            ProxyService,
            SaleOrderLineService,
            SaleOrderService,
            UomService,
            UserService,
            WarehouseService,
            AdminService,
            PosService,
            PurchaseOrderService,
            PurchaseOrderLineService,
            SupplierService,
            StockService,
            ContactService,
            PaymentAccountService,
            VatService,
            GlobalService,
            SaleOrderStockService,
            OrderTypeService,
            TableService,
            RoomService,
            PaymentGuard,
        ]};
      }
 }
