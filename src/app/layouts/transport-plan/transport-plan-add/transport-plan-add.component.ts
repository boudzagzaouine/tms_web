import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { MaintenancePlan } from './../../../shared/models/maintenance-plan';
import { MaintenanceService } from './../../../shared/services/api/maintenance.service';
import { Maintenance } from './../../../shared/models/maintenance';
import { Router } from '@angular/router';
import { LoadCategorySaleOrder } from './../../../shared/models/load-category-saleOrder';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ContractAccount } from './../../../shared/models/contract-account';
import { ContractAccountService } from './../../../shared/services/api/contract-account.service';
import { TurnStatusService } from './../../../shared/services/api/turn-status.service';
import { TurnStatus } from './../../../shared/models/turn-status';
import { TransportServcie } from './../../../shared/services/api/transport.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TransportPlanService } from './../../../shared/services/api/transport-plan.service';
import { DriverService } from './../../../shared/services/api/driver.service';
import { TransportPlan } from './../../../shared/models/transport-plan';
import { Driver } from './../../../shared/models/driver';
import { FormGroup, FormControl } from '@angular/forms';
import { Transport } from './../../../shared/models/transport';
import { CatalogTransportType } from './../../../shared/models/CatalogTransportType';
import { CatalogTransportTypeServcie } from './../../../shared/services/api/Catalog-Transport-Type.service';
import { VehicleCategory } from './../../../shared/models/vehicle-category';
import { VehicleCategorieComponent } from './../../settings/vehicle-categorie/vehicle-categorie.component';
import { VehicleService } from './../../../shared/services/api/vehicle.service';
import { Vehicle } from './../../../shared/models/vehicle';
import { OrderTransportInfoService } from './../../../shared/services/api/order-transport-info.service';
import { OrderTransport } from './../../../shared/models/order-transport';
import { OrderTransportService } from './../../../shared/services/api/order-transport.service';
import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transport-plan-add',
  templateUrl: './transport-plan-add.component.html',
  styleUrls: ['./transport-plan-add.component.scss']
})
export class TransportPlanAddComponent implements OnInit {


  selectedTransportPlan :TransportPlan =new TransportPlan();
  transportPlans :TransportPlan[]=[];
  selectOrderTransport :OrderTransport = new OrderTransport();
  orderTransportList : OrderTransport[]=[];
  vehicleList:Vehicle[]=[];
  selectedVehicle :Vehicle= new Vehicle();
  driverList:Driver[]=[];
  catalogTransportTypeList:CatalogTransportType[]=[];
  selectedTransport :CatalogTransportType= new CatalogTransportType();
  vehicleCategoryList :VehicleCategory[]=[];
  types :any[]=["Interne","Prestataire"]
  breadcrumbItems: MenuItem[];
  home: MenuItem;
  index: number = 0;
  transportPlanForm: FormGroup;
  isInterOrPrestataire: string = "Interne";
  isPriceContract: string = "";

  isFormSubmitted :Boolean =false;
  selectDefaulTransport :Transport = new Transport();
  selectStatusCree :TurnStatus = new TurnStatus();
  selectStatusValide :TurnStatus = new TurnStatus();
  selectedContractAccount :ContractAccount=new ContractAccount();

  lastDeliveryTransports : TransportPlan[]=[];

  constructor(private orderTransportService : OrderTransportService,
                private transportPlanService :TransportPlanService,
                private orderTransportInfoService : OrderTransportInfoService,
                private vehicleService : VehicleService,
                private catalogTransportTypeService :CatalogTransportTypeServcie,
                private driverService :DriverService,
                private turnStatusService :TurnStatusService,
                private transportService :TransportServcie,
                private spinner: NgxSpinnerService,
                private toastr: ToastrService,
                private contractAccountService:ContractAccountService,
                private router: Router,
                private maintenanceService :MaintenanceService,


                ) { }

  ngOnInit() {

    this.breadcrumbItems = [
      { label: "Plan de  Transport" },
      { label: "Editer", routerLink: "/core/transport-plan/edit" },
    ];
    this.home = { icon: "pi pi-home" };

this.driverService.findAll().subscribe(
  data => {
      this.driverList =data;
  }
);

    this.loadOrderTransport();

    this.transportService.find("id:"+10147).subscribe(
      data =>{
            this.selectDefaulTransport =data[0];
      }
    );
    this.turnStatusService.find("id:"+1).subscribe(
      data =>{
            this.selectStatusCree =data[0];
      }
    );
    this.turnStatusService.find("id:"+2).subscribe(
      data =>{
            this.selectStatusValide =data[0];
      }
    );

    // this.vehicleService.findAll().subscribe(
    //   data =>{
    //         this.vehicleList =data;
    //   }
    // );
    this.initForm();

  }

  initForm(){



    this.transportPlanForm = new FormGroup({

      orderTransport: new FormControl(this.selectedTransportPlan.orderTransport?.code),
      vehicle :new FormControl(this.selectedTransportPlan?.vehicle?.registrationNumber),
      driver:new FormControl(this.selectedTransportPlan.driver),
      vehicleCategory :new FormControl(this.selectedTransportPlan?.vehicleCategory?.code),
      transport :new FormControl(this.selectedTransportPlan?.transport?.name),
      price :new FormControl(this.selectedTransportPlan.priceTTC),
      date :new FormControl(new Date(this.selectedTransportPlan.date)),

    })
  }


  onSelectTypes(event){
   console.log(event.value);
   this.isInterOrPrestataire=event.value;
  console.log( this.selectOrderTransport );
if( this.selectOrderTransport .id!=null &&  this.selectOrderTransport.id !=undefined){
 this.loadInterneOrPrestataire(this.selectOrderTransport);

}

  }
  onSelectDriver(event){
    console.log(event.value);
    this.selectedTransportPlan.driver =event.value;
  }

  loadOrderTransport(){

this.orderTransportService.find('turnStatus.id:'+1).subscribe(
  data => {

      this.orderTransportList = data;
       this.orderTransportList.forEach(element => {


          this.orderTransportInfoService.find('type~'+'Aller'+',orderTransport.id:'+element.id).subscribe(
            data=>{
              element.orderTransportInfoAller=data[0];
             }
          );
          this.orderTransportInfoService.find('type~'+'Retour'+',orderTransport.id:'+element.id).subscribe(
            data=>{
              element.orderTransportInfoRetour=data[0];
             }
          );


      });
console.log(this.orderTransportList);


  }
);

  }
  loadLastTranportPlan(){
    console.log(this.selectedTransportPlan);

    if(this.isInterOrPrestataire=='Interne'){
     this.selectedTransportPlan.transport=this.selectDefaulTransport;
    }
    this.transportPlanService.find('villeSource~'+this.selectedTransportPlan.villeSource+',villeDistination~'+this.selectedTransportPlan.villeDistination+',orderTransport.turnType.id:'+this.selectedTransportPlan.orderTransport.turnType.id+',vehicleCategory.id:'+this.selectedTransportPlan?.vehicleCategory?.id+',transport.id:'+this.selectedTransportPlan.transport.id).subscribe(
      data => {
          this.lastDeliveryTransports=data;
      }
    );
  }

  onSelectedTarification(){
    if(this.isPriceContract=="Oui"){

      this.selectedTransportPlan.priceTTC=this.selectedContractAccount.price;

    }
    else if(this.isPriceContract=="Non"){
      this.selectedTransportPlan.priceTTC=this.catalogTransportTypeList[0].amountTtc;

    }
this.initForm();
  }

  loadInterneOrPrestataire(event){



    this.selectOrderTransport =event.id!=null || event.id !=undefined ?event:event.value[0];
    if(this.isInterOrPrestataire=="Interne"){
      this.loadVehicleByCategory();
      this.catalogTransportTypeList=[];
    }else if(this.isInterOrPrestataire=="Prestataire"){

      this.loadTransport();
      this.vehicleList=[];

    }

  }

  loadVehicleByCategory(){



    this.vehicleService.find('vehicleCategory.tonnage>'+this.selectOrderTransport.vehicleCategory.tonnage).subscribe(
      data => {
        if (data[0] != null || data[0] != undefined) {
          this.vehicleList=data;
          // this.vehicleList.forEach(vehicle => {
          //      this.searchVehicleInMaintenance(vehicle).subscribe(
          //       data =>{
          //         vehicle.state =data;

          //       }
          //      );
          //      this.searchVehicleInTranportPlan(vehicle).subscribe(
          //       data =>{
          //         vehicle.state =data;

          //       }
          //      );



          // });
        }else{
          this.vehicleList=[];
        }
 console.log(data);


      }
    );
  }

   searchVehicleInMaintenance(vehicle : Vehicle): Observable<string>{
    let state :string ="Disponible"
    var subject = new Subject<string>();

    this.maintenanceService.find("patrimony.id:"+vehicle.id+",maintenanceState.id:"+4).subscribe(
    data=>{
       if(data !=null){
        state="Maintenance"    ;
        subject.next(state);
       }else{
        state="Disponible";
        subject.next(state);
       }
    }

  );return subject.asObservable();
  }

  searchVehicleInTranportPlan(vehicle : Vehicle): Observable<string>{
    let state :string ="Disponible"
    var subject = new Subject<string>();
    this.transportPlanService.find("vehicle.id:"+vehicle.id+",turnStatus.id!:"+2).subscribe(
      data=>{
        if(data !=null){
          state="Trajet"    ;
          subject.next(state);
         }else{
          state="Disponible";
          subject.next(state);
         }
      }
    );return subject.asObservable();

  }


  loadTransport( ){


    this.catalogTransportTypeService
    .find(
      "turnType.id:" +
      this.selectOrderTransport.turnType.id +
      ",vehicleCategory.tonnage >" +
        this.selectOrderTransport.vehicleCategory.tonnage +
        ",villeSource.code~" +
        this.selectOrderTransport?.orderTransportInfoAller?.addressContactInitial.city +
        ",villeDestination.code~" +
        this.selectOrderTransport?.orderTransportInfoAller?.addressContactFinal.city
    )
    .subscribe((data) => {
      if (data[0] != null || data[0] != undefined) {
        this.catalogTransportTypeList =data;
      }else{
        this.catalogTransportTypeList=[];
      }
    });

  }
  onSelectVehicle(event){

    console.log(event.value[0]);
    this.selectedVehicle=event.value[0];


  }
  onselectTransport(event){

    console.log(event.value[0]);
  this.selectedTransport=event.value[0];
  }

  affectedTransport(){
if(this.selectOrderTransport.id == null && this.selectOrderTransport.id == undefined){
 this.toastr.info(
    "Selectionner Commande",
    "Info"
  );
}else if(this.isInterOrPrestataire=="Interne"){
   if(this.selectedVehicle.id == null && this.selectedVehicle.id == undefined){
    this.toastr.info(
      "Selectionner Véhicule",
      "Info"
    );
   }
   else{
    this.generatePlanTransport();
   }

}else if(this.isInterOrPrestataire=="Prestataire"){
  if(this.selectedTransport.id == null && this.selectedTransport.id == undefined){
   this.toastr.info(
     "Selectionner Transport",
     "Info"
   );
  } else{
    this.generatePlanTransport();
   }

}
else{
   this.generatePlanTransport();
}

  }

  generatePlanTransport(){

    this.selectedTransportPlan.orderTransport=this.selectOrderTransport;
    console.log(this.selectOrderTransport);

        if(this.isInterOrPrestataire=="Interne"){


           this.catalogTransportTypeService
           .find(
            "turnType.id:" +
            this.selectOrderTransport.turnType.id +
             ",vehicleCategory.id:" +
               this.selectOrderTransport.vehicleCategory.id +
               ",villeSource.code~" +
               this.selectOrderTransport?.orderTransportInfoAller?.addressContactInitial.city +
               ",villeDestination.code~" +
               this.selectOrderTransport?.orderTransportInfoAller?.addressContactFinal.city+
               ",transport.id:"+ this.selectDefaulTransport.id
           )
           .subscribe((data) => {
            console.log("catalog");

     console.log(data);

               this.catalogTransportTypeList =data ;

                this.selectedTransportPlan.vehicle=this.selectedVehicle;
                this.selectedTransportPlan.transport=this.selectDefaulTransport;
           this.selectedTransportPlan.driver=this.selectedVehicle.driver;
           this.selectedTransportPlan.vehicleCategory=this.selectedVehicle.vehicleCategory;
           this.selectedTransportPlan.priceTTC=this.selectOrderTransport.priceTTC;
           if(this.selectedTransportPlan.orderTransport.turnType.id==1 || this.selectedTransportPlan.orderTransport.turnType.id==3){
                   this.selectedTransportPlan.villeSource=this.selectOrderTransport.orderTransportInfoAller.addressContactInitial.city;
           this.selectedTransportPlan.villeDistination=this.selectOrderTransport.orderTransportInfoAller.addressContactFinal.city;

           }
           if(this.selectedTransportPlan.orderTransport.turnType.id==2){
            this.selectedTransportPlan.villeSource=this.selectOrderTransport.orderTransportInfoRetour.addressContactInitial.city;
    this.selectedTransportPlan.villeDistination=this.selectOrderTransport.orderTransportInfoRetour.addressContactFinal.city;

    }

          //  this.selectedTransportPlan.priceTTC=this.catalogTransportTypeList[0]?.amountTtc ?this.catalogTransportTypeList[0]?.amountTtc:0 ;
            if(this.selectedTransportPlan.orderTransport.turnType.id==1 || this.selectedTransportPlan.orderTransport.turnType.id==3){
                     this.loadContractAccountbyAccountSelectedAller(  this.selectedTransportPlan.vehicleCategory);

            }else{
              this.loadContractAccountbyAccountSelectedRetour(  this.selectedTransportPlan.vehicleCategory);

            }
            this.loadLastTranportPlan();
           this.initForm();

           });

        }else if(this.isInterOrPrestataire=="Prestataire"){
          this.selectedTransportPlan.transport=this.selectedTransport.transport;
          this.selectedTransportPlan.vehicleCategory=this.selectedTransport.vehicleCategory;
          this.selectedTransportPlan.priceTTC=this.selectOrderTransport.priceTTC;
          this.selectedContractAccount=new ContractAccount();
          this.loadLastTranportPlan();
        }

        this.initForm();
  }

  loadContractAccountbyAccountSelectedAller(vehicleCategory : VehicleCategory){
    console.log(this.selectOrderTransport.orderTransportInfoAller.addressContactInitial.date);
     let searchcontract = new EmsBuffer();


     searchcontract.append('turnType.id:'+this.selectOrderTransport.turnType.id);

  searchcontract.append('vehicleCategory.id:'+vehicleCategory.id);
  searchcontract.append('source.code~'+this.selectOrderTransport.orderTransportInfoAller.addressContactInitial.city);
  searchcontract.append('source.code~'+this.selectOrderTransport.orderTransportInfoAller.addressContactInitial.city);
searchcontract.append('startDate<'+ new Date(this.selectOrderTransport.orderTransportInfoAller.addressContactInitial.date).toISOString());
searchcontract.append('endDate>'+new Date(this.selectOrderTransport.orderTransportInfoAller.addressContactInitial.date).toISOString());
console.log(searchcontract.getValue());

this.searchContractAccount(searchcontract.getValue());


     }

     loadContractAccountbyAccountSelectedRetour(vehicleCategory : VehicleCategory){
      console.log(this.selectOrderTransport.orderTransportInfoRetour.addressContactInitial.date);
       let searchcontract = new EmsBuffer();


       searchcontract.append('turnType.id:'+this.selectOrderTransport.turnType.id);

    searchcontract.append('vehicleCategory.id:'+vehicleCategory.id);
    searchcontract.append('source.code~'+this.selectOrderTransport.orderTransportInfoRetour.addressContactInitial.city);
    searchcontract.append('source.code~'+this.selectOrderTransport.orderTransportInfoRetour.addressContactInitial.city);
  searchcontract.append('startDate<'+ new Date(this.selectOrderTransport.orderTransportInfoRetour.addressContactInitial.date).toISOString());
  searchcontract.append('endDate>'+new Date(this.selectOrderTransport.orderTransportInfoRetour.addressContactInitial.date).toISOString());
  console.log(searchcontract.getValue());

  this.searchContractAccount(searchcontract.getValue());


       }

     searchContractAccount(search : string){
       this.contractAccountService.find(search).subscribe(

           data =>{
             console.log("contract");

         this.selectedContractAccount=data[0];
          console.log(data);

         });
     }

  onSubmit(close=false){

 this.isFormSubmitted=true;

 if(this.transportPlanForm.invalid){return;}

 let formValue = this.transportPlanForm.value;

 this.selectedTransportPlan.priceTTC=formValue['price'];
 this.selectedTransportPlan.date=formValue['date'];
 this.selectedTransportPlan.turnStatus=this.selectStatusCree;
   this.transportPlanService.set(this.selectedTransportPlan).subscribe(
    (data) => {
      this.selectedTransportPlan = data;
      this.changeStatusOrderTransport();
      this.toastr.success(
        "Elément Turn est Enregistré Avec Succès ",
        "Edition"
      );
      if (close) {
        this.router.navigate(['/core/transport-plan/list']);
      } else {

        this.router.navigate(['/core/transport-plan/edit']);
      }
    },
    (error) => {
      this.toastr.error(error.error.message);
      this.spinner.hide();
    },
    () => this.spinner.hide()
  );


  }



  changeStatusOrderTransport(){
    console.log(this.selectOrderTransport);
if(this.selectOrderTransport.turnStatus.id ==1){
this.selectOrderTransport.turnStatus=this.selectStatusValide;
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


}
