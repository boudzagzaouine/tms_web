import { ContainerTypeService } from "./../../../shared/services/api/container-type.service";
import { ContainerType } from "./../../../shared/models/container-type";
import { TurnStatusService } from "./../../../shared/services/api/turn-status.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { OrderDeliveryService } from "./../../../shared/services/api/order-delivery.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AccountService } from "./../../../shared/services/api/account.service";
import { Account } from "./../../../shared/models/account";
import { AddressContactDeliveryInfo } from "./../../../shared/models/address-contact-delivery-info";
import { PackageDetail } from "./../../../shared/models/package-detail";
import { InputNumber } from "primeng/inputnumber";
import { OrderDelivery } from "./../../../shared/models/order-delivery";
import { TurnType } from "./../../../shared/models/turn-Type";
import { TurnTypeService } from "./../../../shared/services/api/turn-type.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService, MenuItem } from "primeng/api";
import { Component, OnChanges, OnInit } from "@angular/core";
import { ElementScrollController } from "@fullcalendar/angular";

@Component({
  selector: "app-order-delivery-edit",
  templateUrl: "./order-delivery-edit.component.html",
  styleUrls: ["./order-delivery-edit.component.scss"],
})
export class OrderDeliveryEditComponent implements OnInit {
  selectedOrderDelivery: OrderDelivery = new OrderDelivery();
  orderDeliveryForm: FormGroup;

  home: MenuItem;
  itemsbreadcrumb: MenuItem[];
  typeOfPackagings = [];
  selectedLoadingType: string;
  loadingTypeList: string[] = [];
  turnTypeList: TurnType[] = [];
  turnStatusList: TurnType[] = [];

  accountList: Account[] = [];

  showPanelOrderTypeAller: boolean = false;
  showPanelOrderTypeRetour: boolean = false;
  isExistAccountOrderTypeAllerSource: string = "false";
  isExistAccountOrderTypeAllerDistinataire: string = "false";
  isExistAccountOrderTypeRetourSource: string = "false";
  isExistAccountOrderTypeRetourDistinataire: string = "false";
  showDialogContactAddress: boolean = false;
  selectedAccountDelivery: Account = new Account();
  selectTurnType: string;
  isFormSubmitted = false;
  index: number = 0;
  activeIndex: number = 0;
  items: MenuItem[];
  nextAddressSource : boolean= false;
 turnTypeId :number =0;
 breadcrumbItems:MenuItem[];
  constructor(
    private turnTypeService: TurnTypeService,
    public orderDeliveryService: OrderDeliveryService,
    private accountService: AccountService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private turnStatusService: TurnStatusService,
    private confirmationService: ConfirmationService,
    private router:Router,
  ) {}

  ngOnInit() {

    this.breadcrumbItems = [
      {label: 'Commande Client'},
      {label: 'Editer' ,routerLink:'/core/order-delivery/edit'},

  ];
  this.home = {icon: 'pi pi-home'};

    this.loadingTypeList = ["Complet", "Groupage"];

    let id = this.activatedRoute.snapshot.params['id'];
    if (id) {
this.orderDeliveryService.findById(id).subscribe(
      data => {
        this.selectedOrderDelivery =data;
      this.orderDeliveryService.cloneOrderDelivery(this.selectedOrderDelivery);
      console.log(this.selectedOrderDelivery);
   this.showStep(this.selectedOrderDelivery.turnType.id);
      }
    );

  }else {

    this.items = [
          { label: "COORDONNÉES" },
          { label: "MARCHANDISES - Aller"},
          { label: "MARCHANDISES - Retour"},
          { label: "TARIFICATIONS"},
          { label: "Vérification"},
        ];
  }


  }

  showStep(event){
 this.turnTypeId=event;
      if(event == 1){
        this.items = [
          { label: "COORDONNÉES" },
          { label: "MARCHANDISES - Aller"},
          { label: "TARIFICATIONS"},
          { label: "Vérification"},

        ];

      }else if(event == 2){
        this.items = [
          { label: "COORDONNÉES" },
          { label: "MARCHANDISES - Retour"},

          { label: "TARIFICATIONS"},
          { label: "Vérification"},

        ];
      }else if(event == 3){
        this.items = [
          { label: "COORDONNÉES" },
          { label: "MARCHANDISES - Aller"},
          { label: "MARCHANDISES - Retour"},

          { label: "TARIFICATIONS"},
          { label: "Vérification"},

        ];
      }

  }


  previous(event) {
    if(event == true){
    this.activeIndex--;
    }
  }

  next(event) {
    console.log("next event ");

    if(event == true){
      this.activeIndex++;
    }
  }
}
