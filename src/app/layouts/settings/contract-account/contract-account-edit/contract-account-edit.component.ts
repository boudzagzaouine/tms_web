import { VehicleCategory } from './../../../../shared/models/vehicle-category';
import { VehicleCategoryService } from './../../../../shared/services/api/vehicle-category.service';
import { ContractAccountService } from './../../../../shared/services/api/contract-account.service';
import { AddressService } from './../../../../shared/services/api/address.service';
import { Account } from "./../../../../shared/models/account";
import { AccountService } from "./../../../../shared/services/api/account.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { Address } from "./../../../../shared/models/address";
import { ContractAccount } from "./../../../../shared/models/contract-account";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MenuItem, MessageService } from "primeng/api";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-contract-account-edit",
  templateUrl: "./contract-account-edit.component.html",
  styleUrls: ["./contract-account-edit.component.css"],
})
export class ContractAccountEditComponent implements OnInit {
  @Input() selectedContractAccount = new ContractAccount();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  displayDialog: boolean;
  title = "Modifier un Contrat  Client";
  home: MenuItem;
  contractAccountForm: FormGroup;
  selectSenderAddress: Address;
  selectReceiveAddress: Address;
  subscriptions = new Subscription();
  isFormSubmitted = false;

  itemsbreadcrumb: MenuItem[];
  trajetForm: FormGroup;
  types = [];
  typeOfPackagings = [];

  loadingTypeList = [];
  completTypeList = [];
  nameAccountList: Array<Account> = [];
  vehicleCategoryList: Array<VehicleCategory> = [];

  contractType: String;

  constructor(
    private spinner: NgxSpinnerService,
    private accountService: AccountService,
    private addressService:AddressService,
    private contractAccountService:ContractAccountService,
    private messageService: MessageService,
    private vehicleCategoryService:VehicleCategoryService,

  ) {}

  ngOnInit(): void {

    this.subscriptions.add(this.vehicleCategoryService.findAll().subscribe(
      code => {
     this.vehicleCategoryList= code;

  }));

    if (this.editMode === 1) {
    this.selectedContractAccount = new ContractAccount();
    this.selectSenderAddress = new Address();
    this.selectReceiveAddress = new Address();

    this.subscriptions.add(this.addressService.generateCode().subscribe(
      code => {
     this.selectSenderAddress.code = code;
      this.initForm();
  }));
  this.subscriptions.add(this.addressService.generateCode().subscribe(
    code => {
   this.selectReceiveAddress.code = code;
    this.initForm();
}));

    }
    else {

      this.selectSenderAddress=this.selectedContractAccount.senderAddress?this.selectedContractAccount.senderAddress:new Address;
      this.selectReceiveAddress=this.selectedContractAccount.receiverAdresse?this.selectedContractAccount.receiverAdresse:new Address;
this.contractType=this.selectedContractAccount.contractType;
console.log(this.selectedContractAccount);


    }
    this.displayDialog = true;
    this.types = [ "Marchandise" ,  "Location" ];

    this.typeOfPackagings = [ "Palette" ,  "Vrac" ];

    this.initForm();
  }

  initForm() {
    const date = new Date(this.selectedContractAccount.date);
    const startDate = new Date(this.selectedContractAccount.startDate);
    const endDate = new Date(this.selectedContractAccount.endDate);

    this.contractAccountForm = new FormGroup({
      general: new FormGroup({
        fCode: new FormControl(
          this.selectedContractAccount.code,
          Validators.required
        ),
        fDate: new FormControl(date, Validators.required),
        fAccount: new FormControl(
          this.selectedContractAccount.account,
          Validators.required
        ),
        fPrice: new FormControl(
          this.selectedContractAccount.price,
          Validators.required
        ),
        fContractType: new FormControl(
          this.selectedContractAccount.contractType,
          Validators.required
        ),
      }),

      vehicle: new FormGroup({
        fVehicle: new FormControl(
          this.selectedContractAccount.vehicleCategory,
          Validators.required
        ),
        fQuantity: new FormControl(
          this.selectedContractAccount.quantity,
          Validators.required
        ),
        fStartDate: new FormControl(startDate, Validators.required),
        fEndDate: new FormControl(endDate, Validators.required),
      }),

      trajet: new FormGroup({
        fSenderLine: new FormControl(
          this.selectSenderAddress.line1,
          Validators.required
        ),
        fSenderCity: new FormControl(
          this.selectSenderAddress.city,

        ),
        fSenderCountry: new FormControl(
          this.selectSenderAddress.country,

        ),
        fSenderZip: new FormControl(
          this.selectSenderAddress.zip,

        ),

        fReceiveLine: new FormControl(
          this.selectReceiveAddress.line1,
          Validators.required
        ),
        fReceiveCity: new FormControl(
          this.selectReceiveAddress.city,

        ),
        fReceiveCountry: new FormControl(
          this.selectReceiveAddress.country,

        ),
        fReceiveZip: new FormControl(
          this.selectReceiveAddress.zip,

        ),

        fPackageType: new FormControl(this.selectedContractAccount.packageType,Validators.required),
      }),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    console.log(this.contractAccountForm);

    //if (this.contractAccountForm.invalid) { this.spinner.hide(); return; }

    if (this.contractAccountForm.controls["general"].invalid) {
      return;
    }

    if (this.selectedContractAccount.contractType == "Location") {
      if (this.contractAccountForm.controls["vehicle"].invalid) {
        return;
      }
    } else if (this.selectedContractAccount.contractType == "Marchandise") {
      if (this.contractAccountForm.controls["trajet"].invalid) {
        return;
      }
    }


    //this.spinner.show();
    const formValue = this.contractAccountForm.value;
    this.selectedContractAccount.contractType =
      formValue["general"]["fContractType"];

    console.log(this.selectedContractAccount.contractType);

    this.selectedContractAccount.code = formValue["general"]["fCode"];
    this.selectedContractAccount.date = formValue["general"]["fDate"];
    // this.selectedContractAccount.contractType = formValue['general']['fContractType'];
    this.selectedContractAccount.price = formValue["general"]["fPrice"];

    if (this.selectedContractAccount.contractType == "Location") {
      console.log("tomo");

      this.selectedContractAccount.vehicleCategory =
        formValue["vehicle"]["fVehicle"];
      this.selectedContractAccount.quantity = formValue["vehicle"]["fQuantity"];
      this.selectedContractAccount.startDate =
        formValue["vehicle"]["fStartDate"];
      this.selectedContractAccount.endDate = formValue["vehicle"]["fEndDate"];
    } else if (this.selectedContractAccount.contractType == "Marchandise") {
      console.log("tri9");

      this.selectSenderAddress.line1 = formValue["trajet"]["fSenderLine"];
      this.selectSenderAddress.city = formValue["trajet"]["fSenderCity"];
      this.selectSenderAddress.country = formValue["trajet"]["fSenderCountry"];
      this.selectSenderAddress.zip = formValue["trajet"]["fSenderZip"];

      this.selectedContractAccount.senderAddress = this.selectSenderAddress;

      this.selectReceiveAddress.line1 = formValue["trajet"]["fReceiveLine"];
      this.selectReceiveAddress.city = formValue["trajet"]["fReceiveCity"];
      this.selectReceiveAddress.country = formValue["trajet"]["fReceiveCountry"];
      this.selectReceiveAddress.zip = formValue["trajet"]["fReceiveZip"];

      this.selectedContractAccount.receiverAdresse = this.selectReceiveAddress;
    }

    console.log(this.selectedContractAccount);


    this.subscriptions.add( this.contractAccountService.set(this.selectedContractAccount).subscribe(
      data => {
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément Enregistré Avec Succès'});

        //this.toastr.success('Elément Enregistré Avec Succès', 'Edition');

        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

       // this.toastr.error(error.error.message);
        this.spinner.hide();
      },

      () => this.spinner.hide()
    ));


  }

  onNameSearch(event: any) {
    this.subscriptions.add(
      this.accountService
        .find("name~" + event.query)
        .subscribe((data) => (this.nameAccountList = data))
    );
  }

  onSelectAccount(event) {
    console.log(event);
    this.selectedContractAccount.account=event;
  }
  onSelectContractType(event) {
    console.log(event.value.code);
    this.contractType = event.value;
    this.selectedContractAccount.contractType = this.contractType;
    console.log(this.selectedContractAccount.contractType);
  }

  onSelectVehicleCategory(event){
this.selectedContractAccount.vehicleCategory=event;


  }

  onSelectPackageType(event){


this.selectedContractAccount.packageType=event.value;
console.log(event);


  }


  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }
}
