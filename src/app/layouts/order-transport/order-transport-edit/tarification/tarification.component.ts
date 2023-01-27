import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AccountPricing } from "./../../../../shared/models/account-pricing";
import { CatalogPricingService } from "../../../../shared/services/api/catalog-pricing.service";
import { CatalogPricing } from "./../../../../shared/models/catalog-pricing";
import { TransportPlanService } from "./../../../../shared/services/api/transport-plan.service";
import { AccountPricingService } from "./../../../../shared/services/api/account-pricing.service";
import { ContractAccount } from "./../../../../shared/models/contract-account";
import { ContractAccountService } from "./../../../../shared/services/api/contract-account.service";
import { OrderTransportInfoLine } from "./../../../../shared/models/order-transport-info-line";
import { OrderTransportInfo } from "./../../../../shared/models/order-transport-info";
import { Transport } from "./../../../../shared/models/transport";
import { OrderTransport } from "./../../../../shared/models/order-transport";
import { VehicleService } from "./../../../../shared/services/api/vehicle.service";
import { ConfirmationService } from "primeng/api";
import { TransportServcie } from "./../../../../shared/services/api/transport.service";
import { VehicleCategoryService } from "./../../../../shared/services/api/vehicle-category.service";
import { VehicleCategory } from "./../../../../shared/models/vehicle-category";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Vehicle } from "./../../../../shared/models";
import { OrderTransportService } from "./../../../../shared/services/api/order-transport.service";

@Component({
  selector: "app-tarification",
  templateUrl: "./tarification.component.html",
  styleUrls: ["./tarification.component.scss"],
})
export class TarificationComponent implements OnInit {
  @Output() previousstep = new EventEmitter<boolean>();
  @Output() nextstep = new EventEmitter<boolean>();
  selectedVehicleCategory: VehicleCategory = new VehicleCategory();
  selectedContractAccount: ContractAccount = new ContractAccount();
  contractAccountList: ContractAccount[] = [];
  tarificationForm: FormGroup;

  selectedCatalogPricing: CatalogPricing = new CatalogPricing();
  selectedAccountPricing: AccountPricing = new AccountPricing();

  orderTransportInfoAllerLignes: OrderTransportInfoLine[] = [];
  orderTransportInfoRetourLignes: OrderTransportInfoLine[] = [];

  vehicleCatList: VehicleCategory[] = [];
  vehicleCatsToDeliverSort: VehicleCategory[] = [];
  vehicleCatsToDeliver: VehicleCategory[] = [];
  selectOrderTransport: OrderTransport = new OrderTransport();
  vehicleList: Vehicle[] = [];
  priceTransport: number = 0;
  priceRetour: number = 0;
  selectRadio: Boolean = true;
  marginRate: number =0;
  marginValue: number = 0;

  constructor(
    private vehicleCategoryService: VehicleCategoryService,
    private orderTransportService: OrderTransportService,
    private transportPlanService: TransportPlanService,
    private transportService: TransportServcie,
    private catalogPricingService: CatalogPricingService,
    private confirmationService: ConfirmationService,
    private contractAccountService: ContractAccountService,
    private accountPricingService: AccountPricingService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.selectOrderTransport = this.orderTransportService.getOrderTransport();
    this.orderTransportInfoAllerLignes =
      this.orderTransportService?.getorderTransportInfoAller()
        ? this.orderTransportService.getorderTransportInfoAller()
            .orderTransportInfoLines
        : [];
    this.orderTransportInfoRetourLignes =
      this.orderTransportService.getorderTransportInfoRetour()
        ? this.orderTransportService.getorderTransportInfoRetour()
            .orderTransportInfoLines
        : [];
    this.selectedVehicleCategory = this.selectOrderTransport.vehicleCategory;
    console.log(this.selectOrderTransport);

    // this.orderTransportTransports=this.orderTransportService.getOrderTransport().orderTransportTransport;

    this.marginRate = this.selectOrderTransport.marginRate;
    this.marginValue = this.selectOrderTransport.marginValue;
    console.log(this.selectOrderTransport.priceHT);
    this.onSearchCatalogPricing();
    this.initForm();
  }

  initForm() {
    this.tarificationForm = new FormGroup({
      priceHT: new FormControl(
        this.selectOrderTransport.priceHT,
        Validators.required
      ),
    });
  }

  onSearchCatalogPricing() {
    let source, distination;

    if (
      this.selectOrderTransport.turnType.id == 1 ||
      this.selectOrderTransport.turnType.id == 3
    ) {
      source =
        this.selectOrderTransport.orderTransportInfoAller?.villeSource?.code;
      distination =
        this.selectOrderTransport.orderTransportInfoAller?.villeDistination
          ?.code;
    } else if (this.selectOrderTransport.turnType.id == 2) {
      source =
        this.selectOrderTransport.orderTransportInfoRetour?.villeSource?.code;
      distination =
        this.selectOrderTransport.orderTransportInfoRetour?.villeDistination
          ?.code;
    }
    console.log(this.selectOrderTransport.turnType.id);
    console.log(this.selectOrderTransport?.vehicleCategory?.id);
    console.log(this.selectOrderTransport?.vehicleTray?.id);
    console.log(this.selectOrderTransport?.loadingType?.id);

    this.catalogPricingService
      .find(
        "turnType.id:" +
          this.selectOrderTransport?.turnType?.id +
          ",vehicleCategory.id:" +
          this.selectOrderTransport?.vehicleCategory?.id +
          ",vehicleTray.id:" +
          this.selectOrderTransport?.vehicleTray?.id +
          ",loadingType.id:" +
          this.selectOrderTransport?.loadingType?.id +
          ",trajet.villeSource.code~" +
          source +
          ",trajet.villeDestination.code~" +
          distination
      )
      .subscribe((data) => {
        console.log(data);
        if (data[0]) {
          this.selectedCatalogPricing = data[0];
          this.onSearchAccountPricing();
        }

      });
  }

  onSearchAccountPricing() {
    let source, distination;

    if (
      this.selectOrderTransport.turnType.id == 1 ||
      this.selectOrderTransport.turnType.id == 3
    ) {
      source =
        this.selectOrderTransport.orderTransportInfoAller?.villeSource?.code;
      distination =
        this.selectOrderTransport.orderTransportInfoAller?.villeDistination
          ?.code;
    } else if (this.selectOrderTransport.turnType.id == 2) {
      source =
        this.selectOrderTransport.orderTransportInfoRetour?.villeSource?.code;
      distination =
        this.selectOrderTransport.orderTransportInfoRetour?.villeDistination
          ?.code;
    }
    console.log(this.selectOrderTransport.turnType.id);
    console.log(this.selectOrderTransport?.vehicleCategory?.id);
    console.log(this.selectOrderTransport?.vehicleTray?.id);
    console.log(this.selectOrderTransport?.loadingType?.id);

    this.accountPricingService
      .find(
        "company.id:" +
          this.selectOrderTransport?.company?.id +
          ",turnType.id:" +
          this.selectOrderTransport?.turnType?.id +
          ",vehicleCategory.id:" +
          this.selectOrderTransport?.vehicleCategory?.id +
          ",vehicleTray.id:" +
          this.selectOrderTransport?.vehicleTray?.id +
          ",loadingType.id:" +
          this.selectOrderTransport?.loadingType?.id +
          ",trajet.villeSource.code~" +
          source +
          ",trajet.villeDestination.code~" +
          distination
      )
      .subscribe((data) => {
        console.log(data);
        if (data[0]) {
          this.selectedAccountPricing = data[0];

          let purchase = this.selectedCatalogPricing.purchaseAmountHt;
          let sale = this.selectedAccountPricing.saleAmountHt;
          console.log(this.marginRate);

          this.calculatMarge(purchase,sale);

          this.tarificationForm.patchValue({
            priceHT: this.selectedAccountPricing.saleAmountHt,
          });
          this.tarificationForm.controls["priceHT"].disable();
        } else {
          let purchase = this.selectedCatalogPricing.purchaseAmountHt;
          let sale = this.selectedCatalogPricing.saleAmountHt;
          this.calculatMarge(purchase,sale);

        }
      });
  }

  onInputPrice(event) {
    let purchase = this.selectedCatalogPricing.purchaseAmountHt;
    let sale = event.value;
    this.calculatMarge(purchase,sale);
  }

  calculatMarge(purchaseAmount:number, saleAmount:number){

    this.marginRate = ((saleAmount - purchaseAmount) / purchaseAmount) * 100;
    this.marginValue = saleAmount - purchaseAmount;

  }

  previous() {
    this.selectOrderTransport.priceHT =
      this.tarificationForm.controls["priceHT"].value;
    this.orderTransportService.addPrice(this.selectOrderTransport.priceHT);
    this.orderTransportService.addMarginRate(this.marginRate);
    this.orderTransportService.addMarginValue(this.marginValue);

    this.previousstep.emit(true);
  }

  loadForm() {}

  next() {
    this.selectOrderTransport.priceHT =
      this.tarificationForm.controls["priceHT"].value;
    this.orderTransportService.addPrice(this.selectOrderTransport.priceHT);
    this.orderTransportService.addMarginRate(this.marginRate);
    this.orderTransportService.addMarginValue(this.marginValue);

    //this.orderTransportService.addOrderTransportTransport(this.orderTransportTransports);
    this.nextstep.emit(true);
  }
}
