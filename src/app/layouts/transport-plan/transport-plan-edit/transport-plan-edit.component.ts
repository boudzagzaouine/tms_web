import { OrderDeliveryTransport } from './../../../shared/models/order-delivery-transport';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { OrderDeliveryService } from './../../../shared/services/api/order-delivery.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderDelivery } from './../../../shared/models/order-delivery';
import { LoadingType } from './../../../shared/models/loading-type';
import { PackagingType } from './../../../shared/models/packagingType';
import { PackagingTypeService } from './../../../shared/services/api/packaging-type.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransportPlan } from './../../../shared/models/transport-plan';
import { TurnType } from './../../../shared/models/turn-Type';
import { TurnTypeService } from './../../../shared/services/api/turn-type.service';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transport-plan-edit',
  templateUrl: './transport-plan-edit.component.html',
  styleUrls: ['./transport-plan-edit.component.scss']
})
export class TransportPlanEditComponent implements OnInit {

  selectedTransportPlan :TransportPlan = new TransportPlan();
  transportPlanForm :FormGroup;
  orderDeliveries :OrderDelivery[]=[];
  selectedOrderDeliveries:OrderDelivery[]=[];
  turnTypeList :TurnType[]=[];
  packagingTypeList :PackagingType[]=[];
  loadingTypeList :LoadingType[]=[];
  home: MenuItem;
  activeIndex: number = 0;
  items: MenuItem[];
  itemsbreadcrumb: MenuItem[];
  isFormSubmitted :Boolean;
  searchQuery = '';
  showDialogOrderDeliveryTransport :Boolean =false;
  selectOrderDeliveryTransport:OrderDeliveryTransport = new OrderDeliveryTransport();
  editModeOrderDeliveryTransport :Boolean =false;
  orderDeliveryTransports : OrderDeliveryTransport[]=[];

  constructor(private turnTypeService :TurnTypeService,
              private  packagingTypeService:PackagingTypeService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private orderDeliveryService :OrderDeliveryService,
              private confirmationService:ConfirmationService
              ) { }

  ngOnInit() {

    this.itemsbreadcrumb = [
      { label: "Tournée" },
      { label: "Editer", routerLink: "/core/turn/edit" },
    ];
    this.items = [
      { label: "Commandes" },
      { label: "Surcharge" },
      { label: "Information" },
      { label: "Validation" },
    ];
    this.home = { icon: "pi pi-home" };
    let l1 = new LoadingType("Complet");
    let l2 = new LoadingType("Groupe");
    this.loadingTypeList.push(l1);
    this.loadingTypeList.push(l2);
    this.turnTypeService.findAll().subscribe((data) => {
    this.turnTypeList = data;
    //this.selectedTransportPlan.turnType = this.turnTypeList[0];
  //  this.onSelectTurnType(this.selectedTransportPlan.turnType);
    this.initForm();
  });

  this.packagingTypeService.findAll().subscribe(
    data =>{
   this.packagingTypeList=data;
   //this.selectedTransportPlan.turnType = this.packagingTypeList[0];
   this.initForm();

    }
  );
  this.initForm();

  }
  initForm(){
    const d = new Date(this.selectedTransportPlan.dateDelivery);
    this.transportPlanForm = new FormGroup({
      fDateLivraison: new FormControl(d, Validators.required),
      fTurnType: new FormControl(this.selectedTransportPlan.turnType, Validators.required),
      fpackagingType: new FormControl(this.selectedTransportPlan.packagingType),
      floadingType: new FormControl(this.selectedTransportPlan.loadingType),
    });
  }

  loadForm(){
    this.isFormSubmitted = true;
    if (this.transportPlanForm.invalid) {
      return;
    }
    const formValue = this.transportPlanForm.value;
    this.selectedTransportPlan.dateDelivery = formValue["fDateLivraison"];

    this.activeIndex++;
  }

  onSelectTurnType(event) {

    this.selectedTransportPlan.turnType =  event.value ;
let search = "turnStatus.id:"+1 +",turnType.id:"+this.selectedTransportPlan.turnType.id;
this.loadOrderDelivery(search);
  }


  onMoveSoToSource(event) {

    console.log("source");
    console.log(event);




  }

  onMoveSoToTarget(event) {
    console.log("target");
    console.log(event);
  }
  previous() {
    this.activeIndex--;
  }
  next() {
    console.log(this.selectedTransportPlan);

    if (this.activeIndex == 0) {
      this.  loadForm();

    // this.verifiedHolidayByDateTTurn();
    //   this.activeIndex++;
    }
    //else if (this.activeIndex == 2) {
    //   this.calculatePriceTurnSo();
    //   this.calculatePriceTurnPo();
    //   this.activeIndex++;
    // } else {
    //   this.activeIndex++;
    // }
  }


  loadOrderDelivery(search: string = '') {
    this.spinner.show();

  this.orderDeliveryService.find(search).subscribe(
      data => {

        this.orderDeliveries = data;
        this.orderDeliveryTransports=this.orderDeliveries[0].orderDeliveryTransport;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }




  onHideDialogOrderDeliveryTransport (event){
    this.showDialogOrderDeliveryTransport=event
  }

  onShowDialogOrderDeliveryTransport(line, mode) {
    this.showDialogOrderDeliveryTransport = true;

    if (mode == true) {
      this.selectOrderDeliveryTransport = line;
      this.editModeOrderDeliveryTransport = true;
    } else {
      this.selectOrderDeliveryTransport = new OrderDeliveryTransport();
      this.editModeOrderDeliveryTransport= false;
    }
  }

  onDeleteOrderDeliveryTransport(line: OrderDeliveryTransport) {
    this.confirmationService.confirm({
      message: "Voulez vous vraiment Suprimer?",
      accept: () => {
        this.orderDeliveryTransports = this.orderDeliveryTransports.filter((l) => l.id !== line.id);

       this.orderDeliveryTransports.push(line);

      },
    });
  }
}
