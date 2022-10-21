import { OnChanges, SimpleChanges } from '@angular/core';
import { OrderDelivery } from './../../../../shared/models/order-delivery';
import { TurnType } from './../../../../shared/models/turn-Type';
import { Account } from './../../../../shared/models/account';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { TurnStatusService } from './../../../../shared/services/api/turn-status.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from './../../../../shared/services/api/account.service';
import { OrderDeliveryService } from './../../../../shared/services/api/order-delivery.service';
import { TurnTypeService } from './../../../../shared/services/api/turn-type.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.css']
})
export class ContactInformationComponent implements OnInit ,OnChanges {

  @Output() nextstep = new EventEmitter<Boolean>();
  @Output() turnTypeId = new EventEmitter<number>();

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

  constructor(
    private turnTypeService: TurnTypeService,
    public orderDeliveryService: OrderDeliveryService,
    private accountService: AccountService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private turnStatusService: TurnStatusService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {



    this.loadingTypeList = ["Complet", "Groupage"];

    this.turnTypeService.findAll().subscribe((data) => {
      this.turnTypeList = data;
    });
    this.turnStatusService.findAll().subscribe((data) => {
      this.turnStatusList = data;
      console.log(data);
    });
    let id = this.activatedRoute.snapshot.params['id'];
    if (!id) {
      console.log("not id");

      if(this.selectedOrderDelivery.code==null || this.selectedOrderDelivery.code==undefined){
  this.orderDeliveryService.generateCode().subscribe((data) => {
      this.selectedOrderDelivery.code = data;
      this.initForm();
      console.log(data);
    });

  }
}else{
  console.log(" id");

  this.selectedOrderDelivery=this.orderDeliveryService.getOrderDelivery();
  console.log(this.selectedOrderDelivery);

  this.initForm();


}

    this.initForm();
  }

  ngOnChanges() {
 console.log("after id");

    this.selectedOrderDelivery=this.orderDeliveryService.getOrderDelivery();
    console.log(    this.selectedOrderDelivery);


  }

  initForm() {
    this.orderDeliveryForm = new FormGroup({
      code: new FormControl(
        this.selectedOrderDelivery.code,
        Validators.required
      ),
      date: new FormControl(
        new Date(this.selectedOrderDelivery.date),
        Validators.required
      ),
      loadingType: new FormControl(
        this.selectedOrderDelivery.loadingType,
        Validators.required
      ),
      turnType: new FormControl(
        this.selectedOrderDelivery.turnType,
        Validators.required
      ),
      account: new FormControl(
        this.selectedOrderDelivery.account,
        Validators.required
      ),
      status: new FormControl(
        this.selectedOrderDelivery.turnStatus,
        Validators.required
      ),


    });
  }


 loadForm(){

  this.isFormSubmitted = true;

  if (this.orderDeliveryForm.invalid) {
    return;
  }
  console.log("hehoo");


  const formValue = this.orderDeliveryForm.value;

  this.selectedOrderDelivery.code = formValue["code"];
  this.selectedOrderDelivery.date = formValue["date"];

  this.orderDeliveryService.addOrder(this.selectedOrderDelivery);
  console.log(this.orderDeliveryService.getOrderDelivery());

   this.nextstep.emit(true);
  this.isFormSubmitted = false;


 }


  onAccountSearch(event: any) {
    this.accountService
      .find("name~" + event.query)
      .subscribe((data) => (this.accountList = data));
  }
  onSelectAccount(event: any) {
    this.selectedOrderDelivery.account = event;
  }

  onSelectStatus(event) {
    this.selectedOrderDelivery.turnStatus = event.value;
  }

  onSelectLoadingTypes(event) {
    this.selectedLoadingType = event.value;
    this.selectedOrderDelivery.loadingType = this.selectedLoadingType;
  }

  onSelectType(event) {
    this.selectedOrderDelivery.turnType = event.value ? event.value : event;
    if (this.selectedOrderDelivery.turnType.id == 1) {
      this.showPanelOrderTypeAller = true;
      this.showPanelOrderTypeRetour = false;

    } else if (this.selectedOrderDelivery.turnType.id == 2) {
      this.showPanelOrderTypeRetour = true;
      this.showPanelOrderTypeAller = false;
    } else {
      this.showPanelOrderTypeRetour = true;
      this.showPanelOrderTypeAller = true;
    }

    this.turnTypeId.emit(this.selectedOrderDelivery.turnType.id);
  }



  next() {

      this.loadForm();




  }

}
