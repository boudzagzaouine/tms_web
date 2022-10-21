import { DeliveryInfo } from './../../../../shared/models/delivery-info';
import { OrderDelivery } from './../../../../shared/models/order-delivery';
import { OrderDeliveryService } from './../../../../shared/services/api/order-delivery.service';
import { AccountService } from './../../../../shared/services/api/account.service';
import { ConfirmationService } from 'primeng/api';
import { PackagingTypeService } from './../../../../shared/services/api/packaging-type.service';
import { ContainerTypeService } from './../../../../shared/services/api/container-type.service';
import { ContainerType } from './../../../../shared/models/container-type';
import { Account } from './../../../../shared/models/account';
import { PackagingType } from './../../../../shared/models/packaging-type';
import { AddressContactDeliveryInfo } from './../../../../shared/models/address-contact-delivery-info';
import { PackageDetail } from './../../../../shared/models/package-detail';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-merchandise-retour-edit',
  templateUrl: './merchandise-retour-edit.component.html',
  styleUrls: ['./merchandise-retour-edit.component.scss']
})
export class MerchandiseRetourEditComponent implements OnInit {

  @Input() nextAddressSource: boolean = false;
  @Output() nextstep = new EventEmitter<boolean>();
  @Output() previousstep = new EventEmitter<boolean>();

  deliveryInfoForm: FormGroup;
selectedDeliveryInfo : DeliveryInfo = new DeliveryInfo();
selectedAddressContactDeliveryInfoSource: AddressContactDeliveryInfo = new AddressContactDeliveryInfo();
selectedAddressContactDeliveryInfoDestination: AddressContactDeliveryInfo =new AddressContactDeliveryInfo();
selectOrderDelivery : OrderDelivery=new OrderDelivery();

packageDetails: PackageDetail[] = [];
  selectPackageDetail: PackageDetail;
  editModePackageDetail: boolean = false;

  selectedAccount: Account = new Account();
  isExistAccountOrderTypeRetourSource: string = "false";
  isExistAccountOrderTypeRetourDistinataire: string = "false";
  selectedaccountsourceOrDistination: string = "false";
  showDialogContactAddress: boolean = false;
  showDialogPackageDetail: boolean = false;


  containerTypeList: ContainerType[] = [];
  packagingTypeList: PackagingType[] = [];
  accountList: Account[] = [];
  isFormSubmitted = false;
  idPackageDetail :number=0;
  constructor(
    private containerTypeService: ContainerTypeService,
    private packagingTypeService: PackagingTypeService,
    private confirmationService: ConfirmationService,
    private accountService: AccountService,
    public orderDeliveryService: OrderDeliveryService
  ) {}

  ngOnInit() {

    this.packagingTypeService.findAll().subscribe((data) => {
      this.packagingTypeList = data;
    });
    this.containerTypeService.findAll().subscribe((data) => {
      this.containerTypeList = data;
    });

   this.selectedDeliveryInfo =this.orderDeliveryService.getDeliveryInfoRetour()?this.orderDeliveryService.getDeliveryInfoRetour():new DeliveryInfo();
   this.selectedAddressContactDeliveryInfoSource=this.selectedDeliveryInfo.contactDeliveryInfoSource ?this.selectedDeliveryInfo.contactDeliveryInfoSource : new AddressContactDeliveryInfo();
   this.selectedAddressContactDeliveryInfoDestination=this.selectedDeliveryInfo.contactDeliveryInfoDistination?this.selectedDeliveryInfo.contactDeliveryInfoDistination:new AddressContactDeliveryInfo();
    this.packageDetails=this.selectedDeliveryInfo.packageDetails?this.selectedDeliveryInfo.packageDetails:[];
    this.initForm();
    console.log(this.orderDeliveryService.getOrderDelivery());

  }


  initForm() {
    this.deliveryInfoForm = new FormGroup({
      packagingType: new FormControl(
         this.selectedDeliveryInfo.packagingType,
        Validators.required
      ),
      weight: new FormControl(
         this.selectedDeliveryInfo.weightTotal,
        Validators.required
      ),
      capacity: new FormControl(
        this.selectedDeliveryInfo.capacityTotal,
        Validators.required
      ),

      deliveryInfoSourceName: new FormControl(
        this.selectedAddressContactDeliveryInfoSource.name,
        Validators.required
      ),
      deliveryInfoSourceTel1: new FormControl(
        this.selectedAddressContactDeliveryInfoSource.tel1,
        Validators.required
      ),
      deliveryInfoSourceEmail: new FormControl(
        this.selectedAddressContactDeliveryInfoSource.email
      ),
      deliveryInfoSourceCompany: new FormControl(
        this.selectedAddressContactDeliveryInfoSource.company
      ),
      deliveryInfoSourceLine1: new FormControl(
        this.selectedAddressContactDeliveryInfoSource.line1,
        Validators.required
      ),
      deliveryInfoSourceCity: new FormControl(
        this.selectedAddressContactDeliveryInfoSource.city,
        Validators.required
      ),
      deliveryInfoSourceZip: new FormControl(
        this.selectedAddressContactDeliveryInfoSource.zip
      ),
      deliveryInfoSourceCountry: new FormControl(
        this.selectedAddressContactDeliveryInfoSource.country,
        Validators.required
      ),
      deliveryInfoSourceLatitude: new FormControl(
        this.selectedAddressContactDeliveryInfoSource.latitude,
        Validators.required
      ),
      deliveryInfoSourceLongitude: new FormControl(
        this.selectedAddressContactDeliveryInfoSource.longitude,
        Validators.required
      ),
      deliveryInfoSourceDate: new FormControl(
        new Date(this.selectedAddressContactDeliveryInfoSource.date)
      ),

      deliveryInfoDestinationName: new FormControl(
        this.selectedAddressContactDeliveryInfoDestination.name,
        Validators.required
      ),
      deliveryInfoDestinationTel1: new FormControl(
        this.selectedAddressContactDeliveryInfoDestination.tel1,
        Validators.required
      ),
      deliveryInfoDestinationEmail: new FormControl(
        this.selectedAddressContactDeliveryInfoDestination.email
      ),
      deliveryInfoDestinationCompany: new FormControl(
        this.selectedAddressContactDeliveryInfoDestination.company
      ),
      deliveryInfoDestinationLine1: new FormControl(
        this.selectedAddressContactDeliveryInfoDestination.line1,
        Validators.required
      ),
      deliveryInfoDestinationCity: new FormControl(
        this.selectedAddressContactDeliveryInfoDestination.city,
        Validators.required
      ),
      deliveryInfoDestinationZip: new FormControl(
        this.selectedAddressContactDeliveryInfoDestination.zip
      ),
      deliveryInfoDestinationCountry: new FormControl(
        this.selectedAddressContactDeliveryInfoDestination.country,
        Validators.required
      ),
      deliveryInfoDestinationLatitude: new FormControl(
        this.selectedAddressContactDeliveryInfoDestination.latitude,
        Validators.required
      ),
      deliveryInfoDestinationLongitude: new FormControl(
        this.selectedAddressContactDeliveryInfoDestination.longitude,
        Validators.required
      ),
      deliveryInfoDestinationDate: new FormControl(
        new Date(this.selectedAddressContactDeliveryInfoDestination.date)
      ),
    });
  }
  validateForm(){

    this.isFormSubmitted = true;

      if (this.deliveryInfoForm.invalid) {
        return;
      }

  this.loadForm();
  this.nextstep.emit(true);




  }
  loadForm(){
    this.initFormSource();
    this.initFormDistination();
     this.selectedDeliveryInfo.weightTotal = this.deliveryInfoForm.value["weight"];
    this.selectedDeliveryInfo.capacityTotal = this.deliveryInfoForm.value["capacity"];
  this.selectedDeliveryInfo.packageDetails=this.packageDetails;
  this.orderDeliveryService.addDeliveryInfoRetour(this.selectedDeliveryInfo);
  }

  initFormSource() {
    let formValue = this.deliveryInfoForm.value;
    if (this.isExistAccountOrderTypeRetourSource == "true") {
      this.selectedAddressContactDeliveryInfoSource.name =
        formValue["deliveryInfoSourceName"].name;
    } else {
      this.selectedAddressContactDeliveryInfoSource.name =
        formValue["deliveryInfoSourceName"];
    }
    this.selectedAddressContactDeliveryInfoSource.tel1 = formValue["deliveryInfoSourceTel1"];
    this.selectedAddressContactDeliveryInfoSource.email =
      formValue["deliveryInfoSourceEmail"];
    this.selectedAddressContactDeliveryInfoSource.company =
      formValue["deliveryInfoSourceCompany"];
    this.selectedAddressContactDeliveryInfoSource.line1 =
      formValue["deliveryInfoSourceLine1"];
    this.selectedAddressContactDeliveryInfoSource.city = formValue["deliveryInfoSourceCity"];
    this.selectedAddressContactDeliveryInfoSource.zip = formValue["deliveryInfoSourceZip"];
    this.selectedAddressContactDeliveryInfoSource.country =
      formValue["deliveryInfoSourceCountry"];
    this.selectedAddressContactDeliveryInfoSource.latitude =
      formValue["deliveryInfoSourceLatitude"];
    this.selectedAddressContactDeliveryInfoSource.longitude =
      formValue["deliveryInfoSourceLongitude"];
    this.selectedAddressContactDeliveryInfoSource.date = formValue["deliveryInfoSourceDate"];

    this.selectedDeliveryInfo.contactDeliveryInfoSource=this.selectedAddressContactDeliveryInfoSource;

  }

  initFormDistination() {
    let formValue = this.deliveryInfoForm.value;
    if (this.isExistAccountOrderTypeRetourDistinataire == "true") {
      this.selectedAddressContactDeliveryInfoDestination.name =
        formValue["deliveryInfoDestinationName"].name;
    } else {
      this.selectedAddressContactDeliveryInfoDestination.name =
        formValue["deliveryInfoDestinationName"];
    }
    this.selectedAddressContactDeliveryInfoDestination.tel1 =
      formValue["deliveryInfoDestinationTel1"];
    this.selectedAddressContactDeliveryInfoDestination.email =
      formValue["deliveryInfoDestinationEmail"];
    this.selectedAddressContactDeliveryInfoDestination.company =
      formValue["deliveryInfoDestinationCompany"];
    this.selectedAddressContactDeliveryInfoDestination.line1 =
      formValue["deliveryInfoDestinationLine1"];
    this.selectedAddressContactDeliveryInfoDestination.city =
      formValue["deliveryInfoDestinationCity"];
    this.selectedAddressContactDeliveryInfoDestination.zip =
      formValue["deliveryInfoDestinationZip"];
    this.selectedAddressContactDeliveryInfoDestination.country =
      formValue["deliveryInfoDestinationCountry"];
    this.selectedAddressContactDeliveryInfoDestination.longitude =
      formValue["deliveryInfoDestinationLongitude"];
    this.selectedAddressContactDeliveryInfoDestination.latitude =
      formValue["deliveryInfoDestinationLatitude"];
    this.selectedAddressContactDeliveryInfoDestination.date =
      formValue["deliveryInfoDestinationDate"];
      this.selectedDeliveryInfo.contactDeliveryInfoDistination=this.selectedAddressContactDeliveryInfoDestination;
    }

  // address

   setInfoSource(event){
this.deliveryInfoForm.patchValue({
        deliveryInfoSourceTel1: event.tel1,
        deliveryInfoSourceEmail: event.email,
        deliveryInfoSourceCompany: event.company,
        deliveryInfoSourceLine1: event.line1,
        deliveryInfoSourceCity: event.city,
        deliveryInfoSourceZip: event.zip,
        deliveryInfoSourceCountry: event.country,
        deliveryInfoSourceLatitude: event.latitude,
        deliveryInfoSourceLongitude: event.longitude,
      });
      this.deliveryInfoForm.updateValueAndValidity();
   }

   setInfoDistination(event){
    this.deliveryInfoForm.patchValue({
      deliveryInfoDestinationTel1: event.tel1,
      deliveryInfoDestinationEmail: event.email,
      deliveryInfoDestinationCompany: event.company,
      deliveryInfoDestinationLine1: event.line1,
      deliveryInfoDestinationCity: event.city,
      deliveryInfoDestinationZip: event.zip,
      deliveryInfoDestinationLatitude: event.latitude,
      deliveryInfoDestinationLongitude: event.longitude,
      deliveryInfoDestinationCountry: event.country,
    });
    this.deliveryInfoForm.updateValueAndValidity();

   }
  affectedContactAddressInfoSelected(event) {
    console.log(event);

    console.log(this.selectedaccountsourceOrDistination);

    if (this.selectedaccountsourceOrDistination == "Source") {
      this.setInfoSource(event)

    } else if (this.selectedaccountsourceOrDistination == "Destination") {
      this.setInfoDistination(event)

    }
  }

  onHideDialogGenerateContactAddress(event) {
    this.showDialogContactAddress = event;
  }

  // fin address

  onSelectPackagingType(event) {
   this.selectedDeliveryInfo.packagingType=event.value;

  }

  // account

  onAccountSearch(event: any) {
    this.accountService
      .find("name~" + event.query)
      .subscribe((data) => (this.accountList = data));
  }
  onSelectAccount(event, type) {
    this.showDialogContactAddress = true;
    this.selectedAccount = event;
    console.log(type);

    this.selectedaccountsourceOrDistination = type;
  }

  // fin account

  // PackageDetail

  onHideDialogPackageDetail(event) {
    this.showDialogPackageDetail = event;
  }
  onLineEditedPackageDetail(packageDetail: PackageDetail) {
    console.log(packageDetail);
this.idPackageDetail--;
packageDetail.id=packageDetail.id>0 ? packageDetail.id :this.idPackageDetail;
    const orderline = this.packageDetails.find(
      (line) => line.containerType.id === packageDetail.containerType.id
    );
    if (orderline == null) {
      this.packageDetails.push(packageDetail);

    }
  }

  onShowDialogPackageDetail(line, mode) {
    this.showDialogPackageDetail = true;

    if (mode == true) {
      this.selectPackageDetail = line;
      this.editModePackageDetail = true;
    } else {
      this.editModePackageDetail = false;
    }
  }

  onDeletePackageDetail(id: number) {
    this.confirmationService.confirm({
      message: "Voulez vous vraiment Suprimer?",
      accept: () => {
        this.packageDetails = this.packageDetails.filter((l) => l.id !== id);
      },
    });
  }

  // Fin PackageDetail

  previous() {

  this.loadForm();
console.log(this.selectedDeliveryInfo);


this.previousstep.emit(true);
  }

  next() {
    this.validateForm();
    console.log(this.selectedDeliveryInfo);


  }
}
