import { OrderTransportInfo } from './../../../shared/models/order-transport-info';
import { VilleService } from './../../../shared/services/api/ville.service';
import { Ville } from './../../../shared/models/ville';
import { CatalogTransportPricingService } from './../../../shared/services/api/catalog-transport-pricing.service';
import { CatalogTransportPricing } from './../../../shared/models/CatalogTransportPricing';
import { TransportPlanProductService } from './../../../shared/models/transport-plan-product-service';
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
import { FormGroup, FormControl } from "@angular/forms";
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

@Component({
  selector: "app-transport-plan-add",
  templateUrl: "./transport-plan-add.component.html",
  styleUrls: ["./transport-plan-add.component.scss"],
})
export class TransportPlanAddComponent implements OnInit {
  selectedTransportPlan: TransportPlan = new TransportPlan();
  transportPlans: TransportPlan[] = [];
  selectOrderTransport: OrderTransport = new OrderTransport();
  orderTransportList: OrderTransport[] = [];
  orderTransportCloneList: OrderTransport[] = [];

  vehicleList: Vehicle[] = [];
  vehicleAvailable: Vehicle[] = [];
  vehicleNotAvailable: Vehicle[] = [];
  showVehicleAvailable: Boolean = false;
  selectedVehicle: Vehicle = new Vehicle();
  driverList: Driver[] = [];
  catalogTransportPricingList: CatalogTransportPricing[] = [];
  selectedTransport: CatalogTransportPricing = new CatalogTransportPricing();
  vehicleCategoryList: VehicleCategory[] = [];
  types: any[] = ["Interne", "Prestataire"];
  breadcrumbItems: MenuItem[];
  home: MenuItem;
  index: number = 0;
  transportPlanForm: FormGroup;
  isInterOrPrestataire: string = "Interne";
  isPriceContract: string = "";

  isFormSubmitted: Boolean = false;
  selectDefaulTransport: Transport = new Transport();
  selectStatusCree: TurnStatus = new TurnStatus();
  selectStatusValide: TurnStatus = new TurnStatus();
  selectedContractAccount: ContractAccount = new ContractAccount();

  lastDeliveryTransportList: Array<TransportPlan[]>=[];
  lastDeliveryTransportInterneList: Array<TransportPlan[]>=[];

  //lastDeliveryTransport: TransportPlan = new TransportPlan();
  villeExterneForLast: string[] = [];
  subscriptions = new Subscription();
  selectedTransportProductService = new TransportPlanProductService();
  editModeTransportProduct: Boolean=false;
  showDialogTransportProduct:Boolean=false;
  villeList:Ville[]=[];
  selectedVilleSource:Ville=new Ville();
  selectedVilleDistination:Ville=new Ville();

  constructor(
    private orderTransportService: OrderTransportService,
    private transportPlanService: TransportPlanService,
    private orderTransportInfoService: OrderTransportInfoService,
    private vehicleService: VehicleService,
    private catalogTransportPricingService: CatalogTransportPricingService,
    private driverService: DriverService,
    private turnStatusService: TurnStatusService,
    private transportService: TransportServcie,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private villeService:VilleService,
    private contractAccountService: ContractAccountService,
    private router: Router,
    private maintenanceService: MaintenanceService,
    private confirmationService:ConfirmationService
  ) {}

  ngOnInit() {
    this.breadcrumbItems = [
      { label: "Plan de  Transport" },
      { label: "Editer", routerLink: "/core/transport-plan/edit" },
    ];
    this.home = { icon: "pi pi-home" };

    this.driverService.findAll().subscribe((data) => {
      this.driverList = data;
    });

    this.loadOrderTransport();

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
        this.selectedTransportPlan.orderTransport?.code
      ),
      vehicle: new FormControl(
        this.selectedTransportPlan?.vehicle?.registrationNumber
      ),
      driver: new FormControl(this.selectedTransportPlan.driver),
      vehicleCategory: new FormControl(
        this.selectedTransportPlan?.vehicleCategory?.code
      ),
      transport: new FormControl(this.selectedTransportPlan?.transport?.name),
      salePrice: new FormControl(this.selectedTransportPlan.salePrice),
      purchasePrice: new FormControl(this.selectedTransportPlan.purchasePrice),
      date: new FormControl(new Date(this.selectedTransportPlan.date)),
    });
  }

  onSelectTypes(event) {
    console.log(event.value);
    this.isInterOrPrestataire = event.value;
    if (
      this.selectOrderTransport.id != null &&
      this.selectOrderTransport.id != undefined
    ) {
      this.loadInterneOrPrestataire(this.selectOrderTransport);
    }
  }

  invert(){
    console.log("click");
    this.resetSearchByVille();
  let villeSource : Ville = new Ville();

  villeSource=this.selectedVilleSource;
  this.selectedVilleSource=this.selectedVilleDistination;
  this.selectedVilleDistination=villeSource;

  }
  resetSearchByVille(){
    this.orderTransportList=this.orderTransportCloneList;
    this.sortOrderTransport();
  }
  searchByVille(){
  let allerList:OrderTransport[]=[];
  let retourList:OrderTransport[]=[];


     allerList=this.orderTransportList.filter(
      f=> f.orderTransportInfoAller?.villeSource?.id == this.selectedVilleSource?.id &&
      f.orderTransportInfoAller?.villeDistination?.id == this.selectedVilleDistination?.id
     );

     retourList=this.orderTransportList.filter(
      f=> f.orderTransportInfoRetour?.villeSource?.id == this.selectedVilleSource?.id &&
      f.orderTransportInfoRetour?.villeDistination?.id == this.selectedVilleDistination?.id
     );

     this.orderTransportList=[];
     this.orderTransportList.push(...allerList);
     this.orderTransportList.push(...retourList);
console.log(this.orderTransportList);
this.sortOrderTransport();

  }


  sortOrderTransport(){
    this.orderTransportList=this.orderTransportList.sort((n1,n2)=> n1.marginRate + n2.marginRate);

  }
  onVilleSearch(event){
    this.villeService
    .find('code~' + event.query)
    .subscribe(data => (this.villeList = data))
   }

   onSelectVilleSource(event){
  this.selectedVilleSource=event;
  this.resetSearchByVille();
   }

   onSelectVilleDistination(event){
    this.selectedVilleDistination=event;
    this.resetSearchByVille();
     }
  onSelectDriver(event) {
    this.selectedTransportPlan.driver = event.value;
  }

  //  List  OrderTransport status cree
  loadOrderTransport() {
    //turnStatus .id =  1 => cree
    this.orderTransportService.find("turnStatus.id:" + 1).subscribe((data) => {
      this.orderTransportList = data;
      this.sortOrderTransport();
      this.orderTransportCloneList=this.orderTransportList;
      this.orderTransportList.forEach((element) => {
        this.orderTransportInfoService
          .find("type~" + "Aller" + ",orderTransport.id:" + element.id)
          .subscribe((data) => {
            element.orderTransportInfoAller = data[0];
          });
        this.orderTransportInfoService
          .find("type~" + "Retour" + ",orderTransport.id:" + element.id)
          .subscribe((data) => {
            element.orderTransportInfoRetour = data[0];
          });
      });
    });
  }

  // button intern or Prestatire Pour Afficher Categorie Vehicule Interne Ou Prestataire
  loadInterneOrPrestataire(event) {
    this.selectOrderTransport =
      event.id != null || event.id != undefined ? event : event.value[0];
    if (this.isInterOrPrestataire == "Interne") {
      console.log("intern");

      this.loadVehicleByCategory();
      this.catalogTransportPricingList = [];
    } else if (this.isInterOrPrestataire == "Prestataire") {
      console.log("prestataire");

      this.loadTransport();
      this.vehicleList = [];
    }
  }

  // List Prestataire from CatalogueTransport  By Category and turnType , Source ,Distination
  loadTransport() {

  let source ,distination ;
if(this.selectOrderTransport.turnType.id== 1 || this.selectOrderTransport.turnType.id==3){
source =  this.selectOrderTransport?.orderTransportInfoAller?.villeSource.code  ;
distination = this.selectOrderTransport?.orderTransportInfoAller
?.villeDistination.code ;
}else {
  source =  this.selectOrderTransport?.orderTransportInfoRetour?.villeSource.code  ;
  distination = this.selectOrderTransport?.orderTransportInfoRetour
  ?.villeDistination.code ;
}


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
          ",villeSource.code~" + source
         +
          ",villeDestination.code~" +distination

      )
      .subscribe((data) => {
        console.log(data);

        if (data[0] != null || data[0] != undefined) {
          this.catalogTransportPricingList = data;
         console.log(this.catalogTransportPricingList);

        } else {
          this.catalogTransportPricingList = [];
        }
      });
  }

  // Disponibilite de vehicule
  loadVehicleByCategory() {
    this.vehicleService
      .find(
        "vehicleCategory.tonnage>" +
          this.selectOrderTransport.vehicleCategory.tonnage
      )
      .subscribe((data) => {
        if (data[0] != null || data[0] != undefined) {
          this.vehicleList = data;
          this.vehicleList.forEach((vehicle) => {
            this.searchVehicleInTranportPlan(vehicle).subscribe((data) => {
 console.log(data);

                vehicle.state = data;
                this.onSelectVehicleAvailable();

            });

            // this.searchVehicleInMaintenance(vehicle).subscribe((data) => {
            //   if (vehicle.state == "Trajet") {
            //     vehicle.state += "-" + data;
            //   } else {
            //     vehicle.state = data;
            //   }
            //   this.onSelectVehicleAvailable();
            // });
          });
        } else {
          this.vehicleList = [];
        }
      });
  }

  onSelectVehicleAvailable() {
    console.log(this.showVehicleAvailable);
    if (this.showVehicleAvailable == true) {
      this.vehicleAvailable = this.vehicleList;
    } else {
      this.vehicleAvailable = this.vehicleList.filter(
        (f) => f.state == "Disponible"
      );
    }
  }

  // searchVehicleInMaintenance(vehicle: Vehicle): Observable<string> {
  //   let state: string = "Disponible";
  //   var subject = new Subject<string>();

  //   this.maintenanceService
  //     .sizeSearch("patrimony.id:" + vehicle.id + ",maintenanceState.id!" + 4)
  //     .subscribe((data) => {
  //       if (data && data > 0) {
  //         console.log("maintenace");

  //         state = "Maintenance";
  //         subject.next(state);
  //       } else {
  //         state = "Disponible";
  //         subject.next(state);
  //       }
  //     });
  //   return subject.asObservable();
  // }

  searchVehicleInTranportPlan(vehicle: Vehicle): Observable<string> {
    let state: string = "Disponible";
    var subject = new Subject<string>();
    this.transportPlanService
      .sizeSearch(
        "vehicle.registrationNumber:" +
          vehicle.registrationNumber +
          ",turnStatus.id!" +
          2
      )
      .subscribe((data) => {
        console.log(vehicle.registrationNumber);
        console.log(data);

        if (data && data > 0) {
          state = "Trajet";
          subject.next(state);
        } else {
          state = "Disponible";
          subject.next(state);
        }
      });
    return subject.asObservable();
  }
  // fin Available

  ////  afficher dernier prix dernier achat prestataire
  loadLastTranportPlanPrestataires() {
    // if (this.isInterOrPrestataire == "Interne") {
    //   this.selectedTransportPlan.transport = this.selectDefaulTransport;
    // }
    this.transportPlanService
      .getLastPriceTransportPlans(
        "orderTransport.turnType.id:" +
          this.selectedTransportPlan.orderTransport.turnType.id +
          ",vehicleCategory.id:" +
          this.selectedTransportPlan?.vehicleCategory?.id +
          ",transport.id:" +
          this.selectedTransportPlan.transport.id
      )
      .subscribe((data) => {

       this.lastDeliveryTransportList=[];
        this.lastDeliveryTransportList=data;
        console.log( this.lastDeliveryTransportList);
      });
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
    console.log(event.value[0]);
    this.selectedVehicle = event.value[0];
  }
  onselectTransport(event) {
    console.log(event.value[0]);
    this.selectedTransport = event.value[0];
  }

  affectedTransport() {
    if (
      this.selectOrderTransport.id == null &&
      this.selectOrderTransport.id == undefined
    ) {
      this.toastr.info("Selectionner Commande", "Info");
    } else if (this.isInterOrPrestataire == "Interne") {
      if (
        this.selectedVehicle.id == null &&
        this.selectedVehicle.id == undefined
      ) {
        this.toastr.info("Selectionner Véhicule", "Info");
      } else {
        this.generatePlanTransport();
      }
    } else if (this.isInterOrPrestataire == "Prestataire") {
      if (
        this.selectedTransport.id == null &&
        this.selectedTransport.id == undefined
      ) {
        this.toastr.info("Selectionner Transport", "Info");
      } else {
        this.generatePlanTransport();
      }
    } else {
      this.generatePlanTransport();
    }
  }

  generatePlanTransport() {
    this.selectedTransportPlan.orderTransport = this.selectOrderTransport;
    console.log(this.selectOrderTransport);
    if (
      this.selectedTransportPlan.orderTransport.turnType.id == 1 ||
      this.selectedTransportPlan.orderTransport.turnType.id == 3
    ) {
      this.selectedTransportPlan.villeSource =
        this.selectOrderTransport.orderTransportInfoAller.villeSource.code;
      this.selectedTransportPlan.villeDistination =
        this.selectOrderTransport.orderTransportInfoAller.villeDistination.code;
      // this.loadContractAccountbyAccountSelectedAller(
      //   this.selectedTransportPlan.vehicleCategory
      // );
    }
    if (this.selectedTransportPlan.orderTransport.turnType.id == 2) {
      this.selectedTransportPlan.villeSource =
        this.selectOrderTransport.orderTransportInfoRetour.villeSource.code;
      this.selectedTransportPlan.villeDistination =
        this.selectOrderTransport.orderTransportInfoRetour.villeDistination.code;
      // this.loadContractAccountbyAccountSelectedRetour(
      //   this.selectedTransportPlan.vehicleCategory
      // );
    }
    if (this.isInterOrPrestataire == "Interne") {
      this.catalogTransportPricingService
        .find(
          "turnType.id:" +
            this.selectOrderTransport.turnType.id +
            ",vehicleCategory.id:" +
            this.selectOrderTransport.vehicleCategory.id +
            ",villeSource.code~" +
            this.selectOrderTransport?.orderTransportInfoAller
              ?.villeSource.code +
            ",villeDestination.code~" +
            this.selectOrderTransport?.orderTransportInfoAller
              ?.villeDistination.code +
            ",transport.id:" +
            this.selectDefaulTransport.id
        )
        .subscribe((data) => {
          console.log("catalog");

          console.log(data);

          this.catalogTransportPricingList = data;
          this.selectedTransportPlan.vehicle = this.selectedVehicle;
          this.selectedTransportPlan.transport = this.selectDefaulTransport;
          this.selectedTransportPlan.driver = this.selectedVehicle.driver;
          this.selectedTransportPlan.vehicleCategory =
            this.selectedVehicle.vehicleCategory;
          this.selectedTransportPlan.salePrice =
            this.selectOrderTransport.priceHT;
            this.selectedTransportPlan.purchasePrice =this.calculateCostPrice();
          this.loadLastTranportPlanPrestataires();
          this.initForm();
        });
    } else if (this.isInterOrPrestataire == "Prestataire") {
      this.selectedTransportPlan.transport = this.selectedTransport.transport;
      this.selectedTransportPlan.vehicleCategory =
        this.selectedTransport.vehicleCategory;
      this.selectedTransportPlan.purchasePrice =
        this.selectOrderTransport.priceHT;
      this.selectedContractAccount = new ContractAccount();
      this.loadLastTranportPlanPrestataires();
    }

    this.initForm();
  }

  calculateCostPrice() : number{
   let sumDistance :number = 0;

   if(this.selectedTransportPlan.orderTransport.turnType.id==1 || this.selectedTransportPlan.orderTransport.turnType.id==3){
    sumDistance += this.selectOrderTransport.orderTransportInfoAller.numberKm;
   }
   if(this.selectedTransportPlan.orderTransport.turnType.id==2 || this.selectedTransportPlan.orderTransport.turnType.id==3){
    sumDistance += this.selectOrderTransport.orderTransportInfoRetour.numberKmRetour;
   }
 console.log(sumDistance);
 console.log(this.selectedTransportPlan.vehicleCategory.priceKm);


   return (sumDistance* this.selectedTransportPlan.vehicleCategory.priceKm);
  }

  // fin interne

  onSubmit(close = false) {
    this.isFormSubmitted = true;

    if (this.transportPlanForm.invalid) {
      return;
    }

    let formValue = this.transportPlanForm.value;

    this.selectedTransportPlan.salePrice = formValue["salePrice"];
    this.selectedTransportPlan.date = formValue["date"];
    this.selectedTransportPlan.turnStatus = this.selectStatusCree;
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
    console.log(this.selectOrderTransport);
    if (this.selectOrderTransport.turnStatus.id == 1) {
      this.selectOrderTransport.turnStatus = this.selectStatusValide;
      console.log(this.selectOrderTransport);

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


  onHideDialogTransportProduct(event) {
    this.showDialogTransportProduct = event;
  }

  onShowDialogTransportProduct(line, mode) {
    this.showDialogTransportProduct = true;

    if (mode == true) {


      this.selectedTransportProductService= line;
      this.editModeTransportProduct = true;
    } else if (mode == false) {

      this.selectedTransportProductService = new TransportPlanProductService();
      this.editModeTransportProduct = false;
    }
  }

  onLineEditedTransportProduct(line: TransportPlanProductService) {
    console.log(line);

    if (
      this.selectedTransportPlan.transportPlanProductServices == null ||
      this.selectedTransportPlan.transportPlanProductServices == undefined
    ) {
      this.selectedTransportPlan.transportPlanProductServices = [];
    }
    this.selectedTransportPlan.transportPlanProductServices =   this.selectedTransportPlan.transportPlanProductServices.filter(
      (l) => l.product.code !== line.product.code
    );
    this.selectedTransportPlan.transportPlanProductServices.push(line);

  }
  onDeleteTransportProduct(productCode: string) {
    this.confirmationService.confirm({
      message: "Voulez vous vraiment Suprimer?",
      accept: () => {
        this.selectedTransportPlan.transportPlanProductServices =
        this.selectedTransportPlan.transportPlanProductServices.filter((l) => l.product.code !== productCode);
      },
    });
  }



   // search contract by account aller
  // loadContractAccountbyAccountSelectedAller(vehicleCategory: VehicleCategory) {
  //   console.log(
  //     this.selectOrderTransport.orderTransportInfoAller.addressContactInitial
  //       .date
  //   );
  //   let searchcontract = new EmsBuffer();

  //   searchcontract.append(
  //     "turnType.id:" + this.selectOrderTransport.turnType.id
  //   );

  //   searchcontract.append("vehicleCategory.id:" + vehicleCategory.id);
  //   searchcontract.append(
  //     "source.code~" +
  //       this.selectOrderTransport.orderTransportInfoAller.addressContactInitial
  //         .city
  //   );
  //   searchcontract.append(
  //     "source.code~" +
  //       this.selectOrderTransport.orderTransportInfoAller.addressContactInitial
  //         .city
  //   );
  //   searchcontract.append(
  //     "startDate<" +
  //       new Date(
  //         this.selectOrderTransport.orderTransportInfoAller.addressContactInitial.date
  //       ).toISOString()
  //   );
  //   searchcontract.append(
  //     "endDate>" +
  //       new Date(
  //         this.selectOrderTransport.orderTransportInfoAller.addressContactInitial.date
  //       ).toISOString()
  //   );
  //   console.log(searchcontract.getValue());

  //   this.searchContractAccount(searchcontract.getValue());
  // }

  // loadContractAccountbyAccountSelectedRetour(vehicleCategory: VehicleCategory) {
  //   console.log(
  //     this.selectOrderTransport.orderTransportInfoRetour.addressContactInitial
  //       .date
  //   );
  //   let searchcontract = new EmsBuffer();

  //   searchcontract.append(
  //     "turnType.id:" + this.selectOrderTransport.turnType.id
  //   );

  //   searchcontract.append("vehicleCategory.id:" + vehicleCategory.id);
  //   searchcontract.append(
  //     "source.code~" +
  //       this.selectOrderTransport.orderTransportInfoRetour.addressContactInitial
  //         .city
  //   );
  //   searchcontract.append(
  //     "source.code~" +
  //       this.selectOrderTransport.orderTransportInfoRetour.addressContactInitial
  //         .city
  //   );
  //   searchcontract.append(
  //     "startDate<" +
  //       new Date(
  //         this.selectOrderTransport.orderTransportInfoRetour.addressContactInitial.date
  //       ).toISOString()
  //   );
  //   searchcontract.append(
  //     "endDate>" +
  //       new Date(
  //         this.selectOrderTransport.orderTransportInfoRetour.addressContactInitial.date
  //       ).toISOString()
  //   );
  //   console.log(searchcontract.getValue());

  //   this.searchContractAccount(searchcontract.getValue());
  // }

  // searchContractAccount(search: string) {
  //   this.contractAccountService.find(search).subscribe((data) => {
  //     console.log("contract");

  //     this.selectedContractAccount = data[0];
  //     console.log(data);
  //   });
  // }
}
