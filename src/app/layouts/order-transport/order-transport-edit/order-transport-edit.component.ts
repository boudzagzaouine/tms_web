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
  breadcrumbItems: MenuItem[];
  home: MenuItem;
  index: number = 0;
  activeIndex: number = 0;
  items: MenuItem[];
  turnTypeId: number = 0;
  subscriptions= new Subscription ();


  constructor(
    public orderTransportService: OrderTransportService,
    public orderTransportInfoService: OrderTransportInfoService,

    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.breadcrumbItems = [
      { label: "Order de  Transport" },
      { label: "Editer", routerLink: "/core/order-transport/edit" },
    ];
    this.home = { icon: "pi pi-home" };

    let id = this.activatedRoute.snapshot.params["id"];
    if (id) {
      this.orderTransportService.findById(id).subscribe((data) => {
        this.selectedOrderTransport = data;
   this.orderTransportInfoService.find('orderTransport.id:'+this.selectedOrderTransport.id).subscribe(
     data=>{
        this.subscriptions.add(this.orderTransportService.addOrderTransportInfoAller(data[0]));
      }
   );
       this.subscriptions.add( this.orderTransportService.cloneOrderTransport(this.selectedOrderTransport));
        this.showStep(this.selectedOrderTransport.turnType.id);
      });

    } else {
      this.showStep(1);
    }
  }

  showStep(event) {
    this.turnTypeId = event;
    // if (event == 1) {
      this.items = [
        { label: "COORDONNÉES" },
        { label: "MARCHANDISES" },
        { label: "TARIFICATIONS" },
        { label: "VÉRIFICATION" },
      ];

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
