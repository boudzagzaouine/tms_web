import { Observable } from "rxjs/Observable";
import { MessageService } from "primeng/api";
import { OrderTransportType } from "./../../../../shared/models/order-transport-type";
import { OrderTransportService } from "./../../../../shared/services/api/order-transport.service";
import { OrderTransportTypeService } from "./../../../../shared/services/api/order-transport-type.service";
import { AddressContactOrderTransportInfo } from "./../../../../shared/models/address-contact-order-transport-nfo";
import { OrderTransportInfoLine } from "./../../../../shared/models/order-transport-info-line";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AccountService } from "./../../../../shared/services/api/account.service";
import { Account } from "./../../../../shared/models/account";
import { Subject, Subscription } from "rxjs";
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { OrderTransport } from "./../../../../shared/models/order-transport";

@Component({
  selector: "app-order-transport-info-line",
  templateUrl: "./order-transport-info-line.component.html",
  styleUrls: ["./order-transport-info-line.component.scss"],
})
export class OrderTransportInfoLineComponent implements OnInit {
  @Input() selectedOrderTransportInfoLine: OrderTransportInfoLine;
  @Input() editMode: number;
  @Input() typeInfo: string;
  @Input() weightEnlevementMax: number;
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() orderTransportInfoLineAdded =
    new EventEmitter<OrderTransportInfoLine>();
  selectedOrderTransport: OrderTransport = new OrderTransport();
  orderTransportInfoLineForm: FormGroup;
  selectAddressContactDeliveryInfo: AddressContactOrderTransportInfo =
    new AddressContactOrderTransportInfo();

  orderTransportTypeList: OrderTransportType[] = [];

  isFormSubmitted = false;
  displayDialog: boolean;
  title = "Sous Trajet";
  subscrubtion = new Subscription();

  isExistAccount: string = "false";
  accountList: Account[] = [];
  showDialogContactAddress: Boolean = false;
  selectedAccount: Account = new Account();
  selectedaccountEnlevementOrLivraison: string = "false";

  showWeightMaxEnlevement: Boolean = false;
  weightRestEnlevement: number;
  weightMaxLivraison: Boolean = false;
  lines: OrderTransportInfoLine[] = [];

  constructor(
    private orderTransportTypeService: OrderTransportTypeService,
    private accountService: AccountService,
    public orderTransportService: OrderTransportService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    console.log(this.typeInfo);
    console.log(this.weightEnlevementMax);

    this.initForm();
    this.selectedOrderTransport = this.orderTransportService.getOrderTransport()
      ? this.orderTransportService.getOrderTransport()
      : new OrderTransport();

    this.orderTransportTypeService.findAll().subscribe((data) => {
      this.orderTransportTypeList = data;
      this.initForm();
    });
    if (this.editMode) {
      this.selectAddressContactDeliveryInfo =
        this.selectedOrderTransportInfoLine.addressContactDeliveryInfo;
    }

    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    if (!this.editMode) {
      //this.selectedOrderTransportInfoLine = new OrderTransportInfoLine();
      this.selectedOrderTransportInfoLine.orderTransportType =
        this.orderTransportTypeList[0];
    }

    this.orderTransportInfoLineForm = new FormGroup({
      general: new FormGroup({
        orderTransportType: new FormControl(
          this.selectedOrderTransportInfoLine.orderTransportType,
          Validators.required
        ),
        deliveryInfoName: new FormControl(
          this.selectAddressContactDeliveryInfo.name,
          Validators.required
        ),
        deliveryInfoTel1: new FormControl(
          this.selectAddressContactDeliveryInfo.tel1,
          Validators.required
        ),
        deliveryInfoEmail: new FormControl(
          this.selectAddressContactDeliveryInfo.email
        ),
        deliveryInfoCompany: new FormControl(
          this.selectAddressContactDeliveryInfo.company
        ),
        deliveryInfoLine1: new FormControl(
          this.selectAddressContactDeliveryInfo.line1,
          Validators.required
        ),
        deliveryInfoCity: new FormControl(
          this.selectAddressContactDeliveryInfo.city,
          Validators.required
        ),
        deliveryInfoZip: new FormControl(
          this.selectAddressContactDeliveryInfo.zip
        ),
        deliveryInfoCountry: new FormControl(
          this.selectAddressContactDeliveryInfo.country,
          Validators.required
        ),
        deliveryInfoLatitude: new FormControl(
          this.selectAddressContactDeliveryInfo.latitude,
          Validators.required
        ),
        deliveryInfoLongitude: new FormControl(
          this.selectAddressContactDeliveryInfo.longitude,
          Validators.required
        ),
        deliveryInfoDate: new FormControl(
          new Date(this.selectAddressContactDeliveryInfo.date)
        ),
      }),
      enlevement: new FormGroup({
        numberOfPallets: new FormControl(
          this.selectedOrderTransportInfoLine.numberOfPalletEnlevement,
          Validators.required
        ),
        capacity: new FormControl(
          this.selectedOrderTransportInfoLine.capacityEnlevement,
          Validators.required
        ),
        weight: new FormControl(
          this.selectedOrderTransportInfoLine.weightEnlevement,
          Validators.required
        ),
        comment: new FormControl(
          this.selectedOrderTransportInfoLine.commentEnlevement
        ),
      }),
      livraison: new FormGroup({
        numberOfPallets: new FormControl(
          this.selectedOrderTransportInfoLine.numberOfPalletLivraison,
          Validators.required
        ),
        capacity: new FormControl(
          this.selectedOrderTransportInfoLine.capacityLivraison,
          Validators.required
        ),
        weight: new FormControl(
          this.selectedOrderTransportInfoLine.weightLivraison,
          Validators.required
        ),
        comment: new FormControl(
          this.selectedOrderTransportInfoLine.commentLivraison
        ),
      }),
    });
  }

  getValueFromEnlevementForm() {
    let formvalue = this.orderTransportInfoLineForm.value;
    this.selectAddressContactDeliveryInfo.name = formvalue["general"][
      "deliveryInfoName"
    ].name
      ? formvalue["general"]["deliveryInfoName"].name
      : formvalue["general"]["deliveryInfoName"];
    this.selectAddressContactDeliveryInfo.tel1 =
      formvalue["general"]["deliveryInfoTel1"];
    this.selectAddressContactDeliveryInfo.email =
      formvalue["general"]["deliveryInfoEmail"];
    this.selectAddressContactDeliveryInfo.company =
      formvalue["general"]["deliveryInfoCompany"];
    this.selectAddressContactDeliveryInfo.line1 =
      formvalue["general"]["deliveryInfoLine1"];
    this.selectAddressContactDeliveryInfo.city =
      formvalue["general"]["deliveryInfoCity"];
    this.selectAddressContactDeliveryInfo.zip =
      formvalue["general"]["deliveryInfoZip"];
    this.selectAddressContactDeliveryInfo.country =
      formvalue["general"]["deliveryInfoCountry"];
    this.selectAddressContactDeliveryInfo.date =
      formvalue["general"]["deliveryInfoDate"];
    this.selectAddressContactDeliveryInfo.latitude =
      formvalue["general"]["deliveryInfoLatitude"];
    this.selectAddressContactDeliveryInfo.longitude =
      formvalue["general"]["deliveryInfoLongitude"];
  }

  onSubmit() {
    this.isFormSubmitted = true;

    if (this.orderTransportInfoLineForm.controls["general"].invalid) {
      return;
    }
    if (
      this.showWeightMaxEnlevement == true ||
      this.weightMaxLivraison == true
    ) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Erreur Poids",
      });
    } else {
      let formvalue = this.orderTransportInfoLineForm.value;
      this.getValueFromEnlevementForm();
      this.selectedOrderTransportInfoLine.addressContactDeliveryInfo =
        this.selectAddressContactDeliveryInfo;

      if (this.selectedOrderTransportInfoLine.orderTransportType.id == 1) {
        this.destroyLivraison();
        this.validateEnlevement();
      }
      if (this.selectedOrderTransportInfoLine.orderTransportType.id == 2) {
        this.destroyEnlevement();
        this.validateLivraison();
      }
      if (this.selectedOrderTransportInfoLine.orderTransportType.id == 3) {
        this.validateEnlevement();
        this.validateLivraison();
      }

      console.log(this.selectedOrderTransportInfoLine);

      this.orderTransportInfoLineAdded.emit(
        this.selectedOrderTransportInfoLine
      );
      this.displayDialog = false;
    }
  }

  destroyEnlevement() {
    this.selectedOrderTransportInfoLine.capacityEnlevement = null;
    this.selectedOrderTransportInfoLine.weightEnlevement = null;
    this.selectedOrderTransportInfoLine.numberOfPalletEnlevement = null;
    this.selectedOrderTransportInfoLine.commentEnlevement = null;
  }
  validateEnlevement() {
    let formvalue = this.orderTransportInfoLineForm.value;
    if (this.orderTransportInfoLineForm.controls["enlevement"].invalid) {
      return;
    }

    this.selectedOrderTransportInfoLine.numberOfPalletEnlevement =
      formvalue["enlevement"]["numberOfPallets"];
    this.selectedOrderTransportInfoLine.weightEnlevement =
      formvalue["enlevement"]["weight"];
    this.selectedOrderTransportInfoLine.capacityEnlevement =
      formvalue["enlevement"]["capacity"];
    this.selectedOrderTransportInfoLine.commentEnlevement =
      formvalue["enlevement"]["comment"];
  }
  destroyLivraison() {
    this.selectedOrderTransportInfoLine.capacityLivraison = null;
    this.selectedOrderTransportInfoLine.weightLivraison = null;
    this.selectedOrderTransportInfoLine.numberOfPalletLivraison = null;
    this.selectedOrderTransportInfoLine.commentLivraison = null;
  }
  validateLivraison() {
    let formvalue = this.orderTransportInfoLineForm.value;

    if (this.orderTransportInfoLineForm.controls["livraison"].invalid) {
      return;
    }

    this.selectedOrderTransportInfoLine.numberOfPalletLivraison =
      formvalue["livraison"]["numberOfPallets"];
    this.selectedOrderTransportInfoLine.weightLivraison =
      formvalue["livraison"]["weight"];
    this.selectedOrderTransportInfoLine.capacityLivraison =
      formvalue["livraison"]["capacity"];
    this.selectedOrderTransportInfoLine.commentLivraison =
      formvalue["livraison"]["comment"];
  }
  onSelectorderTransportType(event) {
    this.selectedOrderTransportInfoLine.orderTransportType = event.value;
  }
  inputWeightEnlevement(event) {
    this.lines =
      this.typeInfo == "Aller"
        ? this.orderTransportService.getLinesAller()
        : this.orderTransportService.getLinesRetour();

    if (this.selectedOrderTransportInfoLine.orderTransportType.id == 1) {
      this.getWeightLine(this.lines,event.value);
    }

    //(event.value > this.selectedOrderTransportInfoLine.showWeightMaxEnlevement) ? this.showWeightMaxEnlevement=true : this.showWeightMaxEnlevement=false;
  }
  inputWeightLivraison(event) {
    //  (event.value > this.selectedOrderTransportInfoLine.weightMaxLivraison) ? this.weightMaxLivraison=true : this.weightMaxLivraison=false;
  }

  getWeightLine(enlevementlines :OrderTransportInfoLine[],weight: number) {
    let sumWeight: number = 0;
    enlevementlines.forEach((element) => {
      sumWeight += element.weightEnlevement;
    });
    this.weightRestEnlevement = this.weightEnlevementMax - sumWeight;
    this.showWeightMaxEnlevement = false;
    if (weight > this.weightRestEnlevement){
      this.showWeightMaxEnlevement = true;
    }
  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  onAccountSearch(event: any) {
    this.accountService
      .find("name~" + event.query)
      .subscribe((data) => (this.accountList = data));
  }
  onSelectAccount(event, type) {
    this.showDialogContactAddress = true;
    this.selectedAccount = this.selectedOrderTransport.account;
    this.selectedaccountEnlevementOrLivraison = type;
  }
  onHideDialogGenerateContactAddress(event) {
    this.showDialogContactAddress = event;
  }

  affectedContactAddressInfoSelected(event) {
    this.setInfoAddress(event);
  }

  setInfoAddress(event) {
    console.log("enleventm set");
    console.log(event);

    this.orderTransportInfoLineForm.controls["general"].patchValue({
      deliveryInfoName: event.name,
      deliveryInfoTel1: event.tel1,
      deliveryInfoEmail: event.email,
      deliveryInfoCompany: event.company,
      deliveryInfoLine1: event.line1,
      deliveryInfoCity: event.city,
      deliveryInfoZip: event.zip,
      deliveryInfoCountry: event.country,
      deliveryInfoLatitude: event.latitude,
      deliveryInfoLongitude: event.longitude,
    });
    this.orderTransportInfoLineForm.updateValueAndValidity();
  }

  ngOnDestroy() {
    this.subscrubtion.unsubscribe();
  }
}
