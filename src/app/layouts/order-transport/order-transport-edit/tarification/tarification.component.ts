import { TransportPlanService } from './../../../../shared/services/api/transport-plan.service';
import { AccountPricingService } from './../../../../shared/services/api/account-pricing.service';
import { ContractAccount } from './../../../../shared/models/contract-account';
import { ContractAccountService } from './../../../../shared/services/api/contract-account.service';
import { OrderTransportInfoLine } from './../../../../shared/models/order-transport-info-line';
import { OrderTransportInfo } from './../../../../shared/models/order-transport-info';
import { Transport } from './../../../../shared/models/transport';
import { CatalogTransportType } from './../../../../shared/models/CatalogTransportType';
import { OrderTransport } from './../../../../shared/models/order-transport';
import { VehicleService } from './../../../../shared/services/api/vehicle.service';
import { ConfirmationService } from 'primeng/api';
import { CatalogTransportTypeServcie } from './../../../../shared/services/api/Catalog-Transport-Type.service';
import { TransportServcie } from './../../../../shared/services/api/transport.service';
import { VehicleCategoryService } from './../../../../shared/services/api/vehicle-category.service';
import { VehicleCategory } from './../../../../shared/models/vehicle-category';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Vehicle } from './../../../../shared/models';
import { OrderTransportService } from './../../../../shared/services/api/order-transport.service';

@Component({
  selector: 'app-tarification',
  templateUrl: './tarification.component.html',
  styleUrls: ['./tarification.component.scss']
})
export class TarificationComponent implements OnInit {

  @Output() previousstep = new EventEmitter<boolean>();
  @Output() nextstep = new EventEmitter<boolean>();
selectedVehicleCategory : VehicleCategory=new VehicleCategory();
selectedContractAccount: ContractAccount = new ContractAccount();
contractAccountList: ContractAccount[] = [];

catalogTransportIntern :CatalogTransportType = new CatalogTransportType();
catalogTransportTypeExterns :CatalogTransportType []=[];
  orderTransportInfoAllerLignes :OrderTransportInfoLine[] = [];
  orderTransportInfoRetourLignes :OrderTransportInfoLine[] = [];

  vehicleCatList :VehicleCategory[]=[];
  vehicleCatsToDeliverSort :VehicleCategory[]=[];
  vehicleCatsToDeliver: VehicleCategory[] = [];
  selectOrderTransport : OrderTransport = new OrderTransport();
  vehicleList:Vehicle[]=[];
  idOrderTransportTransport:number=0;
  showDialogOrderTransportTransport :Boolean =false;
  editModeOrderTransportTransport :Boolean =false;
   priceTransport :number =0 ;
   priceRetour :number =0;
   selectRadio :Boolean=true;
  constructor(private vehicleCategoryService :VehicleCategoryService,
    private orderTransportService :OrderTransportService,
    private transportPlanService :TransportPlanService,
    private transportService : TransportServcie,
    private catalogTransportTypeService :CatalogTransportTypeServcie,
    private confirmationService:ConfirmationService,
    private contractAccountService :ContractAccountService,
    private accountPricingService :AccountPricingService,
    private vehicleService :VehicleService) { }

  ngOnInit() {

      this.selectOrderTransport = this.orderTransportService.getOrderTransport();
      this.orderTransportInfoAllerLignes =this.orderTransportService?.getorderTransportInfoAller() ?this.orderTransportService.getorderTransportInfoAller().orderTransportInfoLines:[];
      this.orderTransportInfoRetourLignes =this.orderTransportService.getorderTransportInfoRetour()?this.orderTransportService.getorderTransportInfoRetour().orderTransportInfoLines:[];
      this.selectedVehicleCategory=this.selectOrderTransport.vehicleCategory;
      console.log(this.selectOrderTransport);

        // this.orderTransportTransports=this.orderTransportService.getOrderTransport().orderTransportTransport;
         this.priceTransport = this.selectOrderTransport.priceTTC ;
 console.log(this.selectOrderTransport.priceTTC);
         this.onSearchPriceExterne();
         this.onSearchPriceInterne();


  }

  initForm(){


  }




  onSearchPriceExterne() {
    let source ,distination,startDate ,endDate ;

    if(this.selectOrderTransport.turnType.id==1 || this.selectOrderTransport.turnType.id==3 ){
     source =this.selectOrderTransport.orderTransportInfoAller?.addressContactInitial?.city;
     distination=this.selectOrderTransport.orderTransportInfoAller?.addressContactFinal?.city;


    }else if(this.selectOrderTransport.turnType.id==2 ){
     source =this.selectOrderTransport.orderTransportInfoRetour?.addressContactInitial?.city;
     distination=this.selectOrderTransport.orderTransportInfoRetour?.addressContactFinal?.city;

    }
            this.catalogTransportTypeService
              .find(
                "transport.interneOrExterne:false"+
                ",turnType.id:"+this.selectOrderTransport.turnType.id+
                ",vehicleCategory.id:" +
                this.selectedVehicleCategory.id +
                  ",villeSource.code~" +
                  source +
                  ",villeDestination.code~" +
                 distination

              )
              .subscribe((data) => {
                  console.log(data);
                  this.catalogTransportTypeExterns=data;
                  this.onSearchAccountPricing();
                  this.onSearchLastPriceByTransportExterne();
                });
  }

  onSearchPriceInterne() {
    let source ,distination,startDate ,endDate ;

    if(this.selectOrderTransport.turnType.id==1 || this.selectOrderTransport.turnType.id==3 ){
     source =this.selectOrderTransport.orderTransportInfoAller?.addressContactInitial?.city;
     distination=this.selectOrderTransport.orderTransportInfoAller?.addressContactFinal?.city;


    }else if(this.selectOrderTransport.turnType.id==2 ){
     source =this.selectOrderTransport.orderTransportInfoRetour?.addressContactInitial?.city;
     distination=this.selectOrderTransport.orderTransportInfoRetour?.addressContactFinal?.city;

    }



    this.catalogTransportTypeService
      .find(
        "transport.interneOrExterne:true"+
        ",turnType.id:"+this.selectOrderTransport.turnType.id+
        ",vehicleCategory.id:" +
        this.selectedVehicleCategory.id +
          ",villeSource.code~" +
          source +
          ",villeDestination.code~" +
          distination

      )
      .subscribe((data) => {
          console.log(data);
          this.catalogTransportIntern=data[0];
          this.loadContractAccountbyAccountSelected();
          this.onSearchLastPriceByTransportIntern();
        });
}

onSearchLastPriceByTransportExterne(){

  this.catalogTransportTypeExterns.forEach(element => {
    let search  ='orderTransport.turnType.id:'+this.selectOrderTransport.turnType.id+
                  ',transport.id:'+element.transport.id+
                  ',orderTransport.account.id:'+this.selectOrderTransport.account.id;

this.transportPlanService.getLastPriceTransportPlan(search).subscribe(
  data =>{
console.log(data);

    element.tarifLastPriceExterne=data.purchasePrice;
    console.log(element.tarifLastPriceExterne);

  }
);

  });



}

onSearchLastPriceByTransportIntern(){


    let search  ='orderTransport.turnType.id:'+this.selectOrderTransport.turnType.id+
                  ',transport.id:'+this.catalogTransportIntern.transport.id+
                  ',orderTransport.account.id:'+this.selectOrderTransport.account.id;

this.transportPlanService.getLastPriceTransportPlan(search).subscribe(
  data =>{
console.log(data);

this.catalogTransportIntern.tarifLastPriceIntern=data.salePrice;
    console.log(this.catalogTransportIntern.tarifLastPriceIntern);

  }
);





}

  loadContractAccountbyAccountSelected(){
    console.log("dateeeeeeeee");
 let source ,distination,startDate ,endDate ;

 if(this.selectOrderTransport.turnType.id==1 ){
  source =this.selectOrderTransport.orderTransportInfoAller?.addressContactInitial?.city;
  distination=this.selectOrderTransport.orderTransportInfoAller?.addressContactFinal?.city;
  startDate=this.selectOrderTransport.orderTransportInfoAller?.addressContactInitial?.date.toISOString();
  endDate=this.selectOrderTransport.orderTransportInfoAller?.addressContactFinal?.date.toISOString();

 }else if(this.selectOrderTransport.turnType.id==2 ){
  source =this.selectOrderTransport.orderTransportInfoRetour?.addressContactInitial?.city;
  distination=this.selectOrderTransport.orderTransportInfoRetour?.addressContactFinal?.city;
  startDate=this.selectOrderTransport.orderTransportInfoRetour?.addressContactInitial?.date.toISOString();
  endDate=this.selectOrderTransport.orderTransportInfoRetour?.addressContactFinal?.date.toISOString();
 } else if(this.selectOrderTransport.turnType.id==3 ){
  source =this.selectOrderTransport.orderTransportInfoAller?.addressContactInitial?.city;
  distination=this.selectOrderTransport.orderTransportInfoAller?.addressContactFinal?.city;
  startDate=this.selectOrderTransport.orderTransportInfoAller?.addressContactInitial?.date.toISOString();
  endDate=this.selectOrderTransport.orderTransportInfoRetour?.addressContactFinal?.date.toISOString();
 }



      this.contractAccountService.find(
        'turnType.id:'+this.selectOrderTransport.turnType.id+
        ',vehicleCategory.id:'+this.selectedVehicleCategory.id+
        ',source.code~'+source+
        ',distination.code~'+distination+
        ',startDate<'+startDate+
        ',endDate>'+endDate
      ).subscribe(

        data =>{
          console.log("contract");
          //this.selectedContractAccount.endDate=new Date();
          this.contractAccountList=data;
      this.selectedContractAccount=data[0];
       console.log(data);

      });

  }

  onSearchAccountPricing(){
this.catalogTransportTypeExterns.forEach(element => {
  console.log(element.id);

 this.accountPricingService.find('account.id:'+this.selectOrderTransport.account.id+
                                 ',catalogTransportType.id:'+element.id).subscribe(
      data => {
        if(data[0] !=null){
element.tarifClient=data[0].price;
console.log(data[0].price);

}else {
  element.tarifClient=0;
}
      }
    );


});




  }

  onRowTransportSelect(event){

    console.log(event.data);
  this.priceTransport =event.data?event.data:event;
  }

  previous() {

    this.orderTransportService.addPrice(  this.priceTransport);

this.previousstep.emit(true);
  }


loadForm(){




}


  next() {
  console.log("next");
this.orderTransportService.addPrice(  this.priceTransport);
   //this.orderTransportService.addOrderTransportTransport(this.orderTransportTransports);
    this.nextstep.emit(true);

}


}
