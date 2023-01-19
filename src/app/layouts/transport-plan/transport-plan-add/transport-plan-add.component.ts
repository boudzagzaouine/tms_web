import { element } from 'protractor';
import { Account } from './../../../shared/models/account';
import { CatalogTransportAccountPricingService } from './../../../shared/services/api/catalog-transport-account-pricing.service';
import { TransportPlanHistoryService } from './../../../shared/services/api/transport-plan-history.service';
import { TransportPlanHistory } from './../../../shared/models/transport-plan-history';
import { CatalogPricingService } from '../../../shared/services/api/catalog-pricing.service';
import { CatalogPricing } from './../../../shared/models/catalog-pricing';
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
  selectTransportPlanHistory :TransportPlanHistory=new TransportPlanHistory();

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

  lastDeliveryTransportList: Array<TransportPlan[]>=[];
  lastDeliveryTransportInterneList: Array<TransportPlan[]>=[];

  //lastDeliveryTransport: TransportPlan = new TransportPlan();
  villeExterneForLast: string[] = [];
  subscriptions = new Subscription();
  selectedTransportProductService = new TransportPlanProductService();
  editModeTransportProduct: Boolean=false;
  showDialogTransportProduct:Boolean=false;
  showDialogReject:Boolean=false;
  villeList:Ville[]=[];
  selectedVilleSource:Ville=new Ville();
  selectedVilleDistination:Ville=new Ville();
  catalogPricing :CatalogPricing=new CatalogPricing();
  showDialogVehicle:Boolean=false;
  constructor(
    private orderTransportService: OrderTransportService,
    private transportPlanService: TransportPlanService,
    private orderTransportInfoService: OrderTransportInfoService,
    private vehicleService: VehicleService,
    private catalogTransportPricingService: CatalogTransportPricingService,
    private catalogTransportAccountPricingService: CatalogTransportAccountPricingService,

    private driverService: DriverService,
    private turnStatusService: TurnStatusService,
    private transportService: TransportServcie,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private villeService:VilleService,
    private router: Router,
    private maintenanceService: MaintenanceService,
    private confirmationService:ConfirmationService,
    private catalogPricingService:CatalogPricingService,
    private  transportPlanHitoryService: TransportPlanHistoryService
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
  sortOrderTransport(){
    this.orderTransportList=this.orderTransportList.sort((n1,n2)=> n2.marginRate - n1.marginRate);

  }

   // List Prestataire from CatalogueTransport  By Category and turnType , Source ,Distination
   loadTransport(event) {
    this.selectOrderTransport =   event.id != null || event.id != undefined ? event : event.value[0];

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
          +
          ",transport.active:" +true
      )
      .subscribe((data) => {
        console.log(data);

        if (data[0] != null || data[0] != undefined) {
          this.catalogTransportPricingList = data;
          this.searchTransportbyOrderInHistory();


         console.log(this.catalogTransportPricingList);

        } else {
          this.catalogTransportPricingList = [];
        }
      });
  }

  searchTransportbyOrderInHistory(){



      this.transportPlanHitoryService.find('orderTransport.id:'+this.selectOrderTransport.id).subscribe(
        data => {

 console.log(data);
console.log( this.catalogTransportPricingList);
if(data[0]!=null){
data.forEach(element => {
this.catalogTransportPricingList=this.catalogTransportPricingList.filter(
  f=> f.transport.id!=element.transport.id)


});
}
this.calculateMargeServiceTransport();
this.onSearchCatalgPrice();

        }
      );




  }


  onSearchCatalgPrice(){
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
        ",villeSource.code~" + source
       +
        ",villeDestination.code~" +distination

    )
    .subscribe((data) => {
      console.log(data);

      if (data[0] != null || data[0] != undefined) {
        this.catalogPricing = data[0];
        this.calculateTransportMarge();
       console.log(this.catalogPricing);

      } else {
        this.catalogPricing = new CatalogPricing();
      }
    });
  }

  calculateMargeServiceTransport(){
     let totalPlan :number=0;
     let totalReject :number=0;
    this.catalogTransportPricingList.forEach(element => {
        this.totalPlanByTrasnport(element.transport).subscribe(
          data=> {
             element.margeService =data ? data :0;
          }
        );
    })


  }
  totalPlanByTrasnport(transport :Transport):Observable<number>{
    let total :number=0;
    let totalPlan: number = 0;
    let totalReject :number=0;
    var subject = new Subject<number>();
    this.transportPlanService.sizeSearch('transport.id:'+transport.id).subscribe(
        data=>{
          console.log("total Plan ");

          console.log(data);

            totalPlan=data ? data : 0;

          this.totalRejectByTrasnport(transport).subscribe(
           dataR=>{
            console.log("total Reject ");
 console.log(dataR);

               totalReject=dataR ? dataR :0;

               total= (totalPlan -totalReject)/totalPlan;
              console.log("total");

               console.log("totalPlan " +totalPlan +" tatal reject "+ totalReject + " total "+ total);
subject.next(total);
           }
          );


        }
    );
    return subject.asObservable();

  }

  totalRejectByTrasnport(transport :Transport):Observable<number>{
    let total: number = 0;
    var subject = new Subject<number>();
    this.transportPlanHitoryService.sizeSearch('transport.id:'+transport.id).subscribe(
        data=>{
          console.log(data);

          if(data)
            total=data;
            subject.next(total);
        }
    );
    return subject.asObservable();

  }

  calculateTransportMarge(){

    this.catalogTransportPricingList.forEach(element => {
    this.searchTransportAccountPricing(element.transport).subscribe(
      data=> {
        if(data>0){
          console.log("account Pricing");

    let purchase=  data;
        let sale=   this.catalogPricing.saleAmountHt;
        console.log("p "+purchase +" s "+sale );
      element.marginRate=((sale-purchase)/purchase)*100;
      console.log("marg:"+element.marginRate);

        } else {
          console.log(" Pricing");

          let purchase=  element.purchaseAmountHt;
          let sale=   this.catalogPricing.saleAmountHt;
          console.log("p "+purchase +" s "+sale );
        element.marginRate=((sale-purchase)/purchase)*100;
        console.log("marg:"+element.marginRate);
        }

      }

    );





    });
 this.catalogTransportPricingList=this.catalogTransportPricingList.sort((n1,n2)=> n2.marginRate - n1.marginRate);





      }



      searchTransportAccountPricing(transport:Transport): Observable<number> {
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
        let purcahse: number = 0;
        var subject = new Subject<number>();
        this.catalogTransportAccountPricingService
          .find(
            "company.id:" +this.selectOrderTransport.company.id+
            ",transport.id:" +transport.id+
            ",turnType.id:" +
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

            if (data[0]!=null) {
              purcahse = data[0].purchaseAmountHt;
              console.log(purcahse);

              subject.next(purcahse);
            } else {
              purcahse = 0;
              subject.next(purcahse);
            }
          });
        return subject.asObservable();
      }



  onVilleSearch(event){
    this.villeService
    .find('code~' + event.query)
    .subscribe(data => (this.villeList = data))
   }
   invertVille(){
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
    }
      else if (
        this.selectedTransport.id == null &&
        this.selectedTransport.id == undefined
      ) {
        this.toastr.info("Selectionner Transport", "Info");
       }
      else {
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
        this.selectOrderTransport.orderTransportInfoAller.villeSource;
      this.selectedTransportPlan.villeDistination =
        this.selectOrderTransport.orderTransportInfoAller.villeDistination;
      // this.loadContractAccountbyAccountSelectedAller(
      //   this.selectedTransportPlan.vehicleCategory
      // );
    }
    if (this.selectedTransportPlan.orderTransport.turnType.id == 2) {
      this.selectedTransportPlan.villeSource =
        this.selectOrderTransport.orderTransportInfoRetour.villeSource;
      this.selectedTransportPlan.villeDistination =
        this.selectOrderTransport.orderTransportInfoRetour.villeDistination;
      // this.loadContractAccountbyAccountSelectedRetour(
      //   this.selectedTransportPlan.vehicleCategory
      // );
    }

    this.selectedTransportPlan.vehicleCategory=this.selectOrderTransport.vehicleCategory;
  this.selectedTransportPlan.transport=this.selectedTransport.transport;
if(this.selectedTransportPlan.transport.interneOrExterne==true){
  this.isInterOrPrestataire=true;
   this.showDialogVehicle=true;
}
else{
  this.isInterOrPrestataire=false;
   this.showDialogVehicle=false;
   this.selectedTransportPlan.vehicle=null;
   this.selectedTransportPlan.driver=null;
}

    this.initForm();
  }

  onSelectedVehicle(event){
   this.selectedTransportPlan.vehicle=event;
   this.selectedTransportPlan.vehicleCategory=this.selectedTransportPlan.vehicle.vehicleCategory;
   this.selectedTransportPlan.driver=this.selectedTransportPlan.vehicle.driver;
   this.initForm();

  }
  // fin interne

  onSubmit(close = false) {
    this.isFormSubmitted = true;

    if (this.transportPlanForm.invalid) {
      return;
    }

    let formValue = this.transportPlanForm.value;
    this.selectedTransportPlan.purchasePrice = this.selectedTransport.purchaseAmountHt;
    this.selectedTransportPlan.salePrice = this.catalogPricing.saleAmountHt;
    this.selectedTransportPlan.marginRate = this.selectedTransport.marginRate;
    this.selectedTransportPlan.margineService = this.selectedTransport.margeService;
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



  onHideDialogVehicle(event) {
    this.showDialogVehicle = event;
  }




  OnSelectedRefus(event){

    if (
      this.selectOrderTransport.id == null &&
      this.selectOrderTransport.id == undefined
    ) {
      this.toastr.info("Selectionner Commande", "Info");
    }
      else if (
        this.selectedTransport.id == null &&
        this.selectedTransport.id == undefined
      ) {
        this.toastr.info("Selectionner Transport", "Info");
       }
      else {
  this.selectTransportPlanHistory = new TransportPlanHistory();
  this.selectTransportPlanHistory.orderTransport=this.selectOrderTransport;
  this.selectTransportPlanHistory.transport=this.selectedTransport.transport;
  this.selectTransportPlanHistory.vehicleCategory=this.selectOrderTransport.vehicleCategory;
  this.selectTransportPlanHistory.marginRate=this.selectedTransport.marginRate;
  this.selectTransportPlanHistory.margineService=this.selectedTransport.margeService;
  this.selectTransportPlanHistory.salePrice=this.selectOrderTransport.priceHT;
  this.selectTransportPlanHistory.purchasePrice=this.selectedTransport.purchaseAmountHt;
if(this.selectOrderTransport.turnType.id == 1 || this.selectOrderTransport.turnType.id == 3){
  console.log("aller ");
console.log(this.selectOrderTransport.orderTransportInfoAller.villeSource.code);

 this.selectTransportPlanHistory.villeSource=this.selectOrderTransport?.orderTransportInfoAller?.villeSource;
  this.selectTransportPlanHistory.villeDistination=this.selectOrderTransport?.orderTransportInfoAller?.villeDistination;

}else if(this.selectOrderTransport.turnType.id == 2){
  this.selectTransportPlanHistory.villeSource=this.selectOrderTransport?.orderTransportInfoRetour?.villeSource;
  this.selectTransportPlanHistory.villeDistination=this.selectOrderTransport?.orderTransportInfoRetour?.villeDistination;
}

  this.selectTransportPlanHistory.type=event;
      this.showDialogReject=true;
      }
  }


onShowDialog(event) {

  this.showDialogReject = event;
  this.searchTransportbyOrderInHistory();
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
