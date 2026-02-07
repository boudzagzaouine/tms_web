import { NgModule, Optional, SkipSelf, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import all services
import { ExportService } from '../shared/services/api/export.service';
import { OrderTransportDocumentService } from '../shared/services/api/ordet-transport-document.service';
import { VehicleAccompanimentService } from '../shared/services/api/vehicle-accompaniment.service';
import { MarchandiseTypeService } from '../shared/services/api/marchandise-type.service';
import { OrderTransportDocumentTypeService } from '../shared/services/api/order-transport-document-type.service';
import { AccountPricingServiceService } from '../shared/services/api/account-pricing-service.service';
import { CompanyImportService } from '../shared/services/api/company-import.service';
import { OrderTransportInfoLineDocumentService } from '../shared/services/api/order-transport-info-line-documet.service';
import { AgencyService } from '../shared/services/api/agency.service';
import { TransportPlanLocationService } from '../shared/services/api/transport-plan-location.service';
import { TrajetImportService } from '../shared/services/api/trajet-import.service';
import { CatalogTransportPricingImportService } from '../shared/services/api/catalog-Transport-pricing-import.service';
import { CatalogTransportAccountPricingImportService } from '../shared/services/api/catalog-Transport-account-pricing-import.service';
import { AccountPricingImportService } from '../shared/services/api/account-pricing-import.service';
import { GroupHabilitationService } from '../shared/services/api/group-habilitation.service';
import { UserGroupService } from '../shared/services/api/user-group.service';
import { HabilitationService } from '../shared/services/api/habilitation.service';
import { TrajetService } from '../shared/services/api/trajet.service';
import { TransportPlanServiceCatalogService } from '../shared/services/api/transport-Plan-service-catalog.service';
import { TransportAccountServiceService } from '../shared/services/api/transport-account-service.service';
import { TransportServiceService } from '../shared/services/api/transport-service.service';
import { CatalogServiceService } from '../shared/services/api/catalog-service.service';
import { CatalogPricingImportService } from '../shared/services/api/catalog-pricing-import.service';
import { ContactFunctionService } from '../shared/services/api/contact-function.service';
import { OrderTransportRejectTypeService } from '../shared/services/api/order-transport-reject-type.service';
import { TransportPlanHistoryService } from '../shared/services/api/transport-plan-history.service';
import { BrandVehicleTypeService } from '../shared/services/api/brand-vehicle-type.service';
import { CatalogTransportAccountPricingService } from '../shared/services/api/catalog-transport-account-pricing.service';
import { CatalogTransportPricingService } from '../shared/services/api/catalog-transport-pricing.service';
import { VehicleTrayService } from '../shared/services/api/vehicle-tray.service';
import { LoadingTypeService } from '../shared/services/api/loading-type.service';
import { CatalogPricingService } from '../shared/services/api/catalog-pricing.service';
import { AddressDeliveryService } from '../shared/services/api/AddressDeliveryService.service';
import { ActivityAreaService } from '../shared/services/api/activity-area.service';
import { ServiceTypeService } from '../shared/services/api/service-type.service';
import { PaymentTypeService } from '../shared/services/api/payment-type.service';
import { AccountPricingService } from '../shared/services/api/account-pricing.service';
import { OrderTransportTypeService } from '../shared/services/api/order-transport-type.service';
import { TransportPlanService } from '../shared/services/api/transport-plan.service';
import { OrderTransportInfoService } from '../shared/services/api/order-transport-info.service';
import { OrderTransportService } from '../shared/services/api/order-transport.service';
import { PaysService } from '../shared/services/api/pays.service';
import { VilleService } from '../shared/services/api/ville.service';
import { PackagingTypeService } from '../shared/services/api/packaging-type.service';
import { ContainerTypeService } from '../shared/services/api/container-type.service';
import { TurnStatusService } from '../shared/services/api/turn-status.service';
import { SubscriptionCardTypeService } from '../shared/services/api/subscription-card-type.service';
import { DocumentTypeService } from '../shared/services/api/document-type.service';
import { SupplierInvoiceReceptionService } from '../shared/services/api/supplier-invoice-reception.service';
import { SupplierInvoiceLineService } from '../shared/services/api/supplier-invoice-line.service copy';
import { SupplierInvoiceService } from '../shared/services/api/supplier-invoice.service';
import { SinisterService } from '../shared/services/api/sinister.service';
import { SinisterTypeService } from '../shared/services/api/sinister-type.service';
import { SupplierProductService } from '../shared/services/api/supplier-product.service';
import { ContactService } from '../shared/services/api/contact.service';
import { ContractAccountService } from '../shared/services/api/contract-account.service';
import { CompanyService } from '../shared/services/api/company.service';
import { SupplierTypeService } from '../shared/services/api/supplier-type.service';
import { MaintenanceStockService } from '../shared/services/api/maintenance-stock.service';
import { ReceptionStockService } from '../shared/services/api/reception-stock.service';
import { OrderStatusService } from '../shared/services/api/order-status.service';
import { ReceptionLineService } from '../shared/services/api/reception-line.service';
import { PurchaseOrderLineService } from '../shared/services/api/purchase-order-line.service';
import { OrderTypeService } from '../shared/services/api/order-type.service';
import { ReceptionService } from '../shared/services/api/reception.service';
import { PurchaseOrderService } from '../shared/services/api/purchase-order.service';
import { StockService } from '../shared/services/api/stock.service';
import { ProductService } from '../shared/services/api/product.service';
import { ProductTypeService } from '../shared/services/api/product-type.service';
import { MaintenanceService } from '../shared/services/api/maintenance.service';
import { MaintenancePlanService } from '../shared/services/api/maintenance-plan.service';
import { DayService } from '../shared/services/api/day.service';
import { MonthService } from '../shared/services/api/month.service';
import { ActionLineService } from '../shared/services/api/action-line.service';
import { ActionTypeService } from '../shared/services/api/action-type.service';
import { ActionService } from '../shared/services/api/action.service';
import { ServiceProviderService } from '../shared/services/api/service-provider.service';
import { ResponsabilityService } from '../shared/services/api/responsability.service';
import { ProgramTypeService } from '../shared/services/api/program-type.service';
import { OperationTypeService } from '../shared/services/api/operation-type.service';
import { AddressService } from '../shared/services/api/address.service';
import { MachineService } from '../shared/services/api/machine.service';
import { PatrimonyTypeService } from '../shared/services/api/patrimony-type.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { BadgeTypeService, BadgeService, ContractTypeService, DriverService, InsuranceTermService, InsuranceService, MaintenanceStateService, MaintenanceTypeService, SupplierService, VehicleCategoryService, VehicleService } from '../shared/services';
import { SaleOrderStockService } from '../shared/services/api/sale-order-stock.service';
import { AccountService } from '../shared/services/api/account.service';
import { SaleOrderLineService } from '../shared/services/api/sale-order-line.service';
import { PatrimonyService } from '../shared/services/api/patrimony-service';
import { PeriodicityTypeService } from '../shared/services/api/periodicity-type.service';
import { UomService } from '../shared/services/api/uom.service';
import { NotificationService } from '../shared/services/api/notification.service';
import { ActionPlanService } from '../shared/services/api/action-plan.service';
import { NotificationTypeService } from '../shared/services/api/notificationType.service';
import { TemplateService } from '../shared/services/api/template.service';
import { DieselDeclarationService } from '../shared/services/api/dieselDeclaration.service';
import { ConditionalTypeService } from '../shared/services/api/conditional-type.service';
import { SubscriptionCardService } from '../shared/services/api/subscription-card.service';
import { NotificationStateService } from '../shared/services/api/notificationState.service';
import { DashboardService } from '../shared/services/api/dashboard.service';
import { AgentService } from '../shared/services/api/agent.service';
import { StockViewService } from '../shared/services/api/stock-view.service';
import { PumpService } from '../shared/services/api/pump.service';
import { FuelPumpService } from '../shared/services/api/fuel-pump.service';
import { AlimentationPumpService } from '../shared/services/api/alimentation-pump.service';
import { WarehouseServcie } from '../shared/services/api/warehouse.service';
import { TurnTypeService } from '../shared/services/api/turn-type.service';
import { TurnSoPoService } from '../shared/services/api/turn-so-po.service';
import { SupplierHolidayService } from '../shared/services/api/supplier-holiday.service';
import { HolidayService } from '../shared/services/api/account-holiday.service';
import { PlanningService } from '../shared/services/api/planning-service';
import { TmsdashboardService } from '../shared/services/api/tms-dashboard.service';
import { ZoneVilleService } from '../shared/services/api/zone-ville.service';
import { OrderTransportInfoLineService } from '../shared/services/api/order-transport-info-line.service';
import { UserService } from '../shared/services/api/user.service';
import { AuthenticationService } from '../shared/services/api/authentication.service';
import { ConsumptionTypeService } from '../shared/services/api/consumption-type.service';
import { TurnLineService } from '../shared/services/api/turn-line.service';
import { SaleOrderService } from '../shared/services/api/sale-order.service';
import { TurnService } from '../shared/services/api/turn.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DeliveryLineService } from '../shared/services/api/delivery-line.service';
import { DeliveryService } from '../shared/services/api/Delivery.service';
import { VatService } from '../shared/services/api/vat.service';
import { ZoneServcie } from '../shared/services/api/zone.service';
import { TransportServcie } from '../shared/services/api/transport.service';
import { TransportCategoryVehicleService } from '../shared/services/api/transport-category-vehicle.service';
import { CommissionDriverService } from '../shared/services/api/commision-driver.service';
import { InsuranceTypeTermsService } from '../shared/services/api/insurance-type-term.service';
import { InsuranceTypeService } from '../shared/services/api/insurance-type.service';
import { BadgeTypeDriverService } from '../shared/services/api/badge-type-driver.service';
import { CommissionTypeService } from '../shared/services/api/commisionType.service';
import { MaintenanceActionService } from '../shared/services/api/maintenance-action.service';
import { MaintenanceLineRefService } from '../shared/services/api/maintenance-line-ref.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it only once in AppModule.');
    }
  }

  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        BadgeTypeService,
        BadgeService,
        ContractTypeService,
        DriverService,
        OrderTransportInfoLineService,
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
        MaintenanceService,
        ProductTypeService,
        UomService,
        ProductService,
        StockService,
        PurchaseOrderService,
        ReceptionService,
        OrderTypeService,
        PurchaseOrderLineService,
        ReceptionLineService,
        OrderStatusService,
        ReceptionStockService,
        MaintenanceStockService,
        NotificationService,
        ActionPlanService,
        NotificationTypeService,
        TemplateService,
        DieselDeclarationService,
        ConditionalTypeService,
        SubscriptionCardService,
        NotificationStateService,
        DashboardService,
        TmsdashboardService,
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
        AccountPricingServiceService,
        TransportServiceService,
        TransportAccountServiceService,
        TransportPlanServiceCatalogService,
        TrajetService,
        HabilitationService,
        UserGroupService,
        GroupHabilitationService,
        AccountPricingImportService,
        CatalogTransportAccountPricingImportService,
        CatalogTransportPricingImportService,
        TrajetImportService,
        TransportPlanLocationService,
        AgencyService,
        OrderTransportInfoLineDocumentService,
        CompanyImportService,
        OrderTransportDocumentTypeService,
        MarchandiseTypeService,
        VehicleAccompanimentService,
        ZoneVilleService,
        OrderTransportDocumentService,
        DatePipe,
        DecimalPipe,
        ExportService,
      ],
    };
  }
}
