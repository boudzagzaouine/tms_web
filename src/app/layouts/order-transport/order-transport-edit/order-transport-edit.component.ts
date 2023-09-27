import { OrderTransportInfoLineService } from './../../../shared/services/api/order-transport-info-line.service';
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
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-order-transport-edit",
  templateUrl: "./order-transport-edit.component.html",
  styleUrls: ["./order-transport-edit.component.scss"],
})
export class OrderTransportEditComponent implements OnInit, OnDestroy {


  selectedOrderTransport: OrderTransport = new OrderTransport();
  //selectedOrderTransportInfoList: OrderTransportInfo[] = [];

  selectedOrderTransportInforAller: OrderTransportInfo = new OrderTransportInfo();
  selectedOrderTransportInforRetour: OrderTransportInfo = new OrderTransportInfo();
  breadcrumbItems: MenuItem[];
  home: MenuItem;
  index: number = 0;
  activeIndex: number = -1;
  items: MenuItem[];
  turnTypeId: number = 0;
  loadingTypeId: number = 0;
  subscriptions = new Subscription();

  turnStatusList: TurnStatus[] = [];

  constructor(
    public orderTransportService: OrderTransportService,
    public orderTransportInfoService: OrderTransportInfoService,
    private turnStatusService: TurnStatusService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private orderTransportInfoLineService:OrderTransportInfoLineService,

  ) { }

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

     this.subscriptions.add(
     this.orderTransportService.searchOrderTransport("id:"+id).subscribe((data) => {
    this.spinner.show();
        this.selectedOrderTransport = data;
        this.loadingTypeId = this.selectedOrderTransport.loadingType.id;
        console.log(this.selectedOrderTransport);

        // this.subscriptions.add( this.orderTransportInfoService.find('orderTransport.id:' + this.selectedOrderTransport.id).subscribe(
        //   info => {
  this.spinner.show();



            if (this.selectedOrderTransport.loadingType.id == 1) {
console.log(this.selectedOrderTransport.orderTransportInfos);

              this.selectedOrderTransportInforAller = this.selectedOrderTransport.orderTransportInfos.filter(f => f.type == 1)[0];
              console.log(this.selectedOrderTransportInforAller);

              this.selectedOrderTransportInforRetour = this.selectedOrderTransport.orderTransportInfos.filter(f => f.type == 2)[0];
              console.log(this.selectedOrderTransportInforRetour);

              this.subscriptions.add(this.orderTransportService.addOrderTransportInfoAller(this.selectedOrderTransportInforAller));
              this.subscriptions.add(this.orderTransportService.addOrderTransportInfoRetour(this.selectedOrderTransportInforRetour));
              this.spinner.hide();


            }
            else if (this.selectedOrderTransport.loadingType.id == 2) {

              console.log(this.selectedOrderTransport.orderTransportInfos);

              this.selectedOrderTransportInforAller = this.selectedOrderTransport.orderTransportInfos[0];

              this.subscriptions.add(this.orderTransportService.addOrderTransportInfoAller(this.selectedOrderTransportInforAller));
              console.log("add ligne ");
this.spinner.hide();
            }


        //   }
        // ));
        this.subscriptions.add(this.orderTransportService.cloneOrderTransport(this.selectedOrderTransport));
        console.log("edit");
        this.activeIndex = 0;
        this.showStepByTurnType(this.selectedOrderTransport.turnType.id);
        console.log(this.selectedOrderTransport);
console.log(this.orderTransportService.getOrderTransport());

      }));


    } else {
    this.orderTransportService.clearObject();

      this.turnStatusService.findAll().subscribe((data) => {
        this.turnStatusList = data;
        this.selectedOrderTransport.turnStatus = this.turnStatusList.filter(
          (f) => f.id == 1
        )[0];
        this.orderTransportService.addStatus(this.selectedOrderTransport.turnStatus);
      });
      this.orderTransportService.generateCode().subscribe((data) => {
        this.selectedOrderTransport.code = data;
        this.orderTransportService.addCode(this.selectedOrderTransport.code);

        //this.orderTransportService.clearObject();

        this.activeIndex = 0;

        this.showStepByTurnType(1);

      });

    }


  }

  getOrderTransport() {


  }

  showStepByTurnType(event) {
    this.turnTypeId = event;
    if (this.loadingTypeId == 1) {
      if (this.turnTypeId == 1) {
        this.items = [
          { label: "EN-TÊTE" },
          { label: "DÉTAILS TRAJET ALLER" },
          { label: "TARIFICATIONS" },
          { label: "VÉRIFICATION" },
        ];

      }
      if (this.turnTypeId == 2) {
        this.items = [
          { label: "EN-TÊTE" },
          { label: "DÉTAILS TRAJET RETOUR " },
          { label: "TARIFICATIONS" },
          { label: "VÉRIFICATION" },
        ];

      }
      if (this.turnTypeId == 3) {
        this.items = [
          { label: "EN-TÊTE" },
          { label: "DÉTAILS TRAJET ALLER" },
          { label: "DÉTAILS TRAJET RETOUR" },
          { label: "TARIFICATIONS" },
          { label: "VÉRIFICATION" },
        ];

      }
    }
    else if (this.loadingTypeId == 2) {

      this.items = [
        { label: "EN-TÊTE" },
        { label: "DÉTAILS TRAJET" },
        { label: "TARIFICATIONS" },
        { label: "VÉRIFICATION" },
      ];


    }
  }

  showStepByLoadingType(event) {
    this.loadingTypeId = event;
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
