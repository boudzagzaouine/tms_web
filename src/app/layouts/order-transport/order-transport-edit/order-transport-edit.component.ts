import { LoadingType } from './../../../shared/models/loading-type';
import { OrderTransportInfo } from './../../../shared/models/order-transport-info';
import { TurnStatus } from './../../../shared/models/turn-status';
import { TurnStatusService } from './../../../shared/services/api/turn-status.service';
import { Subscription } from 'rxjs';
import { OrderTransportInfoService } from './../../../shared/services/api/order-transport-info.service';
import { ActivatedRoute } from "@angular/router";
import { Account } from "./../../../shared/models/account";
import { TurnType } from "./../../../shared/models/turn-Type";
import { MenuItem } from "primeng/api";
import { FormGroup } from "@angular/forms";
import { OrderTransport } from "./../../../shared/models/order-transport";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { OrderTransportService } from "./../../../shared/services/api/order-transport.service";

@Component({
  selector: "app-order-transport-edit",
  templateUrl: "./order-transport-edit.component.html",
  styleUrls: ["./order-transport-edit.component.scss"],
})
export class OrderTransportEditComponent implements OnInit,OnDestroy {
  selectedOrderTransport: OrderTransport = new OrderTransport();
  selectedOrderTransportInforAller: OrderTransportInfo = new OrderTransportInfo();
  selectedOrderTransportInforRetour: OrderTransportInfo = new OrderTransportInfo();

  breadcrumbItems: MenuItem[];
  home: MenuItem;
  index: number = 0;
  activeIndex: number = -1;
  items: MenuItem[];
  turnTypeId: number = 0;
  loadingTypeId :number=0;
  subscriptions= new Subscription ();

  turnStatusList: TurnStatus[] = [];

  constructor(
    public orderTransportService: OrderTransportService,
    public orderTransportInfoService: OrderTransportInfoService,
    private turnStatusService: TurnStatusService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.breadcrumbItems = [
      { label: "Order de  Transport" },
      { label: "Editer", routerLink: "/core/order-transport/edit" },
    ];

    this.items = [
      { label: "EN-TÊTE" },
      { label: "DÉTAILS TRAJET ALLER" },
      { label: "TARIFICATIONS" },
      { label: "VÉRIFICATION" },
    ];
    this.home = { icon: "pi pi-home" };

    let id = this.activatedRoute.snapshot.params["id"];
    if (id) {
      this.orderTransportService.findById(id).subscribe((data) => {
        this.selectedOrderTransport = data;
        this.loadingTypeId=this.selectedOrderTransport.loadingType.id;
        console.log( this.selectedOrderTransport);

   this.orderTransportInfoService.find('orderTransport.id:'+this.selectedOrderTransport.id).subscribe(
     data=>{
      console.log(data);
if(this.selectedOrderTransport.loadingType.id==1){

         this.selectedOrderTransportInforAller=data.filter(f=>f.type ==1)[0];
         this.selectedOrderTransportInforRetour=data.filter(f=>f.type ==2)[0];
        this.subscriptions.add(this.orderTransportService.addOrderTransportInfoAller(this.selectedOrderTransportInforAller));
        this.subscriptions.add(this.orderTransportService.addOrderTransportInfoRetour(this.selectedOrderTransportInforRetour));

}
 else if(this.selectedOrderTransport.loadingType.id==2){
  console.log(data);

  this.selectedOrderTransportInforAller=data[0];
  this.subscriptions.add(this.orderTransportService.addOrderTransportInfoAller(this.selectedOrderTransportInforAller));

}

      }
   );
       this.subscriptions.add( this.orderTransportService.cloneOrderTransport(this.selectedOrderTransport));
console.log("edit");
   this.activeIndex=0;
       this.showStepByTurnType(this.selectedOrderTransport.turnType.id);
      });

    } else {
      this.turnStatusService.findAll().subscribe((data) => {
        this.turnStatusList = data;
      });
      this.orderTransportService.generateCode().subscribe((data) => {
        this.selectedOrderTransport.code = data;
        this.orderTransportService.addCode(this.selectedOrderTransport.code);

        this.selectedOrderTransport.turnStatus = this.turnStatusList.filter(
          (f) => f.id == 1
        )[0];
  this.orderTransportService.addStatus(this.selectedOrderTransport.turnStatus);
  this.activeIndex=0;

      this.showStepByTurnType(1);
      });

    }


  }

  getOrderTransport(){

    
  }

  showStepByTurnType(event) {
    this.turnTypeId = event;
    if(this.loadingTypeId==1){
    if ( this.turnTypeId  == 1) {
      this.items = [
        { label: "EN-TÊTE" },
        { label: "DÉTAILS TRAJET ALLER" },
        { label: "TARIFICATIONS" },
        { label: "VÉRIFICATION" },
      ];

    }
    if ( this.turnTypeId  == 2) {
      this.items = [
        { label: "EN-TÊTE" },
        { label: "DÉTAILS TRAJET RETOUR " },
        { label: "TARIFICATIONS" },
        { label: "VÉRIFICATION" },
      ];

    }
    if ( this.turnTypeId  == 3) {
      this.items = [
        { label: "EN-TÊTE" },
        { label: "DÉTAILS TRAJET ALLER" },
        { label: "DÉTAILS TRAJET RETOUR" },
        { label: "TARIFICATIONS" },
        { label: "VÉRIFICATION" },
      ];

    }
  }
  else if(this.loadingTypeId==2){

      this.items = [
        { label: "EN-TÊTE" },
        { label: "DÉTAILS TRAJET" },
        { label: "TARIFICATIONS" },
        { label: "VÉRIFICATION" },
      ];


  }
  }

  showStepByLoadingType(event){
this.loadingTypeId=event;
  }

  previous(event) {
    if (event == true) {
      this.activeIndex--;
    }
  }

  next(event) {
    if (event == true) {
      this.activeIndex++;
    }
  }


  ngOnDestroy() {
 this.orderTransportService.clearObject();
    this.subscriptions.unsubscribe();
  }
}
