import { VatService } from "./../../../shared/services/api/vat.service";
import { TransportServiceService } from "./../../../shared/services/api/transport-service.service";
import { TransportAccountServiceService } from "./../../../shared/services/api/transport-account-service.service";
import { TransportPlanServiceCatalog } from "./../../../shared/models/transport-plan-service-catalog";
import { element } from "protractor";
import { Account } from "./../../../shared/models/account";
import { CatalogTransportAccountPricingService } from "./../../../shared/services/api/catalog-transport-account-pricing.service";
import { TransportPlanHistoryService } from "./../../../shared/services/api/transport-plan-history.service";
import { TransportPlanHistory } from "./../../../shared/models/transport-plan-history";
import { CatalogPricingService } from "../../../shared/services/api/catalog-pricing.service";
import { CatalogPricing } from "./../../../shared/models/catalog-pricing";
import { OrderTransportInfo } from "./../../../shared/models/order-transport-info";
import { VilleService } from "./../../../shared/services/api/ville.service";
import { Ville } from "./../../../shared/models/ville";
import { CatalogTransportPricingService } from "./../../../shared/services/api/catalog-transport-pricing.service";
import { CatalogTransportPricing } from "./../../../shared/models/CatalogTransportPricing";
import { Observable, Subscription } from "rxjs";
import { Subject } from "rxjs";
import { MaintenancePlan } from "./../../../shared/models/maintenance-plan";
import { MaintenanceService } from "./../../../shared/services/api/maintenance.service";
import { Maintenance } from "./../../../shared/models/maintenance";
import { Router } from "@angular/router";
import { LoadCategorySaleOrder } from "./../../../shared/models/load-category-saleOrder";
import { EmsBuffer } from "./../../../shared/utils/ems-buffer";
import { ContractAccount } from "./../../../shared/models/contract-account";
import { ContractAccountService } from "./../../../shared/services/api/contract-account.service";
import { TurnStatusService } from "./../../../shared/services/api/turn-status.service";
import { TurnStatus } from "./../../../shared/models/turn-status";
import { TransportServcie } from "./../../../shared/services/api/transport.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { TransportPlanService } from "./../../../shared/services/api/transport-plan.service";
import { DriverService } from "./../../../shared/services/api/driver.service";
import { TransportPlan } from "./../../../shared/models/transport-plan";
import { Driver } from "./../../../shared/models/driver";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Transport } from "./../../../shared/models/transport";
import { VehicleCategory } from "./../../../shared/models/vehicle-category";
import { VehicleCategorieComponent } from "./../../settings/vehicle-categorie/vehicle-categorie.component";
import { VehicleService } from "./../../../shared/services/api/vehicle.service";
import { Vehicle } from "./../../../shared/models/vehicle";
import { OrderTransportInfoService } from "./../../../shared/services/api/order-transport-info.service";
import { OrderTransport } from "./../../../shared/models/order-transport";
import { OrderTransportService } from "./../../../shared/services/api/order-transport.service";
import { ConfirmationService, MenuItem } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { table } from "console";
import { Vat } from "./../../../shared/models";

@Component({
  selector: "app-transport-plan-add",
  templateUrl: "./transport-plan-add.component.html",
  styleUrls: ["./transport-plan-add.component.scss"],
})
export class TransportPlanAddComponent implements OnInit {
  selectedTransportPlan: TransportPlan = new TransportPlan();
  selectOrderTransport: OrderTransport = new OrderTransport();
  orderTransportList: OrderTransport[] = [];
  orderTransportCloneList: OrderTransport[] = [];
  selectTransportPlanHistory: TransportPlanHistory = new TransportPlanHistory();
  selectCatalogTransportPricing = new CatalogTransportPricing();
  transportPlanHistoryList: TransportPlanHistory[] = [];
  transportList: Transport[] = [];
  selectedVehicle: Vehicle = new Vehicle();
  driverList: Driver[] = [];
  catalogTransportPricingList: CatalogTransportPricing[] = [];
  catalogTransportPricingCloneList: CatalogTransportPricing[] = [];

  selectedTransport: CatalogTransportPricing = new CatalogTransportPricing();
  vehicleCategoryList: VehicleCategory[] = [];
  types: any[] = ["Interne", "Prestataire"];
  breadcrumbItems: MenuItem[];
  home: MenuItem;
  index: number = 0;
  transportPlanForm: FormGroup;
  isInterOrPrestataire: Boolean = false;
  isPriceContract: string = "";

  isFormSubmitted: Boolean = false;
  selectDefaulTransport: Transport = new Transport();
  selectStatusCree: TurnStatus = new TurnStatus();
  selectStatusValide: TurnStatus = new TurnStatus();
  selectedContractAccount: ContractAccount = new ContractAccount();

  lastDeliveryTransportList: Array<TransportPlan[]> = [];
  lastDeliveryTransportInterneList: Array<TransportPlan[]> = [];

  //lastDeliveryTransport: TransportPlan = new TransportPlan();
  villeExterneForLast: string[] = [];
  subscriptions = new Subscription();
  editModeTransportProduct: Boolean = false;
  showDialogTransportProduct: Boolean = false;
  showDialogCatalogTransport: Boolean = false;
  transportOrCatalog: Boolean = false; //false catalog  // true transport
  showDialogReject: Boolean = false;
  showDialogEnAttente: Boolean = false;
  villeList: Ville[] = [];
  selectedVilleSource: Ville = new Ville();
  selectedVilleDistination: Ville = new Ville();
  catalogPricing: CatalogPricing = new CatalogPricing();
  showDialogVehicle: Boolean = false;
  sortOrderitems: any[];
  sortTransportitems: any[];
  sortMargeService: any;
  sortMargeValue: any;
  purchasePrice: number;
  selectedTransportProductService = new TransportPlanServiceCatalog();
  selectVatService: Vat = new Vat();
  constructor(
    private orderTransportService: OrderTransportService,
    private transportPlanService: TransportPlanService,
    private orderTransportInfoService: OrderTransportInfoService,
    private catalogTransportPricingService: CatalogTransportPricingService,
    private catalogTransportAccountPricingService: CatalogTransportAccountPricingService,
    private transportAccountServiceService: TransportAccountServiceService,
    private transportServiceService: TransportServiceService,
    private vatService: VatService,
    private driverService: DriverService,
    private turnStatusService: TurnStatusService,
    private transportService: TransportServcie,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private villeService: VilleService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private catalogPricingService: CatalogPricingService,
    private transportPlanHitoryService: TransportPlanHistoryService
  ) {}

  ngOnInit() {
    this.breadcrumbItems = [
      { label: "Plan de  Transport" },
      { label: "Editer", routerLink: "/core/transport-plan/edit" },
    ];
    this.home = { icon: "pi pi-home" };

    this.sortOrderitems = [
      { name: "Marge en Valeur", icon: "pi pi-sort-alt", label: "valeur" },
      { name: "Marge en Pourcengtage", icon: "pi pi-sort-alt", label: "marge" },
    ];

    this.sortTransportitems = [
      { name: "Taux de Marge", icon: "pi pi-sort-alt", label: "marge" },
      { name: "Taux de Service", icon: "pi pi-sort-alt", label: "service" },
    ];

    // this.driverService.findAll().subscribe((data) => {
    //   this.driverList = data;
    // });

    this.loadOrderTransport();

    this.vatService.findById(4).subscribe((data) => {
      this.selectVatService = data;
    });

    this.transportService.findAll().subscribe((data) => {
      this.selectDefaulTransport = data[0];
    });
    this.turnStatusService.find("id:" + 1).subscribe((data) => {
      this.selectStatusCree = data[0];
    });
    this.turnStatusService.find("id:" + 2).subscribe((data) => {
      this.selectStatusValide = data[0];
    });
    this.initForm();
  }

  initForm() {
    this.transportPlanForm = new FormGroup({
      orderTransport: new FormControl(
        this.selectedTransportPlan.orderTransport?.code,
        Validators.required
      ),
      vehicle: new FormControl(
        this.selectedTransportPlan?.vehicle?.registrationNumber
      ),
      driver: new FormControl(this.selectedTransportPlan.driver),
      vehicleCategory: new FormControl(
        this.selectedTransportPlan?.vehicleCategory?.code,
        Validators.required
      ),
      transport: new FormControl(
        this.selectedTransportPlan?.transport?.name,
        Validators.required
      ),
      salePrice: new FormControl(this.selectedTransportPlan.salePrice),
      purchasePrice: new FormControl(
        this.selectedTransportPlan.purchasePrice,
        Validators.required
      ),
      purchasePriceNegotiated: new FormControl(
        this.selectedTransportPlan.purchasePriceNegotiated
      ),
      remark: new FormControl(this.selectedTransportPlan.remark),

      date: new FormControl(new Date(this.selectedTransportPlan.dateDepart)),
    });
  }

  //  List  OrderTransport status cree
  loadOrderTransport() {
    this.transportOrCatalog = false;
    console.log(this.transportOrCatalog);

    //turnStatus .id =  1 => cree
    this.orderTransportService.find("turnStatus.id:" + 1).subscribe((data) => {
      this.orderTransportList = data;
      this.orderTransportList = this.orderTransportList.sort(
        (n1, n2) => n2.marginValue - n1.marginValue
      );

      this.orderTransportCloneList = this.orderTransportList;
      this.orderTransportList.forEach((element) => {
        this.orderTransportInfoService
          .find("orderTransport.id:" + element.id)
          .subscribe((data) => {
            element.orderTransportInfoAller = data[0];
          });
        //   this.orderTransportInfoService
        //     .find("type~" + "Retour" + ",orderTransport.id:" + element.id)
        //     .subscribe((data) => {
        //       element.orderTransportInfoRetour = data[0];
        //     });
      });
    });
    this.sortOrderTransportByValeur();
  }
  sortOrderTransportbyMarge() {
    this.orderTransportList = this.orderTransportList.sort(
      (n1, n2) => n2.marginRate - n1.marginRate
    );
  }

  sortOrderTransportByValeur() {
    this.orderTransportList = this.orderTransportList.sort(
      (n1, n2) => n2.marginValue - n1.marginValue
    );
  }

  onSortOrder() {
    let tables = this.orderTransportList;

    this.orderTransportList = [];
    this.orderTransportList.push(...tables);

    if (this.sortMargeValue == "marge") {
      this.orderTransportList = this.orderTransportList.sort(
        (n1, n2) => n2.marginRate - n1.marginRate
      );
    } else {
      this.orderTransportList = this.orderTransportList.sort(
        (n1, n2) => n2.marginValue - n1.marginValue
      );
    }
  }

  onSortTranspot() {
    let tables = this.catalogTransportPricingList;

    this.catalogTransportPricingList = [];
    this.catalogTransportPricingList.push(...tables);

    if (this.sortMargeService == "service") {
      this.catalogTransportPricingList = this.catalogTransportPricingList.sort(
        (n1, n2) => n2.margeService - n1.margeService
      );
    } else {
      this.catalogTransportPricingList = this.catalogTransportPricingList.sort(
        (n1, n2) => n2.marginRate - n1.marginRate
      );
    }
  }

  // List Prestataire from CatalogueTransport  By Category and turnType , Source ,Distination
  loadTransport(event) {
    this.transportOrCatalog = false;

    this.selectOrderTransport =
      event.id != null || event.id != undefined ? event : event.value[0];

    let trajet;

    trajet = this.selectOrderTransport?.trajet.code;

    this.catalogTransportPricingService
      .find(
        "turnType.id:" +
          this.selectOrderTransport.turnType.id +
          ",loadingType.id:" +
          this.selectOrderTransport.loadingType.id +
          ",vehicleCategory.tonnage >" +
          this.selectOrderTransport.vehicleCategory.tonnage +
          ",vehicleTray.id:" +
          this.selectOrderTransport.vehicleTray.id +
          ",trajet.code~" +
          trajet +
          ",transport.active:" +
          true
      )
      .subscribe((data) => {
        if (data[0] != null || data[0] != undefined) {
          this.catalogTransportPricingList = data;
          this.catalogTransportPricingList =
            this.catalogTransportPricingList.sort(
              (n1, n2) => n2.marginRate - n1.marginRate
            );
          this.searchTransportbyOrderInHistory();
        } else {
          this.catalogTransportPricingList = [];
        }
      });
  }

  searchTransportbyOrderInHistory() {
    this.transportPlanHitoryService
      .find("orderTransport.id:" + this.selectOrderTransport.id)
      .subscribe((data) => {
        if (data[0] != null) {
          this.transportPlanHistoryList = data;
          data.forEach((element) => {
            this.catalogTransportPricingList =
              this.catalogTransportPricingList.filter(
                (f) => f.transport.id != element.transport.id
              );
          });
        }

        this.onSearchCatalgPrice();
      });
  }

  onSearchCatalgPrice() {
    let trajet;

    trajet = this.selectOrderTransport?.trajet.code;

    this.catalogPricingService
      .find(
        "turnType.id:" +
          this.selectOrderTransport.turnType.id +
          ",loadingType.id:" +
          this.selectOrderTransport.loadingType.id +
          ",vehicleCategory.id:" +
          this.selectOrderTransport.vehicleCategory.id +
          ",vehicleTray.id:" +
          this.selectOrderTransport.vehicleTray.id +
          ",trajet.code~" +
          trajet
      )
      .subscribe((data) => {
        if (data[0] != null || data[0] != undefined) {
          this.catalogPricing = data[0];
          this.calculateTransportMarge();
          this.catalogTransportPricingList =
            this.catalogTransportPricingList.sort(
              (n1, n2) => n2.marginRate - n1.marginRate
            );
        } else {
          this.catalogPricing = new CatalogPricing();
        }
      });
  }

  calculateMargeServiceTransport() {
    let totalPlan: number = 0;
    let totalReject: number = 0;

    this.catalogTransportPricingList.forEach((element) => {
      this.totalPlanByTrasnport(element.transport).subscribe((data) => {
        element.margeService = data ? data : 0;
        this.onSortTranspot();
      });
    });
  }
  totalPlanByTrasnport(transport: Transport): Observable<number> {
    let total: number = 0;
    let totalPlan: number = 0;
    let totalReject: number = 0;
    var subject = new Subject<number>();
    this.transportPlanService
      .sizeSearch("transport.id:" + transport.id)
      .subscribe((data) => {
        totalPlan = data ? data : 0;

        this.totalRejectByTrasnport(transport).subscribe((dataR) => {
          totalReject = dataR ? dataR : 0;

          total = ((totalPlan - totalReject) / totalPlan) * 100;

          subject.next(total);
        });
      });
    return subject.asObservable();
  }

  totalRejectByTrasnport(transport: Transport): Observable<number> {
    let total: number = 0;
    var subject = new Subject<number>();
    this.transportPlanHitoryService
      .sizeSearch("transport.id:" + transport.id)
      .subscribe((data) => {
        if (data) total = data;
        subject.next(total);
      });
    return subject.asObservable();
  }

  calculateTransportMarge() {
    this.catalogTransportPricingList.forEach((element) => {
      this.searchTransportAccountPricing(element.transport).subscribe(
        (data) => {
          if (data > 0) {
            let purchase = data;
            element.transport.purchaseAmount = purchase;
            let sale = this.catalogPricing.saleAmountHt;
            element.marginRate = ((sale - purchase) / purchase) * 100;
          } else {
            let purchase = element.purchaseAmountHt;
            element.transport.purchaseAmount = purchase;
            let sale = this.catalogPricing.saleAmountHt;
            element.marginRate = ((sale - purchase) / purchase) * 100;
          }
        }
      );
      this.calculateMargeServiceTransport();
    });
  }

  searchTransportAccountPricing(transport: Transport): Observable<number> {
    let trajet;

    trajet = this.selectOrderTransport?.trajet.code;

    let purcahse: number = 0;
    var subject = new Subject<number>();
    this.catalogTransportAccountPricingService
      .find(
        "company.id:" +
          this.selectOrderTransport?.account?.company?.id +
          ",transport.id:" +
          transport.id +
          ",turnType.id:" +
          this.selectOrderTransport.turnType.id +
          ",loadingType.id:" +
          this.selectOrderTransport.loadingType.id +
          ",vehicleCategory.tonnage >" +
          this.selectOrderTransport.vehicleCategory.tonnage +
          ",vehicleTray.id:" +
          this.selectOrderTransport.vehicleTray.id +
          ",trajet.code~" +
          trajet
      )
      .subscribe((data) => {
        if (data[0] != null) {
          purcahse = data[0].purchaseAmountHt;

          subject.next(purcahse);
        } else {
          purcahse = 0;
          subject.next(purcahse);
        }
      });
    return subject.asObservable();
  }

  onVilleSearch(event) {
    this.villeService
      .find("code~" + event.query)
      .subscribe((data) => (this.villeList = data));
  }
  invertVille() {
    this.resetSearchByVille();
    let villeSource: Ville = new Ville();
    villeSource = this.selectedVilleSource;
    this.selectedVilleSource = this.selectedVilleDistination;
    this.selectedVilleDistination = villeSource;
  }
  resetSearchByVille() {
    this.orderTransportList = this.orderTransportCloneList;
    this.sortOrderTransportByValeur();
  }
  searchByVille() {
    let allerList: OrderTransport[] = [];
    let retourList: OrderTransport[] = [];

    allerList = this.orderTransportList.filter(
      (f) =>
        f.orderTransportInfoAller?.trajet?.villeSource?.id ==
          this.selectedVilleSource?.id &&
        f.orderTransportInfoAller?.trajet?.villeDestination?.id ==
          this.selectedVilleDistination?.id
    );

    this.orderTransportList = [];
    this.orderTransportList.push(...allerList);
    // this.orderTransportList.push(...retourList);
    this.sortOrderTransportByValeur();
  }
  onSelectVilleSource(event) {
    this.selectedVilleSource = event;
    this.resetSearchByVille();
  }

  onSelectVilleDistination(event) {
    this.selectedVilleDistination = event;
    this.resetSearchByVille();
  }
  onSelectDriver(event: any) {
    this.selectedTransportPlan.driver = event;
    console.log(this.selectedTransportPlan.driver);
  }

  onDriverSearch(event: any) {
    let search;
    if (!isNaN(event.query)) {
      search = "code~" + event.query;
    } else {
      search = "name~" + event.query;
    }
    this.driverService
      .find(search)
      .subscribe((data) => (this.driverList = data));
  }

  //// fin  afficher dernier prix dernier achat prestataire

  onSelectedTarification() {
    if (this.isPriceContract == "Oui") {
      this.selectedTransportPlan.salePrice = this.selectedContractAccount.price;
    } else if (this.isPriceContract == "Non") {
      //  this.selectedTransportPlan.salePrice =
      //  this.catalogTransportPricingList[0].amountTtc;
    }
    this.initForm();
  }

  onSelectVehicle(event) {
    this.selectedVehicle = event.value[0];
  }
  onselectTransport(event) {
    console.log(event.value[0]);

    this.selectedTransport = event.value[0];

    this.selectedTransportPlan.purchasePrice =
      this.selectedTransport.transport.purchaseAmount;
    this.initForm();
  }

  affectedTransport() {
    if (
      this.selectOrderTransport.id == null &&
      this.selectOrderTransport.id == undefined
    ) {
      this.toastr.info("Selectionner Commande", "Info");
    } else if (
      this.selectedTransport.id == null &&
      this.selectedTransport.id == undefined
    ) {
      this.toastr.info("Selectionner Transport", "Info");
    } else {

      this.transportPlanHitoryService
      .find("orderTransport.id:" + this.selectOrderTransport.id+',type:4')
      .subscribe((data) => {
if(data[0]){
this.showDialogEnAttente=true;

}  else {
  this.confirmationService.confirm({
    message: "Voulez-vous vraiment affecter?",
    accept: () => {
      this.generatePlanTransport();
    },
  });

}
      });



    }
  }

  generatePlanTransport() {
    this.selectedTransportPlan.orderTransport = this.selectOrderTransport;

    this.selectedTransportPlan.trajet = this.selectOrderTransport.trajet;

    this.selectedTransportPlan.dateDepart =
      this.selectOrderTransport.orderTransportInfoAller?.date;
    this.selectedTransportPlan.account = this.selectOrderTransport.account;

    this.selectedTransportPlan.vehicleCategory =
      this.selectOrderTransport.vehicleCategory;
    this.selectedTransportPlan.transport = this.selectedTransport.transport;

    this.selectedTransportPlan.purchasePrice =
      this.selectedTransport.purchaseAmountHt;
    this.selectedTransportPlan.purchasePriceNegotiated =
      this.selectedTransport.purchaseAmountHt;
    this.selectedTransportPlan.purchaseVat = this.selectedTransport.purchaseVat;

    this.selectedTransportPlan.purchasePriceTtc =
      this.selectedTransport.purchaseAmountTtc;
    this.selectedTransportPlan.purchasePriceVat =
      this.selectedTransport.purchaseAmountTva;

    this.affectedService();
    if (this.selectedTransportPlan.transport.interneOrExterne == true) {
      this.isInterOrPrestataire = true;
      this.showDialogVehicle = true;
    } else {
      this.isInterOrPrestataire = false;
      this.showDialogVehicle = false;
      this.selectedTransportPlan.vehicle = null;
      this.selectedTransportPlan.driver = null;
    }

    this.initForm();
  }

  affectedService() {
    console.log("affect Service");

    this.selectOrderTransport.orderTransportServiceCatalogs.forEach(
      (element) => {
        element.transport = this.selectedTransport.transport;
        element.account = this.selectOrderTransport.account;
        element.invoice = this.selectedTransport.transport.factureService;

        this.transportAccountServiceService
          .find(
            "company.id:" +
              this.selectOrderTransport.account.company.id +
              ",transport.id:" +
              this.selectedTransport?.transport.id +
              ",product.id:" +
              element.product.id +
              ",account.id:" +
              this.selectOrderTransport.account.id
          )
          .subscribe((data) => {
            console.log("data");
console.log(data);

            if (data[0] != null) {
              element.purchasePriceHT = data[0].purchaseAmountHt;
              element.purchasePriceTTC = data[0].purchaseAmountTtc;
              element.purchaseVat = data[0].purchaseVat;
              const amountTva =
                (element.purchasePriceHT / 100) * element.purchaseVat.value;
              element.purchasePriceVat = amountTva;

              element.totalPurchasePriceHT =
                element.purchasePriceHT * element.quantity;
              element.totalPurchasePriceTTC =
                element.purchasePriceTTC * element.quantity;
              element.totalPurchasePriceVat =
                (element.totalPurchasePriceHT / 100) *
                element.purchaseVat.value;
              console.log(1);

              console.log(element);

              this.calculateAllLines();
            } else {
              this.transportAccountServiceService
                .find(
                  "company.id:" +
                    this.selectOrderTransport.account.company.id +
                    ",transport.id:" +
                    this.selectedTransport.transport.id +
                    ",product.id:" +
                    element.product.id
                )
                .subscribe((data) => {
                  data = data.filter((f) => f.account == null);
                  if (data[0]) {
                    element.purchasePriceHT = data[0].purchaseAmountHt;
                    element.purchasePriceTTC = data[0].purchaseAmountTtc;
                    element.purchaseVat = data[0].purchaseVat;
                    const amountTva =
                      (element.purchasePriceHT / 100) *
                      element.purchaseVat.value;
                    element.purchasePriceVat = amountTva;

                    element.totalPurchasePriceHT =
                      element.purchasePriceHT * element.quantity;
                    element.totalPurchasePriceTTC =
                      element.purchasePriceTTC * element.quantity;
                    element.totalPurchasePriceVat =
                      (element.totalPurchasePriceHT / 100) *
                      element.purchaseVat.value;
                    console.log(element);
                    console.log(2);

                    this.calculateAllLines();
                  } else {
                    this.transportServiceService
                      .find(
                        "transport.id:" +
                          this.selectedTransport.transport.id +
                          ",product.id:" +
                          element.product.id
                      )
                      .subscribe((data) => {
                        if (data[0]) {
                          element.purchasePriceHT = data[0].purchaseAmountHt;
                          element.purchasePriceTTC = data[0].purchaseAmountTtc;
                          element.purchaseVat = data[0].purchaseVat;
                          const amountTva =
                            (element.purchasePriceHT / 100) *
                            element.purchaseVat.value;
                          element.purchasePriceVat = amountTva;

                          element.totalPurchasePriceHT =
                            element.purchasePriceHT * element.quantity;
                          element.totalPurchasePriceTTC =
                            element.purchasePriceTTC * element.quantity;
                          element.totalPurchasePriceVat =
                            (element.totalPurchasePriceHT / 100) *
                            element.purchaseVat.value;
                          console.log(element);
                          console.log(3);

                          this.calculateAllLines();
                        } else {
                          element.purchasePriceHT = 0;
                          element.purchasePriceTTC = 0;
                          console.log(5);

                          this.calculateAllLines();
                        }
                      });
                  }
                });
            }
          });
      }
    );
  }

  getServiceByCompanyandAccount() {}
  getServiceByCompany() {}

  getServiceByTransport() {}

  onSelectedVehicle(event) {
    this.selectedTransportPlan.vehicle = event;
    this.selectedTransportPlan.vehicleCategory =
      this.selectedTransportPlan.vehicle.vehicleCategory;
    this.selectedTransportPlan.driver =
      this.selectedTransportPlan.vehicle.driver;
    this.initForm();
  }
  // fin interne

  onSubmit(close = false) {
    this.isFormSubmitted = true;

    if (this.transportPlanForm.invalid) {
      return;
    }

    let formValue = this.transportPlanForm.value;

    this.selectedTransportPlan.account = this.selectOrderTransport.account;

    // this.selectedTransportPlan.purchasePrice =
    //   this.selectedTransport.purchaseAmountHt;
    this.selectedTransportPlan.purchasePrice = formValue["purchasePrice"];

    this.selectedTransportPlan.purchasePriceNegotiated =
      formValue["purchasePriceNegotiated"];
    this.selectedTransportPlan.salePrice = this.selectOrderTransport.priceHT;

    this.selectedTransportPlan.marginRate = this.selectedTransport.marginRate;
    this.selectedTransportPlan.margineService =
      this.selectedTransport.margeService;
    this.selectedTransportPlan.dateDepart = formValue["date"];
    this.selectedTransportPlan.dateValidate = new Date();
    this.selectedTransportPlan.turnStatus = this.selectStatusCree;
  this.selectedTransportPlan.trajet=this.selectOrderTransport.trajet;
    this.calculateAllLines();
    console.log(this.selectedTransportPlan);

    if (this.transportOrCatalog == false) {
      console.log("catalog");

      this.savePlan(close);
    } else if (this.transportOrCatalog == true) {
      console.log("transport");

      this.saveCatalogTransportPricing();
    }
  }

  savePlan(close = false) {
    this.transportPlanService.set(this.selectedTransportPlan).subscribe(
      (data) => {
        this.selectedTransportPlan = data;
        this.changeStatusOrderTransport();
        this.toastr.success(
          "Elément Turn est Enregistré Avec Succès ",
          "Edition"
        );
        if (close) {
          this.router.navigate(["/core/transport-plan/list"]);
        } else {
          this.router.navigate(["/core/transport-plan/edit"]);
          window.location.reload();
        }
      },
      (error) => {
        this.toastr.error(error.error.message);
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  changeStatusOrderTransport() {
    if (this.selectOrderTransport.turnStatus.id == 1) {
      this.selectOrderTransport.turnStatus = this.selectStatusValide;

      this.orderTransportService.set(this.selectOrderTransport).subscribe(
        (data) => {
          this.selectOrderTransport = data;
          this.toastr.success(
            "Elément Turn est Enregistré Avec Succès ",
            "Edition"
          );
        },
        (error) => {
          this.toastr.error(error.error.message);
          this.spinner.hide();
        },
        () => this.spinner.hide()
      );
    }
  }

  onHideDialogVehicle(event) {
    this.showDialogVehicle = event;
  }

  OnSelectedRefus(event) {
    if (
      this.selectOrderTransport.id == null &&
      this.selectOrderTransport.id == undefined
    ) {
      this.toastr.info("Selectionner Commande", "Info");
    } else if (
      this.selectedTransport.id == null &&
      this.selectedTransport.id == undefined
    ) {
      this.toastr.info("Selectionner Transport", "Info");
    } else {
      this.selectTransportPlanHistory = new TransportPlanHistory();
      // this.transportPlanService.find(
      //   "ordertransport.id:" + this.selectOrderTransport.id
      // );
 let existe = 0;
        this.transportPlanHitoryService.find(
        "orderTransport.id:" + this.selectOrderTransport.id +
        ",transport.id:" + this.selectedTransport.transport.id
      ).subscribe(
        data => {
  if(data[0]){
    existe=1;

  }


  if(existe==0 ){

    this.selectTransportPlanHistory.orderTransport =
    this.selectOrderTransport;
  //console.log(this.selectedTransportPlan.id);
  //this.selectTransportPlanHistory.transportPlan =this.selectedTransportPlan
  this.selectTransportPlanHistory.account =
    this.selectOrderTransport.account;
  this.selectTransportPlanHistory.transport =
    this.selectedTransport.transport;
  this.selectTransportPlanHistory.vehicleCategory =
    this.selectOrderTransport.vehicleCategory;
  this.selectTransportPlanHistory.marginRate =
    this.selectedTransport.marginRate;
  this.selectTransportPlanHistory.margineService =
    this.selectedTransport.margeService;
  this.selectTransportPlanHistory.date = new Date();

  console.log(event);
  this.selectTransportPlanHistory.salePrice =
    this.selectOrderTransport.priceHT;
  this.selectTransportPlanHistory.purchasePrice =
    this.selectedTransport.purchaseAmountHt;
  this.selectTransportPlanHistory.trajet =
    this.selectOrderTransport?.trajet;
  this.selectTransportPlanHistory.type = event;
  if (this.selectTransportPlanHistory.type == 4) {
    this.saveTransportPlanHistory();
  } else {
    this.showDialogReject = true;
  }
}else if (existe==1) {
  this.toastr.info("Deja En Attente", "Info");

}
        }
      );




    }
  }

  saveTransportPlanHistory() {
    this.subscriptions.add(
      this.transportPlanHitoryService
        .set(this.selectTransportPlanHistory)
        .subscribe(
          (data) => {
            this.toastr.success(
              "Elément est Enregistré avec succès",
              "Edition"
            );
            //this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément est Enregistré avec succès'});

            // this.loadData();
this.loadTransport(this.selectOrderTransport);
            this.spinner.hide();
          },
          (error) => {
            // this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

            this.toastr.error(error.error.message, "Erreur");
            this.spinner.hide();
          },
          () => this.spinner.hide()
        )
    );
  }
  onShowDialog(event) {
    this.showDialogReject = event;
    this.searchTransportbyOrderInHistory();
  }
  onShowDialogEnAttente(event) {
    this.showDialogEnAttente = event;
  }

  onAffected(event){
  let transportPlanHistoryAffected = new TransportPlanHistory();
  transportPlanHistoryAffected=event;
  console.log(transportPlanHistoryAffected);

  this.catalogTransportPricingService
  .find(
    "turnType.id:" +
      this.selectOrderTransport.turnType.id +
      ",loadingType.id:" +
      this.selectOrderTransport.loadingType.id +
      ",vehicleCategory.tonnage >" +
      this.selectOrderTransport.vehicleCategory.tonnage +
      ",vehicleTray.id:" +
      this.selectOrderTransport.vehicleTray.id +
      ",trajet.id:" +
      this.selectOrderTransport.trajet.id +
      ",transport.id:" +transportPlanHistoryAffected.transport.id

  )
  .subscribe((data) => {
    if (data[0] != null || data[0] != undefined) {
      this.catalogTransportPricingList=[];
      this.catalogTransportPricingList.push(data[0])
    this.selectedTransport=data[0];
    console.log(this.selectedTransport);

    this.selectedTransportPlan.purchasePrice =
    this.selectedTransport.purchaseAmountHt;
    console.log( this.selectedTransportPlan.purchasePrice);

  this.initForm();
    this.catalogPricingService
    .find(
      "turnType.id:" +
        this.selectOrderTransport.turnType.id +
        ",loadingType.id:" +
        this.selectOrderTransport.loadingType.id +
        ",vehicleCategory.id:" +
        this.selectOrderTransport.vehicleCategory.id +
        ",vehicleTray.id:" +
        this.selectOrderTransport.vehicleTray.id +
        ",trajet.id:" +   this.selectOrderTransport.trajet.id

    )
    .subscribe((data) => {
      if (data[0] != null || data[0] != undefined) {
        this.catalogPricing = data[0];
        this.calculateTransportMarge();
      } else {
        this.catalogPricing = new CatalogPricing();
      }
    });    } else {
      this.selectedTransport= null;
    }
  });
this.generatePlanTransport();
this.showDialogEnAttente = false;
  }

  onShowDialogTransportProduct(line, mode) {
    this.showDialogTransportProduct = true;

    if (mode == true) {
      this.selectedTransportProductService = line;
      this.editModeTransportProduct = true;
    } else if (mode == false) {
      this.selectedTransportProductService = new TransportPlanServiceCatalog();
      this.selectedTransportProductService.transport =
        this.selectedTransportPlan.transport;
      this.selectedTransportProductService.account =
        this.selectedTransportPlan.account;
      this.selectedTransportProductService.invoice =
        this.selectedTransportPlan.transport.factureService;

      this.editModeTransportProduct = false;
    }
  }

  onLineEditedTransportProduct(line: TransportPlanServiceCatalog) {
    if (
      this.selectOrderTransport.orderTransportServiceCatalogs == null ||
      this.selectOrderTransport.orderTransportServiceCatalogs == undefined
    ) {
      this.selectOrderTransport.orderTransportServiceCatalogs = [];
    }
    this.selectOrderTransport.orderTransportServiceCatalogs =
      this.selectOrderTransport.orderTransportServiceCatalogs.filter(
        (l) => l.product.code !== line.product.code
      );

    this.selectOrderTransport.orderTransportServiceCatalogs.push(line);
    this.calculateAllLines();
  }
  onDeleteTransportProduct(productCode: string) {
    this.confirmationService.confirm({
      message: "Voulez vous vraiment Supprimer?",
      accept: () => {
        this.selectOrderTransport.orderTransportServiceCatalogs =
          this.selectOrderTransport.orderTransportServiceCatalogs.filter(
            (l) => l.product.code !== productCode
          );
        this.calculateAllLines();
      },
    });
  }
  onHideDialogTransportProduct(event) {
    this.showDialogTransportProduct = event;
  }

  calculateAllLines() {
    this.selectOrderTransport.totalServiceHT = 0;
    this.selectOrderTransport.totalServiceTTC = 0;
    this.selectOrderTransport.totalServiceVat = 0;
    this.selectOrderTransport.totalPriceHT = 0;
    this.selectOrderTransport.totalPriceTTC = 0;
    this.selectOrderTransport.totalPriceVat = 0;
    this.selectOrderTransport?.orderTransportServiceCatalogs.forEach((line) => {
      this.selectOrderTransport.totalServiceHT += +line.totalSalePriceHT;
      this.selectOrderTransport.totalServiceTTC += +line.totalSalePriceTTC;
      this.selectOrderTransport.totalServiceVat += +line.totalSalePriceVat;
    });
    this.selectOrderTransport.totalPriceHT =
      this.selectOrderTransport.priceHT +
      this.selectOrderTransport.totalServiceHT;
    this.selectOrderTransport.totalPriceTTC =
      this.selectOrderTransport.priceTTC +
      this.selectOrderTransport.totalServiceTTC;
    this.selectOrderTransport.totalPriceVat =
      this.selectOrderTransport.priceVat +
      this.selectOrderTransport.totalServiceVat;

    this.selectedTransportPlan.totalServiceHT = 0;
    this.selectedTransportPlan.totalServiceTTC = 0;
    this.selectedTransportPlan.totalServiceVat = 0;
    this.selectedTransportPlan.totalPriceHT = 0;
    this.selectedTransportPlan.totalPriceTTC = 0;
    this.selectedTransportPlan.totalPriceVat = 0;
    this.selectOrderTransport?.orderTransportServiceCatalogs.forEach((line) => {
      console.log(line.totalPurchasePriceHT);

      this.selectedTransportPlan.totalServiceHT += +line.totalPurchasePriceHT;
      this.selectedTransportPlan.totalServiceTTC += +line.totalPurchasePriceTTC;
      this.selectedTransportPlan.totalServiceVat += +line.totalPurchasePriceVat;
    });
    console.log(this.selectedTransportPlan.totalServiceHT);

    this.selectedTransportPlan.totalPriceHT =
      this.selectedTransportPlan.purchasePriceNegotiated +
      this.selectedTransportPlan.totalServiceHT;
    this.selectedTransportPlan.totalPriceTTC =
      this.selectedTransportPlan.purchasePriceTtc +
      this.selectedTransportPlan.totalServiceTTC;
    this.selectedTransportPlan.totalPriceVat =
      this.selectedTransportPlan.purchasePriceVat +
      this.selectedTransportPlan.totalServiceVat;

    this.transportPlanForm.patchValue({
      totalPriceHT: this.selectedTransportPlan.totalPriceHT,
    });
    this.transportPlanForm.patchValue({
      totalPriceTTC: this.selectedTransportPlan.totalPriceTTC,
    });
    this.transportPlanForm.patchValue({
      totalPriceVat: this.selectedTransportPlan.totalPriceVat,
    });
  }

  onLineTarifTransport(event) {
    this.showDialogCatalogTransport = true;
    this.selectCatalogTransportPricing = event;
  }
  onShowDialogTarifTransport() {
    this.transportOrCatalog = true;
    let catalogs = [];
    this.transportService.findAll().subscribe((data) => {
      this.transportOrCatalog = true;
      this.transportList = data;

      this.transportPlanHistoryList.forEach((element) => {
        this.transportList = this.transportList.filter(
          (f) => f.id != element.transport.id
        );
      });

      this.transportList.forEach((element) => {
        let cat: CatalogTransportPricing = new CatalogTransportPricing();
        cat.transport = element;
        cat.id = 1;
        catalogs.push(cat);
        this.catalogTransportPricingList = catalogs;
      });
    });

    // this.showDialogCatalogTransport = true;
    //  this.selectCatalogTransportPricing = new CatalogTransportPricing();
    //   this.selectCatalogTransportPricing.trajet=this.selectOrderTransport.trajet;
    //   this.selectCatalogTransportPricing.turnType=this.selectOrderTransport.turnType;
    //   this.selectCatalogTransportPricing.vehicleCategory=this.selectOrderTransport.vehicleCategory;
    //   this.selectCatalogTransportPricing.vehicleTray=this.selectOrderTransport.vehicleTray;
    //   this.selectCatalogTransportPricing.loadingType=this.selectOrderTransport.loadingType;
  }

  saveCatalogTransportPricing() {
    this.selectCatalogTransportPricing = new CatalogTransportPricing();
    this.selectCatalogTransportPricing.trajet =
      this.selectOrderTransport.trajet;
    this.selectCatalogTransportPricing.turnType =
      this.selectOrderTransport.turnType;
    this.selectCatalogTransportPricing.vehicleCategory =
      this.selectOrderTransport.vehicleCategory;
    this.selectCatalogTransportPricing.vehicleTray =
      this.selectOrderTransport.vehicleTray;
    this.selectCatalogTransportPricing.loadingType =
      this.selectOrderTransport.loadingType;
    this.selectCatalogTransportPricing.transport =
      this.selectedTransport.transport;
    this.selectCatalogTransportPricing.purchaseAmountHt =
      this.selectedTransportPlan.purchasePrice;
    this.selectCatalogTransportPricing.purchaseAmountTva =
      (this.selectCatalogTransportPricing.purchaseAmountHt / 100) *
      this.selectVatService.value;
    this.selectCatalogTransportPricing.purchaseVat = this.selectVatService;
    this.selectCatalogTransportPricing.purchaseAmountTtc +=
      +this.selectCatalogTransportPricing.purchaseAmountHt +
      this.selectCatalogTransportPricing.purchaseAmountTva;

    console.log(this.selectCatalogTransportPricing);

    this.catalogTransportPricingService
      .find(
        "turnType.id:" +
          this.selectCatalogTransportPricing.turnType.id +
          ",loadingType.id:" +
          this.selectCatalogTransportPricing.loadingType.id +
          ",vehicleCategory.tonnage >" +
          this.selectCatalogTransportPricing.vehicleCategory.tonnage +
          ",vehicleTray.id:" +
          this.selectCatalogTransportPricing.vehicleTray.id +
          ",trajet.code~" +
          this.selectCatalogTransportPricing.trajet.code +
          ",transport.id:" +
          this.selectCatalogTransportPricing.transport.id +
          ",transport.active:" +
          true
      )
      .subscribe((data) => {
        if (data[0] != null || data[0] != undefined) {
          console.log(data);

          this.toastr.success("tarif deja existe ", "Info");
        } else {
          this.toastr.success("existe pas ", "Info");

          this.catalogTransportPricingService
            .set(this.selectCatalogTransportPricing)
            .subscribe((data) => {
              this.savePlan();
              this.toastr.info(
                "Elément Tarif est Enregistré Avec Succès  ",
                "Info"
              );
            });
        }
      });
  }
  onHideDialogTarifTransport(event) {
    this.showDialogCatalogTransport = event;
  }
}
