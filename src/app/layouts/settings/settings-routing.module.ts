import { ContactComponent } from './contact/contact.component';
import { AgencyComponent } from './agency/agency.component';
import { HabilitationRoleComponent } from './habilitation-role/habilitation-role.component';
import { GroupHabilitationComponent } from './group-habilitation/group-habilitation.component';
import { GroupHabilitation } from './../../shared/models/group-habilitation';
import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import { Habilitation } from './../../shared/models/habilitation';
import { TrajetComponent } from './trajet/trajet.component';
import { MenuMotifComponent } from './menu-motif/menu-motif.component';
import { RejetsComponent } from './rejets/rejets.component';
import { RefusComponent } from './refus/refus.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CatalogPricingComponent } from './catalog-pricing/catalog-pricing.component';
import { MenuAddressComponent } from './menu-address/menu-address.component';
import { CityComponent } from './city/city.component';
import { MenuCompanyComponent } from './menu-company/menu-company.component';
import { DataRecoveryComponent } from './data-recovery/data-recovery.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { ActivityAreaComponent } from './activity-area/activity-area.component';
import { CompanyComponent } from './company/company.component';
import { Company } from './../../shared/models/company';
import { MenuServiceComponent } from './menu-service/menu-service.component';
import { TransportEditComponent } from './transport/transport-edit/transport-edit.component';
import { MenuTransportComponent } from './menu-transport/menu-transport.component';
import { MenuFuelComponent } from './menu-fuel/menu-fuel.component';
import { MenuSubscriptionCardComponent } from './menu-subscription-card/menu-subscription-card.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { SinisterEditComponent } from './sinister/sinister-edit/sinister-edit.component';
import { SinisterComponent } from './sinister/sinister.component';
import { SupplierEditComponent } from './supplier/supplier-edit/supplier-edit.component';
import { AccountEditComponent } from './account/account-edit/account-edit.component';
import { MenuAccountComponent } from './menu-account/menu-account.component';
import { MenuProductComponent } from './menu-product/menu-product.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { ProductComponent } from './product/product.component';
import { ProductEditComponent } from './../maintenance/maintenance-plan/action-edit/product-edit/product-edit.component';
import { TransportComponent } from './transport/transport.component';
import { Transport } from './../../shared/models/transport';
import { ZoneComponent } from './zone/zone.component';
import { InsuranceTermEdiitComponent } from './insurance-term/insurance-term-ediit/insurance-term-ediit.component';
import { TestDataTableComponent } from './test-data-table/test-data-table.component';
import { DataTableComponent } from './../../shared/components/data-table/data-table.component';
import { MenuVehicleComponent } from './menu-vehicle/menu-vehicle.component';
import { MenuInsuranceComponent } from './menu-insurance/menu-insurance.component';
import { ComsumptionTypeComponent } from './comsumption-type/comsumption-type.component';
import { TransportCategoryVehicleComponent } from './transport-category-vehicle/transport-category-vehicle.component';
import { InsuranceTypeComponent } from './insurance-type/insurance-type.component';
import { CommissionTypeComponent } from './commission-type/commission-type.component';
import { VehicleCategory } from './../../shared/models/vehicle-category';
import { ContractTypeComponent } from './contract-type/contract-type.component';
import { SupplierComponent } from './supplier/supplier.component';
import { MaintenanceTypeComponent } from './maintenance-type/maintenance-type.component';
import { MaintenanceActionComponent } from './maintenance-action/maintenance-action.component';
import { MaintenanceLineRefComponent } from './maintenance-line-ref/maintenance-line-ref.component';

import { InsuranceTermComponent } from './insurance-term/insurance-term.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { BadgeTypeComponent } from './badge-type/badge-type.component';
import { BadgeComponent } from './badge/badge.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { MaintenanceStatusComponent } from './maintenance-status/maintenance-status.component';
import { VehicleCategorieComponent } from './vehicle-categorie/vehicle-categorie.component';
import { MenuMaintenanceComponent } from './menu-maintenance/menu-maintenance.component';
import { MenuDriverComponent } from './menu-driver/menu-driver.component';
import { PatrimonyTypeComponent } from './patrimony-type/patrimony-type.component';
import { NotificationComponent } from './notification/notification.component';
import { ConfigMessageComponent } from './configMessage/configMessage.component';
import { DieselDeclarationComponent } from './diesel-declaration/diesel-declaration.component';
import { ActionTypeComponent } from './actionType/actionType.component';
import { NotificationTypeComponent } from './notification-type/notification-type.component';
import { MenuNotificationComponent } from './menu-notification/menu-notification.component';
import { ConditionalTypeComponent } from './conditional-type/conditional-type.component';
import { SubscriptionCardComponent } from './subscriptionCard/subscriptionCard.component';
import { AgentComponent } from './agent/agent.component';
import { PumpsComponent } from './pumps/pumps.component';
import { FuelPumpsComponent } from './fuel-pumps/fuel-pumps.component';
import { HolidayComponent } from './holiday/holiday.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {
    path: '', component: SettingsComponent, children: [
      { path: 'badges', component: BadgeComponent },
      { path: 'badge-types', component: BadgeTypeComponent },
      { path: 'suppliers', component: SupplierComponent },
      { path: 'contract-types', component: ContractTypeComponent },
      { path: 'insurances', component: InsuranceComponent },
      { path: 'insurance-terms', component: InsuranceTermComponent },
      { path: 'insurance-terms-ediit', component: InsuranceTermEdiitComponent },
      { path: 'maintenance-statuses', component: MaintenanceStatusComponent },
      { path: 'maintenance-types', component: MaintenanceTypeComponent },
      { path: 'maintenance-action', component: MaintenanceActionComponent},
      { path: 'maintenance-line-ref', component: MaintenanceLineRefComponent},
      { path: 'vehicle-categorie', component: VehicleCategorieComponent },
      { path: 'commission-type', component: CommissionTypeComponent },
      { path: 'insurance-type', component: InsuranceTypeComponent },
      { path: 'transport-category-vehicle', component: TransportCategoryVehicleComponent },
      { path: 'consumption-type', component: ComsumptionTypeComponent },
      { path: 'menu-insurance', component: MenuInsuranceComponent },
      { path: 'menu-vehicle', component: MenuVehicleComponent },
      { path: 'menu-maintenance', component: MenuMaintenanceComponent },
      { path: 'menu-driver', component: MenuDriverComponent },
      { path: 'menu-product', component: MenuProductComponent },
      { path: 'test-table', component: TestDataTableComponent },
      { path: 'patrimony', component: PatrimonyTypeComponent },
      { path: 'zone', component: ZoneComponent },
      { path: 'transport', component: TransportComponent },
      { path: 'transport-edit', component: TransportEditComponent },
      { path: 'transport-edit/:id', component: TransportEditComponent },

      { path: 'product', component: ProductComponent },
      { path: 'product-type', component: ProductTypeComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'config-mail', component: ConfigMessageComponent },
      { path: 'diesel-declaration', component: DieselDeclarationComponent },
      { path: 'action-type', component: ActionTypeComponent },
      { path: 'notification-type', component: NotificationTypeComponent },
      { path: 'menu-mail', component: MenuNotificationComponent },
      { path: 'conditional-type', component: ConditionalTypeComponent },
      { path: 'subscription-card', component: SubscriptionCardComponent},
      { path: 'agents', component: AgentComponent},
      { path: 'pumps', component: PumpsComponent},
      { path: 'fuel-pumps', component: FuelPumpsComponent},
      { path: 'holiday', component: HolidayComponent},
      { path: 'account', component: MenuAccountComponent},
      { path: 'account-edit/:id', component: AccountEditComponent},
      { path: 'account-edit', component: AccountEditComponent},
      { path: 'supplier-edit/:id', component: SupplierEditComponent},
      { path: 'supplier-edit', component: SupplierEditComponent},
      { path: 'sinisters', component: SinisterComponent},
      { path: 'sinister-edit', component: SinisterEditComponent},
      { path: 'sinister-edit/:id', component: SinisterEditComponent},
      { path: 'document-type', component: DocumentTypeComponent},
      { path: 'menu-subscription-card', component: MenuSubscriptionCardComponent},
      { path: 'menu-fuel', component: MenuFuelComponent},
      { path: 'menu-transport', component: MenuTransportComponent},
      { path: 'test', component: TestDataTableComponent},
      { path: 'menu-service', component: MenuServiceComponent},
      { path: 'company', component: CompanyComponent},
      { path: 'company-edit', component: CompanyEditComponent},
      { path: 'company-edit/:id', component: CompanyEditComponent},

      { path: 'activity-area', component: ActivityAreaComponent},
      { path: 'delivery-address', component: DeliveryAddressComponent},
      { path: 'data-recovery', component: DataRecoveryComponent},
      { path: 'menu-company', component: MenuCompanyComponent},
      { path: 'city', component: CityComponent},
      { path: 'menu-address', component: MenuAddressComponent},
      { path: 'catalog-pricing', component: CatalogPricingComponent},
      { path: 'refus', component: RefusComponent},
      { path: 'reject', component: RejetsComponent},
      { path: 'menu-motif', component: MenuMotifComponent},
      { path: 'trajet', component: TrajetComponent},
     { path: 'habili-tations', component: HabilitationRoleComponent},
      { path: 'group', component: GroupComponent},
      { path: 'user', component: UserComponent},
      { path: 'group-habilitation', component: GroupHabilitationComponent},
      { path: 'agency', component: AgencyComponent},
      { path: 'contact', component: ContactComponent}


    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
