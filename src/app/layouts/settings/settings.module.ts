import { TransportAccountServiceEditComponent } from './transport/transport-edit/transport-account-service/transport-account-service-edit/transport-account-service-edit.component';
import { TransportServiceEditComponent } from './transport/transport-edit/transport-service/transport-service-edit/transport-service-edit.component';
import { TransportServiceComponent } from './transport/transport-edit/transport-service/transport-service.component';
import { CompanyServiceEditComponent } from './company/company-edit/company-service/company-service-edit/company-service-edit.component';
import { CompanyServiceComponent } from './company/company-edit/company-service/company-service.component';
import { CatalogServiceEditComponent } from './catalog-service/catalog-service-edit/catalog-service-edit.component';
import { CatalogServiceComponent } from './catalog-service/catalog-service.component';
import { MenuMotifComponent } from './menu-motif/menu-motif.component';
import { RejetEditComponent } from './rejets/rejet-edit/rejet-edit.component';
import { RejetsComponent } from './rejets/rejets.component';
import { RefusEditComponent } from './refus/refus-edit/refus-edit.component';
import { RefusComponent } from './refus/refus.component';
import { TransportAccountPricingEditComponent } from './transport/transport-edit/transport-account-pricing/transport-account-pricing-edit/transport-account-pricing-edit.component';
import { TransportAccountPricingComponent } from './transport/transport-edit/transport-account-pricing/transport-account-pricing.component';
import { TransportCatalogPricingEditComponent } from './transport/transport-edit/transport-catalog-pricing/transport-catalog-pricing-edit/transport-catalog-pricing-edit.component';
import { TransportCatalogPricingComponent } from './transport/transport-edit/transport-catalog-pricing/transport-catalog-pricing.component';
import { CompanyPricingComponent } from './company/company-edit/company-pricing/company-pricing.component';
import { CompanyPricingEditComponent } from './company/company-edit/company-pricing/company-pricing-edit/company-pricing-edit.component';
import { CatalogPricingEditComponent } from './catalog-pricing/catalog-pricing-edit/catalog-pricing-edit.component';
import { CatalogPricingComponent } from './catalog-pricing/catalog-pricing.component';
import { CatalogPricing } from './../../shared/models/catalog-pricing';
import { CityEditComponent } from './city/city-edit/city-edit.component';
import { MenuAddressComponent } from './menu-address/menu-address.component';
import { CityComponent } from './city/city.component';
import { MenuCompanyComponent } from './menu-company/menu-company.component';
import { DataRecoveryComponent } from './data-recovery/data-recovery.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { AddressDelivery } from './../../shared/import/address-delivery';
import { ActivityAreaEditComponent } from './activity-area/activity-area-edit/activity-area-edit.component';
import { ActivityAreaComponent } from './activity-area/activity-area.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyComponent } from './company/company.component';
import { TransportProductEditComponent } from './transport/transport-edit/transport-product-edit/transport-product-edit.component';
import { ProductServiceEditComponent } from './product-service/product-service-edit/product-service-edit.component';
import { ProductServiceComponent } from './product-service/product-service.component';
import { ProductService } from './../../shared/services/api/product.service';
import { ServiceTypeEditComponent } from './service-type/service-type-edit/service-type-edit.component';
import { MenuServiceComponent } from './menu-service/menu-service.component';
import { ServiceTypeComponent } from './service-type/service-type.component';
import { MenuTransportComponent } from './menu-transport/menu-transport.component';
import { MenuFuelComponent } from './menu-fuel/menu-fuel.component';
import { MenuSubscriptionCardComponent } from './menu-subscription-card/menu-subscription-card.component';
import { SubscriptionCardTypeEditComponent } from './subscription-card-type/subscription-card-type-edit/subscription-card-type-edit.component';
import { SinisterDocumentEditComponent } from './sinister/sinister-edit/sinister-document-edit/sinister-document-edit.component';
import { DocumentTypeEditComponent } from './document-type/document-type-edit/document-type-edit.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { SinisterTypeEditComponent } from './sinister-type/sinister-type-edit/sinister-type-edit.component';
import { SinisterTypeComponent } from './sinister-type/sinister-type.component';
import { SupplierProductEditComponent } from './supplier/supplier-edit/supplier-product-edit/supplier-product-edit.component';
import { AddressEditComponent } from './account/account-edit/address-edit/address-edit.component';
import { ContactEditComponent } from './account/account-edit/contact-edit/contact-edit.component';
import { ContractAccountComponent } from './contract-account/contract-account.component';
import { VehicleComponent } from './../vehicle/vehicle.component';
import { PatrimonyTypeEditComponent } from './patrimony-type/patrimony-type-edit/patrimony-type-edit.component';
import { PatrimonyTypeComponent } from './patrimony-type/patrimony-type.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { SupplierEditComponent } from './supplier/supplier-edit/supplier-edit.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule, TableHeaderCheckbox, TableCheckbox } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {KeyFilterModule} from 'primeng/keyfilter';

import { SettingsRoutingModule } from './settings-routing.module';
import { BadgeTypeEditComponent } from './badge-type/badge-type-edit/badge-type-edit.component';
import { BadgeTypeComponent } from './badge-type/badge-type.component';
import { InsuranceTermComponent } from './insurance-term/insurance-term.component';
import { InsuranceEditComponent } from './insurance/insurance-edit/insurance-edit.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { BadgeEditComponent } from './badge/badge-edit/badge-edit.component';
import { BadgeComponent } from './badge/badge.component';
import { SettingsComponent } from './settings.component';
import { MaintenanceStatusComponent } from './maintenance-status/maintenance-status.component';
import { MaintenanceTypeComponent } from './maintenance-type/maintenance-type.component';
import { MaintenanceActionComponent } from './maintenance-action/maintenance-action.component';
import { MaintenanceLineRefComponent } from './maintenance-line-ref/maintenance-line-ref.component';
import { ContractTypeComponent } from './contract-type/contract-type.component';
import { SupplierComponent } from './supplier/supplier.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {ContextMenuModule} from 'primeng/contextmenu';
import { MaintenanceTypeEditComponent } from './maintenance-type/maintenance-type-edit/maintenance-type-edit.component';
import { MaintenanceStatusEditComponent } from './maintenance-status/maintenance-status-edit/maintenance-status-edit.component';
import { MaintenanceActionEditComponent } from './maintenance-action/maintenance-action-edit/maintenance-action-edit.component';
import { MaintenanceLineRefEditComponent } from './maintenance-line-ref/maintenance-line-ref-edit/maintenance-line-ref-edit.component';
import { ContractTypeEditComponent } from './contract-type/contract-type-edit/contract-type-edit.component';
import { VehicleCategorieComponent } from './vehicle-categorie/vehicle-categorie.component';
import { VehicleCategorieEditComponent } from './vehicle-categorie/vehicle-categorie-edit/vehicle-categorie-edit.component';
import { CommissionTypeComponent } from './commission-type/commission-type.component';
import { CommissionTypeEditComponent } from './commission-type/commission-type-edit/commission-type-edit.component';
import {CheckboxModule} from 'primeng/checkbox';
import { InsuranceTypeComponent } from './insurance-type/insurance-type.component';
import { InsuranceTypeEditComponent } from './insurance-type/insurance-type-edit/insurance-type-edit.component';
import { TermEditComponent } from './insurance-type/insurance-type-edit/term-edit/term-edit.component';
import { TransportCategoryVehicleComponent } from './transport-category-vehicle/transport-category-vehicle.component';
import { TransportCategoryVehicleEditComponent } from './transport-category-vehicle/transport-category-vehicle-edit/transport-category-vehicle-edit.component';
import { ComsumptionTypeComponent } from './comsumption-type/comsumption-type.component';
import { ConsumptionTypeEditComponent } from './comsumption-type/consumption-type-edit/consumption-type-edit.component';
import { MenuInsuranceComponent } from './menu-insurance/menu-insurance.component';

import {TabMenuModule} from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import {PanelModule} from 'primeng/panel';
import { MenuVehicleComponent } from './menu-vehicle/menu-vehicle.component';
import { MenuMaintenanceComponent } from './menu-maintenance/menu-maintenance.component';
import { MenuDriverComponent } from './menu-driver/menu-driver.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import {DialogModule} from 'primeng/dialog';
import {PaginatorModule} from 'primeng/paginator';
import { InsuranceTermEdiitComponent } from './insurance-term/insurance-term-ediit/insurance-term-ediit.component';
import { TestDataTableComponent } from './test-data-table/test-data-table.component';
import { ZoneComponent } from './zone/zone.component';
import { ZoneEditComponent } from './zone/zone-edit/zone-edit.component';
import { TransportComponent } from './transport/transport.component';
import { TransportEditComponent } from './transport/transport-edit/transport-edit.component';
import {FieldsetModule} from 'primeng/fieldset';
import { TermEdiitComponent } from './insurance/insurance-edit/term-ediit/term-ediit.component';
import { ProductComponent } from './product/product.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { ProductTypeEditComponent } from './product-type/product-type-edit/product-type-edit.component';
import { MenuProductComponent } from './menu-product/menu-product.component';
import { InputNumber, InputNumberModule } from 'primeng/inputnumber';
import { NotificationComponent } from './notification/notification.component';
import {ProgressBarModule} from 'primeng/progressbar';
import { ConfigMessageComponent } from './configMessage/configMessage.component';
import { EditorModule } from 'primeng/editor';
import { DieselDeclarationComponent } from './diesel-declaration/diesel-declaration.component';
import { DieselDeclarationEditComponent } from './diesel-declaration/diesel-declaration-edit/diesel-declaration-edit.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ActionTypeComponent } from './actionType/actionType.component';
import { ActionTypeEditComponent } from './actionType/action-type-edit/action-type-edit.component';
import { NotificationTypeComponent } from './notification-type/notification-type.component';
import { MenuNotificationComponent } from './menu-notification/menu-notification.component';
import { NotificationTypeEditComponent } from './notification-type/notification-type-edit/notification-type-edit.component';
import { ConditionalTypeComponent } from './conditional-type/conditional-type.component';
import { ConditionalTypeEditComponent } from './conditional-type/conditional-type-edit/conditional-type-edit.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {ToastModule} from 'primeng/toast';
import { SubscriptionCardComponent } from './subscriptionCard/subscriptionCard.component';
import { SubscriptionCardEditComponent } from './subscriptionCard/subscription-card-edit/subscription-card-edit.component';

import {RadioButtonModule} from 'primeng/radiobutton';
import {SelectButtonModule} from 'primeng/selectbutton';
import {AccordionModule, AccordionTab} from 'primeng/accordion';
import { BonEditComponent } from './diesel-declaration/bon-edit/bon-edit.component';
import {NgxPrintModule} from 'ngx-print';
import { GenerateBonComponent } from './diesel-declaration/generateBon/generateBon.component';
import { AgentComponent } from './agent/agent.component';
import { AgentEditComponent } from './agent/agent-edit/agent-edit.component';
import { PumpsComponent } from './pumps/pumps.component';
import { PumpEditComponent } from './pumps/pump-edit/pump-edit.component';
import { FuelPumpEditComponent } from './fuel-pumps/fuel-pump-edit/fuel-pump-edit.component';
import { FuelPumpsComponent } from './fuel-pumps/fuel-pumps.component';
import { HolidayComponent } from './holiday/holiday.component';
import { HolidayEditComponent } from './holiday/holiday-edit/holiday-edit.component';
import { AccountComponent } from './account/account.component';
import { AccountEditComponent } from './account/account-edit/account-edit.component';
import { PlanningEditComponent } from './account/account-edit/planning-edit/planning-edit.component';
import { SupplierPlanningEditComponent } from './supplier/supplier-edit/supplier-planning-edit/supplier-planning-edit.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import { ActionTypeRepairComponent } from './actionType/action-type-edit/action-type-repair/action-type-repair.component';
import { MenuAccountComponent } from './menu-account/menu-account.component';
import { ContractAccountEditComponent } from './contract-account/contract-account-edit/contract-account-edit.component';
import { SinisterComponent } from './sinister/sinister.component';
import { SinisterEditComponent } from './sinister/sinister-edit/sinister-edit.component';
import {FileUploadModule} from 'primeng/fileupload';
import { SubscriptionCardTypeComponent } from './subscription-card-type/subscription-card-type.component';
import { AddressDeliveryEditComponent } from './delivery-address/address-delivery-edit/address-delivery-edit.component';
import {CardModule} from 'primeng/card';
import { TransportAccountServiceComponent } from './transport/transport-edit/transport-account-service/transport-account-service.component';




@NgModule({
  declarations: [
    SupplierComponent,
    SupplierEditComponent,
    SettingsComponent,
    BadgeComponent,
    BadgeEditComponent,
    BadgeTypeComponent,
    BadgeTypeEditComponent,
    InsuranceComponent,
    InsuranceEditComponent,
    InsuranceTermComponent,
    InsuranceTermEdiitComponent,
    MaintenanceStatusComponent,
    MaintenanceStatusEditComponent,
    MaintenanceTypeComponent,
    MaintenanceTypeEditComponent,
    MaintenanceActionComponent,
    MaintenanceActionEditComponent,
    MaintenanceLineRefComponent,
    MaintenanceLineRefEditComponent,
    ContractTypeComponent,
    ContractTypeEditComponent,
    VehicleCategorieComponent,
    VehicleCategorieEditComponent,
    CommissionTypeComponent,
    CommissionTypeEditComponent,
    InsuranceTypeComponent,
    InsuranceTypeEditComponent,
    TermEditComponent,
    TransportCategoryVehicleComponent,
    TransportCategoryVehicleEditComponent,
    ComsumptionTypeComponent,
    ConsumptionTypeEditComponent,
    MenuInsuranceComponent,
    MenuVehicleComponent,
    MenuMaintenanceComponent,
    MenuDriverComponent,
    InsuranceTermEdiitComponent,
    TestDataTableComponent,
    PatrimonyTypeComponent,
    PatrimonyTypeEditComponent,
    ZoneComponent,
    ZoneEditComponent,
    TransportComponent,
    TransportEditComponent,
    TermEdiitComponent,
    ProductComponent,
    ProductEditComponent,
    ProductTypeComponent,
    ProductTypeEditComponent,
    MenuProductComponent,
    NotificationComponent,
    ConfigMessageComponent,
    DieselDeclarationComponent,
    DieselDeclarationEditComponent,
    ActionTypeComponent,
    ActionTypeEditComponent,
    NotificationTypeComponent,
     MenuNotificationComponent,
     NotificationTypeEditComponent,
     ConditionalTypeComponent,
     ConditionalTypeEditComponent,
     SubscriptionCardComponent,
     SubscriptionCardEditComponent,
     BonEditComponent,
     GenerateBonComponent,
     AgentComponent,
     AgentEditComponent,
     PumpsComponent,
     PumpEditComponent,
     FuelPumpsComponent,
     FuelPumpEditComponent,
     HolidayComponent,
     HolidayEditComponent,
     AccountComponent,
     AccountEditComponent,
     PlanningEditComponent,
     SupplierPlanningEditComponent,
     ActionTypeRepairComponent,
     MenuAccountComponent,
     ContractAccountComponent,
     ContractAccountEditComponent,
     //
     ContactEditComponent,
     AddressEditComponent,
     SupplierProductEditComponent,
     SinisterTypeComponent,
     SinisterTypeEditComponent,
     SinisterComponent,
     SinisterEditComponent,
     SinisterComponent,
     SinisterEditComponent,
     DocumentTypeComponent,
     DocumentTypeEditComponent,
     SinisterDocumentEditComponent,
     SubscriptionCardTypeEditComponent,
     SubscriptionCardTypeComponent,
     MenuSubscriptionCardComponent,
     MenuFuelComponent,
     MenuTransportComponent,
     ServiceTypeComponent,
     ServiceTypeEditComponent,
    MenuServiceComponent,
    ProductServiceComponent,
    ProductServiceEditComponent,
    TransportProductEditComponent,
    CompanyComponent,
    CompanyEditComponent,
    ActivityAreaComponent,
    ActivityAreaEditComponent,
    AddressDeliveryEditComponent,
    DeliveryAddressComponent,
    DataRecoveryComponent,
    MenuCompanyComponent,
    CityComponent,
    CityEditComponent,
    MenuAddressComponent,
    CatalogPricingComponent,
    CatalogPricingEditComponent,
    CompanyPricingEditComponent,
    CompanyPricingComponent,
    TransportCatalogPricingComponent,
    TransportCatalogPricingEditComponent,
    TransportAccountPricingComponent,
    TransportAccountPricingEditComponent,
    RefusComponent,
    RefusEditComponent,
    RejetsComponent,
    RejetEditComponent,
    MenuMotifComponent,
    CatalogServiceComponent,
    CatalogServiceEditComponent,
CompanyServiceComponent,
CompanyServiceEditComponent,
TransportServiceComponent,
TransportServiceEditComponent,
TransportAccountServiceComponent,
TransportAccountServiceEditComponent






  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    NgbModalModule,
    NgxSpinnerModule,
    ConfirmDialogModule,
    ContextMenuModule,
    SharedModule,
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
     FieldsetModule,
    InputNumberModule,
     ProgressBarModule,
    EditorModule,
    BreadcrumbModule,
    ToastModule,
    RadioButtonModule,
    SelectButtonModule,
    AccordionModule,
    NgxPrintModule,
    InputSwitchModule,
    NgxPermissionsModule.forChild(),
    FileUploadModule,
    CardModule,
  ],
  exports :[
    ContactEditComponent,
    AddressEditComponent,
  ]
})
export class SettingsModule { }
