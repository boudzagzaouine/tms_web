import { TurnTypeService } from './../../../shared/services/api/turn-type.service';
import { AgencyService } from './../../../shared/services/api/agency.service';
import { ZoneVilleService } from './../../../shared/services/api/zone-ville.service';
import { Agency } from './../../../shared/models/agency';
import { TurnType } from './../../../shared/models/turn-Type';
import { AuthenticationService } from './../../../shared/services/api/authentication.service';
import { TransportPlanHistoryService } from './../../../shared/services/api/transport-plan-history.service';
import { CatalogPricingService } from './../../../shared/services/api/catalog-pricing.service';
import { Router } from '@angular/router';
import { VilleService } from './../../../shared/services/api/ville.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TransportServcie } from './../../../shared/services/api/transport.service';
import { TurnStatusService } from './../../../shared/services/api/turn-status.service';
import { DriverService } from './../../../shared/services/api/driver.service';
import { TransportServiceService } from './../../../shared/services/api/transport-service.service';
import { VatService } from './../../../shared/services/api/vat.service';
import { TransportAccountServiceService } from './../../../shared/services/api/transport-account-service.service';
import { CatalogTransportAccountPricingService } from './../../../shared/services/api/catalog-transport-account-pricing.service';
import { CatalogTransportPricingService } from './../../../shared/services/api/catalog-transport-pricing.service';
import { OrderTransportInfoService } from './../../../shared/services/api/order-transport-info.service';
import { TransportPlanService } from './../../../shared/services/api/transport-plan.service';
import { OrderTransportService } from './../../../shared/services/api/order-transport.service';
import { Vat } from './../../../shared/models/vat';
import { TransportPlanServiceCatalog } from './../../../shared/models/transport-plan-service-catalog';
import { CatalogPricing } from './../../../shared/models/catalog-pricing';
import { Ville } from './../../../shared/models/ville';
import { Subscription, Observable, Subject } from 'rxjs';
import { ContractAccount } from './../../../shared/models/contract-account';
import { TurnStatus } from './../../../shared/models/turn-status';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { VehicleCategory } from './../../../shared/models/vehicle-category';
import { Driver } from './../../../shared/models/driver';
import { Vehicle } from './../../../shared/models/vehicle';
import { CatalogTransportPricing } from './../../../shared/models/CatalogTransportPricing';
import { TransportPlanHistory } from './../../../shared/models/transport-plan-history';
import { OrderTransport } from './../../../shared/models/order-transport';
import { TransportPlan } from './../../../shared/models/transport-plan';
import { Component, OnInit } from '@angular/core';
import { Transport } from './../../../shared/models/transport';

@Component({
  selector: 'app-affectation-retour-edit',
  templateUrl: './affectation-retour-edit.component.html',
  styleUrls: ['./affectation-retour-edit.component.scss']
})
export class AffectationRetourEditComponent implements OnInit {

  selectedTransportPlan: TransportPlan = new TransportPlan();
  selectOrderTransport: OrderTransport = new OrderTransport();
  orderTransportList: OrderTransport[] = [];
  orderTransportCloneList: OrderTransport[] = [];
  selectTransportPlanHistory: TransportPlanHistory = new TransportPlanHistory();
  selectCatalogTransportPricing = new CatalogTransportPricing();
  transportPlanHistoryList: TransportPlanHistory[] = [];
  transportList: Transport[] = [];
  // selectedVehicle: Vehicle = new Vehicle();
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

  transportPlanList:TransportPlan[]=[];
  villeUserList:Ville[]=[];
  selectAgency:Agency=new Agency();
  selectedTurnType : TurnType=new TurnType();
  transportPlanRetourList:TransportPlan[]=[];
  selectedTransportPlanRetour:TransportPlan=new TransportPlan();
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
    private transportPlanHitoryService: TransportPlanHistoryService,
    private zoneVilleService:ZoneVilleService,
    private agencyService:AgencyService,
    private authenticationService : AuthenticationService
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
    this.getAgencyByUser();

    this.vatService.findById(4).subscribe((data) => {
      this.selectVatService = data;
    });

    this.transportService.find("id:"+10152).subscribe((data) => {
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


  onSelectedOrderTransport(event){
    this.selectOrderTransport =
    event.id != null || event.id != undefined ? event : event.value[0];

  }
  onselectVehicle(event){
    this.selectedTransportPlanRetour =
    event.id != null || event.id != undefined ? event : event.value[0];
    this.loadTarification();
  }

  loadData(villes:string){
 console.log("Buffer");
 console.log(villes);


    this.transportPlanService.find('transport.interneOrExterne:true,turnStatus.id!2;3;4,orderTransport.turnType.id:1,trajet.villeDestination.id?'+villes).subscribe(
      data=>{

        this.transportPlanRetourList=data;
        console.log(this.transportPlanRetourList);

      }
    );

  }
  getAgencyByUser(){
this.agencyService.find('responsable.id:'+this.authenticationService.getCurrentUser().id).subscribe(
  data=>{
    console.log(" data agence");
console.log(data);

    if(data[0]){
      console.log("existe agency");

 this.selectAgency=data[0];
 if(this.selectAgency.zone.id>0){
  console.log("existe zone ");

  this.getZoneVille(this.selectAgency)
 }
    }
  }
);

  }
  getZoneVille(agency:Agency){
 this.zoneVilleService.find('zone.id:'+agency.zone.id).subscribe(
  data=>{
if(data[0]){
  console.log("exite zone ville ");
console.log(data);

  this.villeList=data.map(m=>m.ville);
  console.log(this.villeList);

  if(this.villeList[0]){
    console.log("exite ville ");
console.log(this.villeList);

    let buffer = '';
    this.villeList.forEach(ville => {
      if (buffer.length > 0) {
        buffer += ';';
    }
    buffer += ville.id;
    });
this.loadData(buffer);
  }
}
  }
 );
  }
  //  List  OrderTransport status cree
  loadOrderTransport() {
    this.transportOrCatalog = false;
    console.log(this.transportOrCatalog);

    //turnStatus .id =  1 => cree
    this.orderTransportService.find("user.id:"+this.authenticationService.getCurrentUser().id+",turnStatus.id:" + 1+",turnType.id:"+2).subscribe((data) => {
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
  }






  // List Prestataire from CatalogueTransport  By Category and turnType , Source ,Distination
  loadTarification() {
    this.transportOrCatalog = false;
console.log(this.selectedTransportPlanRetour);
    let trajet;
    this.catalogTransportPricingService
      .find(
        "turnType.id:" +
          this.selectOrderTransport.turnType.id +
          ",loadingType.id:" +
          this.selectOrderTransport.loadingType.id +
          ",vehicleCategory.id:" +
          this.selectedTransportPlanRetour.vehicle.vehicleCategory.id +
          ",vehicleTray.id:" +
          this.selectOrderTransport.vehicleTray.id +
          ",trajet.id:" +
          this.selectOrderTransport?.trajet?.id +
          ",transport.id:" +this.selectDefaulTransport.id

      )
      .subscribe((data) => {
        if (data[0] != null || data[0] != undefined) {
          this.catalogTransportPricingList = data;
          this.selectedTransportPlan.purchasePrice =
    this.catalogTransportPricingList[0] .purchaseAmountHt;
        this.initForm();
          console.log("catalogTransportPricingList");
console.log(this.catalogTransportPricingList);
          //this.searchTransportbyOrderInHistory();
        } else {
          console.log("pas tarificcation");

          this.catalogTransportPricingList = [];
        }
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
          //this.calculateTransportMarge();


        } else {
          this.catalogPricing = new CatalogPricing();
        }
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
    //this.sortOrderTransportByValeur();
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
    //this.sortOrderTransportByValeur();
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
    this.selectedTransportPlanRetour = event.value[0];
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
      this.selectedTransportPlanRetour.id == null &&
      this.selectedTransportPlanRetour.id == undefined
    ) {
      this.toastr.info("Selectionner Vehicule", "Info");
    } else {


      this.generatePlanTransport();


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
    this.selectedTransportPlan.transport = this.selectDefaulTransport;
    console.log(this.selectedTransportPlanRetour);

    this.selectedTransportPlan.salePrice = this.selectOrderTransport.priceHT;

this.selectedTransportPlan.vehicle=this.selectedTransportPlanRetour?.vehicle;
this.selectedTransportPlan.driver=this.selectedTransportPlanRetour?.driver;



    this.selectedTransportPlan.purchaseVat = this.selectedTransportPlanRetour.purchaseVat;



    // this.affectedService();
    // if (this.selectedTransportPlan.transport.interneOrExterne == true) {
    //   this.isInterOrPrestataire = true;
    //   this.showDialogVehicle = true;
    // } else {
    //   this.isInterOrPrestataire = false;
    //   this.showDialogVehicle = false;
    //   this.selectedTransportPlan.vehicle = null;
    //   this.selectedTransportPlan.driver = null;
    // }

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
              this.selectedTransport.transport.id +
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
