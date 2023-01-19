import { TransportAccountServiceService } from './services/api/transport-account-service.service';
import { TransportServiceService } from './services/api/transport-service.service';
import { AccountServiceService } from './services/api/account-service.service';
import { CatalogServiceService } from './services/api/catalog-service.service';
import { CatalogPricingImportService } from './services/api/catalog-pricing-import.service';
import { ContactFunctionService } from './services/api/contact-function.service';
import { OrderTransportRejectTypeService } from './services/api/order-transport-reject-type.service';
import { TransportPlanHistoryService } from './services/api/transport-plan-history.service';
import { BrandVehicleTypeService } from './services/api/brand-vehicle-type.service';
import { CatalogTransportAccountPricingService } from './services/api/catalog-transport-account-pricing.service';
import { CatalogTransportPricingService } from './services/api/catalog-transport-pricing.service';
import { VehicleTrayService } from './services/api/vehicle-tray.service';
import { LoadingTypeService } from './services/api/loading-type.service';
import { CatalogPricingService } from './services/api/catalog-pricing.service';
import { AddressDeliveryService } from './services/api/AddressDeliveryService.service';
import { ActivityAreaService } from './services/api/activity-area.service';
import { TransportProductService } from './services/api/transport-product.service';
import { ServiceTypeService } from './services/api/service-type.service';
import { PaymentTypeService } from './services/api/payment-type.service';
import { AccountPricingService } from './services/api/account-pricing.service';
import { OrderTransportTypeService } from './services/api/order-transport-type.service';
import { TransportPlanService } from './services/api/transport-plan.service';
import { TransportPlan } from './models/transport-plan';
import { OrderTransportInfoService } from './services/api/order-transport-info.service';
import { OrderTransportService } from './services/api/order-transport.service';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TreeTableModule } from 'primeng/treetable';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PickListModule } from 'primeng/picklist';
import { PaysService } from './services/api/pays.service';
import { VilleService } from './services/api/ville.service';
import { PackagingTypeService } from './services/api/packaging-type.service';
import { ContainerTypeService } from './services/api/container-type.service';
import { TurnStatusService } from './services/api/turn-status.service';
import { SubscriptionCardTypeService } from './services/api/subscription-card-type.service';
import { DocumentTypeService } from './services/api/document-type.service';
import { SupplierInvoiceReceptionService } from './services/api/supplier-invoice-reception.service';
import { SupplierInvoiceReception } from './models/supplier-invoice-reception';
import { SupplierInvoiceLineService } from './services/api/supplier-invoice-line.service copy';
import { SupplierInvoiceService } from './services/api/supplier-invoice.service';
import { SinisterService } from './services/api/sinister.service';
import { SinisterTypeService } from './services/api/sinister-type.service';
import { SupplierProductService } from './services/api/supplier-product.service';
import { ContactService } from './services/api/contact.service';
import { ContractAccountService } from './services/api/contract-account.service';
import { CompanyService } from './services/api/company.service';
import { Company } from './models/company';
import { SupplierTypeService } from './services/api/supplier-type.service';
import { MaintenanceStockService } from './services/api/maintenance-stock.service';
import { ReceptionStockService } from './services/api/reception-stock.service';
import { OrderStatusService } from './services/api/order-status.service';
import { ReceptionLineService } from './services/api/reception-line.service';
import { PurchaseOrder } from './models/purchase-order';
import { PurchaseOrderLineService } from './services/api/purchase-order-line.service';
import { OrderTypeService } from './services/api/order-type.service';
import { ReceptionService } from './services/api/reception.service';
import { PurchaseOrderService } from './services/api/purchase-order.service';
import { StockService } from './services/api/stock.service';
import { ProductService } from './services/api/product.service';
import { ProductTypeService } from './services/api/product-type.service';
import { MaintenanceService } from './services/api/maintenance.service';
import { Maintenance } from './models/maintenance';
import { MaintenancePlanService } from './services/api/maintenance-plan.service';
import { DayService } from './services/api/day.service';
import { MonthService } from './services/api/month.service';
import { ActionLineService } from './services/api/action-line.service';
import { ActionLine } from './models/action-line';
import { ActionTypeService } from './services/api/action-type.service';
import { ActionService } from './services/api/action.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ServiceProviderService } from './services/api/service-provider.service';
import { ResponsabilityService } from './services/api/responsability.service';
import { ProgramTypeService } from './services/api/program-type.service';
import { OperationTypeService } from './services/api/operation-type.service';
import { AddressService } from './services/api/address.service';
import { MachineService } from './services/api/machine.service';
import { PatrimonyTypeService } from './services/api/patrimony-type.service';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { CheckboxModule } from 'primeng/checkbox';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingsRoutingModule } from './../layouts/settings/settings-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/api/user.service';
import { AuthenticationService } from './services/api/authentication.service';
import { ConsumptionTypeService } from './services/api/consumption-type.service';
import { TurnLineService } from './services/api/turn-line.service';
import { SaleOrderService } from './services/api/sale-order.service';
import { TurnService } from './services/api/turn.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DeliveryLineService } from './services/api/delivery-line.service';
import { DeliveryService } from './services/api/Delivery.service';
import { VatService } from './services/api/vat.service';
import { ZoneServcie } from './services/api/zone.service';
import { TransportServcie } from './services/api/transport.service';
import { TransportCategoryVehicleService } from './services/api/transport-category-vehicle.service';
import { CommissionDriverService } from './services/api/commision-driver.service';
import { InsuranceTypeTermsService } from './services/api/insurance-type-term.service';
import { InsuranceTypeService } from './services/api/insurance-type.service';
import { BadgeTypeDriverService } from './services/api/badge-type-driver.service';
import { CommissionTypeService } from './services/api/commisionType.service';
import { MaintenanceActionService } from './services/api/maintenance-action.service';
import { MaintenanceLineRefService } from './services/api/maintenance-line-ref.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import {FieldsetModule} from 'primeng/fieldset';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CardModule} from 'primeng/card';

import {
  BadgeTypeService,
  BadgeService,
  ContractTypeService,
  DriverService,
  InsuranceTermService,
  InsuranceService,
  MaintenanceStateService,
  MaintenanceTypeService,
  SupplierService,
  VehicleCategoryService,
  VehicleService
} from './services';
import { SaleOrderStockService } from './services/api/sale-order-stock.service';
import { AccountService } from './services/api/account.service';
import { SaleOrderLineService } from './services/api/sale-order-line.service';
import { DataTableComponent } from './components/data-table/data-table.component';
import { PatrimonyService } from './services/api/patrimony-service';
import { PeriodicityTypeService } from './services/api/periodicity-type.service';
import { UomService } from './services/api/uom.service';
import { NotificationService } from './services/api/notification.service';
import { ActionPlanService } from './services/api/action-plan.service';
import { NotificationTypeService } from './services/api/notificationType.service';
import { TemplateService } from './services/api/template.service';
import { DieselDeclarationService } from './services/api/dieselDeclaration.service';
import { ConditionalTypeService } from './services/api/conditional-type.service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HasPermissionDirective } from './directive/hasPermission.directive';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SubscriptionCardService } from './services/api/subscription-card.service';
import { NotificationStateService } from './services/api/notificationState.service';
import { DashboardService } from './services/api/dashboard.service';
import { AgentService } from './services/api/agent.service';
import { StockViewService } from './services/api/stock-view.service';
import { PumpService } from './services/api/pump.service';
import { FuelPumpService } from './services/api/fuel-pump.service';
import { AlimentationPumpService } from './services/api/alimentation-pump.service';
import { WarehouseServcie } from './services/api/warehouse.service';
import { TurnTypeService } from './services/api/turn-type.service';
import { TurnSoPoService } from './services/api/turn-so-po.service';
import { SupplierHolidayService } from './services/api/supplier-holiday.service';
import { HolidayService } from './services/api/account-holiday.service';
import { PlanningService } from './services/api/planning-service';


@NgModule({
  declarations: [DataTableComponent,HasPermissionDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgxSpinnerModule,
    ConfirmDialogModule,
    ContextMenuModule,
    TranslateModule,
    DropdownModule,
    TableModule,
    AutoCompleteModule,
    CalendarModule,
    InputTextModule,
    KeyFilterModule,
    CheckboxModule,
    TabMenuModule,
    TabViewModule,
    PanelModule,
    MultiSelectModule,
    SplitButtonModule,
    DialogModule,
    PaginatorModule,
    PanelModule,
    FieldsetModule,
    RadioButtonModule,
    NgxPermissionsModule.forChild(),
    BreadcrumbModule,
    PickListModule,
    SelectButtonModule,
    StepsModule,
    OverlayPanelModule,
     TreeTableModule,
     ScrollPanelModule,
     ToastModule,
     CardModule
  ],
  exports: [
    DataTableComponent,NgxPermissionsModule,HasPermissionDirective
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {



      ngModule: SharedModule,
      providers: [
        BadgeTypeService,
        BadgeService,
        ContractTypeService,
        DriverService,
        InsuranceTermService,
        InsuranceService,
        MaintenancePlanService,
        MaintenanceStateService,
        MaintenanceTypeService,
        MaintenanceActionService,
        MaintenanceLineRefService,
        SupplierService,
        VehicleCategoryService,
        VehicleService,
        CommissionTypeService,
        BadgeTypeDriverService,
        InsuranceTypeService,
        InsuranceTypeTermsService,
        CommissionDriverService,
        TransportCategoryVehicleService,
        TransportServcie,
        ZoneServcie,
        CatalogTransportPricingService,
        VatService,
        DeliveryService,
        DeliveryLineService,
        MessageService,
        TurnService,
        SaleOrderStockService,
        AccountService,
        SaleOrderService,
        TurnLineService,
        SaleOrderLineService,
        ConsumptionTypeService,
        AuthenticationService,
        UserService,
        ConfirmationService,
        PatrimonyTypeService,
        MachineService,
        PatrimonyService,
        AddressService,
        PeriodicityTypeService,
        OperationTypeService,
        ProgramTypeService,
        ResponsabilityService,
        ServiceProviderService,
        ActionService,
        ActionTypeService,
        ActionLineService,
        MonthService,
        DayService,
        MaintenancePlanService,
        MaintenanceService,
        ProductTypeService,
        UomService,
        ProductService,
        StockService,
        ProductTypeService,
        PurchaseOrderService,
        ReceptionService,
        OrderTypeService,
        PurchaseOrderLineService,
        PurchaseOrderService,
        ReceptionLineService,
        OrderStatusService,
        ReceptionStockService,
        MaintenanceStockService,
        NotificationService,
        MessageService,
        ActionPlanService,
        NotificationTypeService,
        TemplateService,
        DieselDeclarationService,
        ConditionalTypeService,
        SubscriptionCardService,
        NotificationStateService ,
        DashboardService,
        AgentService,
        StockViewService,
        PumpService,
        FuelPumpService,
        AlimentationPumpService,
        WarehouseServcie,
        TurnTypeService,
        TurnSoPoService,
        HolidayService,
        SupplierHolidayService,
        PlanningService,
        SupplierTypeService,
        CompanyService,
        ContractAccountService,
        ContactService,
        SupplierProductService,
        SinisterTypeService,
        SinisterService,
        SupplierInvoiceService,
        SupplierInvoiceLineService,
        SupplierInvoiceReceptionService,
        DocumentTypeService,
        SubscriptionCardTypeService,
        TurnStatusService,
        ContainerTypeService,
        PackagingTypeService,
        VilleService,
        PaysService,
        OrderTransportTypeService,
        OrderTransportService,
        OrderTransportInfoService,
        TransportPlanService,
        AccountPricingService,
        PaymentTypeService,
        ServiceTypeService,
        TransportProductService,
        ActivityAreaService,
        AddressDeliveryService,
        CatalogPricingService,
        LoadingTypeService,
        VehicleTrayService,
        CatalogTransportAccountPricingService,
        BrandVehicleTypeService,
        TransportPlanHistoryService,
        OrderTransportRejectTypeService,
        ContactFunctionService,
        CatalogPricingImportService,
        CatalogServiceService,
        AccountServiceService,
        TransportServiceService,
        TransportAccountServiceService
      ],

    };
  }
}
