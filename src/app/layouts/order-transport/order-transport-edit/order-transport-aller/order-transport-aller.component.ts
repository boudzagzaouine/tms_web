import { TypeInfo } from "./../../../../shared/enum/type-info.enum";
import { OrderTransportService } from "./../../../../shared/services/api/order-transport.service";
import { AccountService } from "./../../../../shared/services/api/account.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { PackagingTypeService } from "./../../../../shared/services/api/packaging-type.service";
import { ContainerTypeService } from "./../../../../shared/services/api/container-type.service";
import { PackagingType } from "./../../../../shared/models/packaging-type";
import { ContainerType } from "./../../../../shared/models/container-type";
import { Account } from "./../../../../shared/models/account";
import { OrderTransportInfoLine } from "./../../../../shared/models/order-transport-info-line";
import { PackageDetail } from "./../../../../shared/models/package-detail";
import { AddressContactOrderTransportInfo } from "./../../../../shared/models/address-contact-order-transport-nfo";
import { OrderTransportInfo } from "./../../../../shared/models/order-transport-info";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { OrderTransport } from "./../../../../shared/models/order-transport";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-order-transport-aller",
  templateUrl: "./order-transport-aller.component.html",
  styleUrls: ["./order-transport-aller.component.scss"],
})
export class OrderTransportAllerComponent implements OnInit {
  @Output() nextstep = new EventEmitter<boolean>();
  @Output() previousstep = new EventEmitter<boolean>();

  orderTransportInfoForm: FormGroup;
  selectedOrderTransport: OrderTransport = new OrderTransport();

  selectedOrderTransportInfo: OrderTransportInfo = new OrderTransportInfo();
  selectedAddressContactOrderTransportInfoInitial: AddressContactOrderTransportInfo =
    new AddressContactOrderTransportInfo();
  selectedAddressContactOrderTransportInfoFinal: AddressContactOrderTransportInfo =
    new AddressContactOrderTransportInfo();

  idPackageDetail: number = 0;
  packageDetails: PackageDetail[] = [];
  selectPackageDetail: PackageDetail;
  editModePackageDetail: boolean = false;

  idOrderTransportLine: number = 0;
  orderTransportInfoLines: OrderTransportInfoLine[] = [];
  selectOrderTransportInfoLine: OrderTransportInfoLine;
  weightMax: number = 0;
  capacityMax: number = 0;
  numberOfPalletMax: number = 0;
  editModeOrderTransportInfoLine: boolean = false;
  showDialogOrderTransportInfoLine: boolean = false;

  selectedAccount: Account = new Account();
  // isExistAccountOrderTypeAllerInitial: string = "false";
  //isExistAccountOrderTypeAllerDistinataire: string = "false";
  selectedaccountInitialOrFinal: string = "false";
  showDialogContactAddress: boolean = false;
  showDialogPackageDetail: boolean = false;

  containerTypeList: ContainerType[] = [];
  packagingTypeList: PackagingType[] = [];
  accountList: Account[] = [];
  isFormSubmitted = false;

  constructor(
    private containerTypeService: ContainerTypeService,
    private packagingTypeService: PackagingTypeService,
    private confirmationService: ConfirmationService,
    private accountService: AccountService,
    public orderTransportService: OrderTransportService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.packagingTypeService.findAll().subscribe((data) => {
      this.packagingTypeList = data;
    });
    this.containerTypeService.findAll().subscribe((data) => {
      this.containerTypeList = data;
    });

    this.selectedOrderTransport = this.orderTransportService.getOrderTransport()
      ? this.orderTransportService.getOrderTransport()
      : new OrderTransport();
    this.selectedOrderTransportInfo =
      this.orderTransportService.getorderTransportInfoAller()
        ? this.orderTransportService.getorderTransportInfoAller()
        : new OrderTransportInfo();
    this.selectedAddressContactOrderTransportInfoInitial = this
      .selectedOrderTransportInfo.addressContactInitial
      ? this.selectedOrderTransportInfo.addressContactInitial
      : new AddressContactOrderTransportInfo();
    this.selectedAddressContactOrderTransportInfoFinal = this
      .selectedOrderTransportInfo.addressContactFinal
      ? this.selectedOrderTransportInfo.addressContactFinal
      : new AddressContactOrderTransportInfo();
    this.packageDetails = this.selectedOrderTransportInfo.packageDetails
      ? this.selectedOrderTransportInfo.packageDetails
      : [];
    this.orderTransportInfoLines = this.selectedOrderTransportInfo
      .orderTransportInfoLines
      ? this.selectedOrderTransportInfo.orderTransportInfoLines
      : [];
    this.initForm();
    console.log(this.selectedOrderTransportInfo.trajetUnique);
  }

  initForm() {
    this.orderTransportInfoForm = new FormGroup({
      packagingType: new FormControl(
        this.selectedOrderTransportInfo.packagingType,
        Validators.required
      ),
      numberOfPallet: new FormControl(
        this.selectedOrderTransportInfo.numberOfPallet,
        Validators.required
      ),
      weight: new FormControl(
        this.selectedOrderTransportInfo.weightTotal,
        Validators.required
      ),
      capacity: new FormControl(
        this.selectedOrderTransportInfo.capacityTotal,
        Validators.required
      ),

      trajetUnique: new FormControl(
        this.selectedOrderTransportInfo.trajetUnique
      ),

      orderTransportInfoInitialName: new FormControl(
        this.selectedAddressContactOrderTransportInfoInitial.name,
        Validators.required
      ),
      orderTransportInfoInitialTel1: new FormControl(
        this.selectedAddressContactOrderTransportInfoInitial.tel1,
        Validators.required
      ),
      orderTransportInfoInitialEmail: new FormControl(
        this.selectedAddressContactOrderTransportInfoInitial.email
      ),
      orderTransportInfoInitialCompany: new FormControl(
        this.selectedAddressContactOrderTransportInfoInitial.company
      ),
      orderTransportInfoInitialLine1: new FormControl(
        this.selectedAddressContactOrderTransportInfoInitial.line1,
        Validators.required
      ),
      orderTransportInfoInitialCity: new FormControl(
        this.selectedAddressContactOrderTransportInfoInitial.city,
        Validators.required
      ),
      orderTransportInfoInitialZip: new FormControl(
        this.selectedAddressContactOrderTransportInfoInitial.zip
      ),
      orderTransportInfoInitialCountry: new FormControl(
        this.selectedAddressContactOrderTransportInfoInitial.country,
        Validators.required
      ),
      orderTransportInfoInitialLatitude: new FormControl(
        this.selectedAddressContactOrderTransportInfoInitial.latitude,
        Validators.required
      ),
      orderTransportInfoInitialLongitude: new FormControl(
        this.selectedAddressContactOrderTransportInfoInitial.longitude,
        Validators.required
      ),
      orderTransportInfoInitialDate: new FormControl(
        new Date(this.selectedAddressContactOrderTransportInfoInitial.date)
      ),

      orderTransportInfoFinalName: new FormControl(
        this.selectedAddressContactOrderTransportInfoFinal.name,
        Validators.required
      ),
      orderTransportInfoFinalTel1: new FormControl(
        this.selectedAddressContactOrderTransportInfoFinal.tel1,
        Validators.required
      ),
      orderTransportInfoFinalEmail: new FormControl(
        this.selectedAddressContactOrderTransportInfoFinal.email
      ),
      orderTransportInfoFinalCompany: new FormControl(
        this.selectedAddressContactOrderTransportInfoFinal.company
      ),
      orderTransportInfoFinalLine1: new FormControl(
        this.selectedAddressContactOrderTransportInfoFinal.line1,
        Validators.required
      ),
      orderTransportInfoFinalCity: new FormControl(
        this.selectedAddressContactOrderTransportInfoFinal.city,
        Validators.required
      ),
      orderTransportInfoFinalZip: new FormControl(
        this.selectedAddressContactOrderTransportInfoFinal.zip
      ),
      orderTransportInfoFinalCountry: new FormControl(
        this.selectedAddressContactOrderTransportInfoFinal.country,
        Validators.required
      ),
      orderTransportInfoFinalLatitude: new FormControl(
        this.selectedAddressContactOrderTransportInfoFinal.latitude,
        Validators.required
      ),
      orderTransportInfoFinalLongitude: new FormControl(
        this.selectedAddressContactOrderTransportInfoFinal.longitude,
        Validators.required
      ),
      orderTransportInfoFinalDate: new FormControl(
        new Date(this.selectedAddressContactOrderTransportInfoFinal.date)
      ),
    });
  }
  validateForm() {
    this.isFormSubmitted = true;

    if (this.orderTransportInfoForm.invalid) {
      return;
    }

    if(this.selectedOrderTransportInfo.trajetUnique==false){
      if(this.selectedOrderTransportInfo.orderTransportInfoLines[0]==null){
           this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Remplir Les Lignes",
      });
       } else {
        this.selectedOrderTransportInfo.orderTransportInfoLines =
        this.orderTransportInfoLines;
        this.loadForm();
        this.nextstep.emit(true);
      }


    }else {
            this.selectedOrderTransportInfo.trajetUnique=true;
            this.selectedOrderTransportInfo.orderTransportInfoLines =[];
            this.loadForm();
            this.nextstep.emit(true);

    }





  }
  loadForm() {
    this.initFormInitial();
    this.initFormFinal();

    this.selectedOrderTransportInfo.weightTotal =
      this.orderTransportInfoForm.value["weight"];
    this.selectedOrderTransportInfo.capacityTotal =
      this.orderTransportInfoForm.value["capacity"];
      this.selectedOrderTransportInfo.numberOfPallet =
      this.orderTransportInfoForm.value["numberOfPallet"];
    this.selectedOrderTransportInfo.packageDetails = this.packageDetails;

    this.selectedOrderTransportInfo.type = TypeInfo.Aller.toString();
    this.orderTransportService.addOrderTransportInfoAller(
      this.selectedOrderTransportInfo
    );
  }

  initFormInitial() {
    let formValue = this.orderTransportInfoForm.value;

    this.selectedAddressContactOrderTransportInfoInitial.name =
      formValue["orderTransportInfoInitialName"];

    this.selectedAddressContactOrderTransportInfoInitial.tel1 =
      formValue["orderTransportInfoInitialTel1"];
    this.selectedAddressContactOrderTransportInfoInitial.email =
      formValue["orderTransportInfoInitialEmail"];
    this.selectedAddressContactOrderTransportInfoInitial.company =
      formValue["orderTransportInfoInitialCompany"];
    this.selectedAddressContactOrderTransportInfoInitial.line1 =
      formValue["orderTransportInfoInitialLine1"];
    this.selectedAddressContactOrderTransportInfoInitial.city =
      formValue["orderTransportInfoInitialCity"];
    this.selectedAddressContactOrderTransportInfoInitial.zip =
      formValue["orderTransportInfoInitialZip"];
    this.selectedAddressContactOrderTransportInfoInitial.country =
      formValue["orderTransportInfoInitialCountry"];
    this.selectedAddressContactOrderTransportInfoInitial.latitude =
      formValue["orderTransportInfoInitialLatitude"];
    this.selectedAddressContactOrderTransportInfoInitial.longitude =
      formValue["orderTransportInfoInitialLongitude"];
    this.selectedAddressContactOrderTransportInfoInitial.date =
      formValue["orderTransportInfoInitialDate"];

    this.selectedOrderTransportInfo.addressContactInitial =
      this.selectedAddressContactOrderTransportInfoInitial;
  }

  initFormFinal() {
    let formValue = this.orderTransportInfoForm.value;

    this.selectedAddressContactOrderTransportInfoFinal.name =
      formValue["orderTransportInfoFinalName"];

    this.selectedAddressContactOrderTransportInfoFinal.tel1 =
      formValue["orderTransportInfoFinalTel1"];
    this.selectedAddressContactOrderTransportInfoFinal.email =
      formValue["orderTransportInfoFinalEmail"];
    this.selectedAddressContactOrderTransportInfoFinal.company =
      formValue["orderTransportInfoFinalCompany"];
    this.selectedAddressContactOrderTransportInfoFinal.line1 =
      formValue["orderTransportInfoFinalLine1"];
    this.selectedAddressContactOrderTransportInfoFinal.city =
      formValue["orderTransportInfoFinalCity"];
    this.selectedAddressContactOrderTransportInfoFinal.zip =
      formValue["orderTransportInfoFinalZip"];
    this.selectedAddressContactOrderTransportInfoFinal.country =
      formValue["orderTransportInfoFinalCountry"];
    this.selectedAddressContactOrderTransportInfoFinal.longitude =
      formValue["orderTransportInfoFinalLongitude"];
    this.selectedAddressContactOrderTransportInfoFinal.latitude =
      formValue["orderTransportInfoFinalLatitude"];
    this.selectedAddressContactOrderTransportInfoFinal.date =
      formValue["orderTransportInfoFinalDate"];
    this.selectedOrderTransportInfo.addressContactFinal =
      this.selectedAddressContactOrderTransportInfoFinal;
  }

  // address

  setInfoInitial(event) {
    this.orderTransportInfoForm.patchValue({
      orderTransportInfoInitialName: event.name,
      orderTransportInfoInitialTel1: event.tel1,
      orderTransportInfoInitialEmail: event.email,
      orderTransportInfoInitialCompany: event.company,
      orderTransportInfoInitialLine1: event.line1,
      orderTransportInfoInitialCity: event.city,
      orderTransportInfoInitialZip: event.zip,
      orderTransportInfoInitialCountry: event.country,
      orderTransportInfoInitialLatitude: event.latitude,
      orderTransportInfoInitialLongitude: event.longitude,
    });
    this.orderTransportInfoForm.updateValueAndValidity();
  }

  setInfoFinal(event) {
    this.orderTransportInfoForm.patchValue({
      orderTransportInfoFinalName: event.name,
      orderTransportInfoFinalTel1: event.tel1,
      orderTransportInfoFinalEmail: event.email,
      orderTransportInfoFinalCompany: event.company,
      orderTransportInfoFinalLine1: event.line1,
      orderTransportInfoFinalCity: event.city,
      orderTransportInfoFinalZip: event.zip,
      orderTransportInfoFinalLatitude: event.latitude,
      orderTransportInfoFinalLongitude: event.longitude,
      orderTransportInfoFinalCountry: event.country,
    });
    this.orderTransportInfoForm.updateValueAndValidity();
  }

  trajetUnique(event) {
    console.log(event.checked);
    this.selectedOrderTransportInfo.trajetUnique=event.checked;
    if(event.checked==true){
        if(this.orderTransportInfoLines[0]!=null){
          this.confirmationService.confirm({
            message: "Voulez vous vraiment Trajet Unique?",
            accept: () => {
              this.selectedOrderTransportInfo.trajetUnique =true;
            },
            reject:()=>{
              this.selectedOrderTransportInfo.trajetUnique =false;

              this.orderTransportInfoForm.patchValue({
                trajetUnique:false
              })
            }
          });
        }
    }
  }

  affectedContactAddressInfoSelected(event) {
    if (this.selectedaccountInitialOrFinal == "Initial") {
      this.setInfoInitial(event);
    } else if (this.selectedaccountInitialOrFinal == "Final") {
      this.setInfoFinal(event);
    }
  }

  onHideDialogGenerateContactAddress(event) {
    this.showDialogContactAddress = event;
  }

  // fin address

  onSelectPackagingType(event) {
    this.selectedOrderTransportInfo.packagingType = event.value;
  }

  // account

  onAccountSearch(event: any) {
    this.accountService
      .find("name~" + event.query)
      .subscribe((data) => (this.accountList = data));
  }

  onSelectAccountInitial() {
    this.showDialogContactAddress = true;
    this.selectedAccount = this.selectedOrderTransport.account;
    this.selectedaccountInitialOrFinal = "Initial";
  }

  onSelectAccountFinal() {
    this.showDialogContactAddress = true;
    this.selectedAccount = this.selectedOrderTransport.account;
    this.selectedaccountInitialOrFinal = "Final";
  }
  // fin account

  // PackageDetail

  onHideDialogPackageDetail(event) {
    this.showDialogPackageDetail = event;
  }
  onLineEditedPackageDetail(packageDetail: PackageDetail) {
    if (this.packageDetails.length == 0) {
      this.idPackageDetail--;
      packageDetail.id = this.idPackageDetail;
    } else {
      if (packageDetail.id == undefined || packageDetail.id == null) {
        this.idPackageDetail =
          this.packageDetails[this.packageDetails.length - 1].id;
        this.idPackageDetail--;
        packageDetail.id = this.idPackageDetail;
      }
    }
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

  //  line

  onHideDialogOrderTransportInfoLine(event) {
    this.showDialogOrderTransportInfoLine = event;
  }
  onLineEditedOrderTransportInfoLine(
    orderTransportInfoLine: OrderTransportInfoLine
  ) {
    this.orderTransportInfoLines = this.orderTransportInfoLines.sort(function (
      a,
      b
    ) {
      return Number(a.lineNumber) - Number(b.lineNumber);
    });

    const size = this.orderTransportInfoLines.length;
    if (size == 0) {
      this.idOrderTransportLine--;
      orderTransportInfoLine.id = this.idOrderTransportLine;
      orderTransportInfoLine.lineNumber = 1;
    } else {
      if (
        orderTransportInfoLine.id == undefined ||
        orderTransportInfoLine.id == null
      ) {
        this.idOrderTransportLine =
          this.orderTransportInfoLines[
            this.orderTransportInfoLines.length - 1
          ].id;
        this.idOrderTransportLine--;
        orderTransportInfoLine.id = this.idOrderTransportLine;
        let lastLine = this.orderTransportInfoLines[size - 1].lineNumber
          ? this.orderTransportInfoLines[size - 1].lineNumber
          : 0;
        orderTransportInfoLine.lineNumber = lastLine + 1;
      }
    }
    const orderline = this.orderTransportInfoLines.find(
      (line) => line.id === orderTransportInfoLine.id
    );
    if (orderline == null) {
      this.orderTransportInfoLines.push(orderTransportInfoLine);
      this.orderTransportService.addLinesAller(this.orderTransportInfoLines);

    }
  }

  onShowDialogOrderTransportInfoLine(line, mode) {
    if (
      this.orderTransportInfoForm.value["weight"] == null ||
      this.orderTransportInfoForm.value["weight"] == ""
    ) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Saisir  Poids",
      });
    } else if (
      this.orderTransportInfoForm.value["capacity"] == null ||
      this.orderTransportInfoForm.value["capacity"] == ""
    ) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Saisir Volume",
      });
    } else if (
      this.orderTransportInfoForm.value["numberOfPallet"] == null ||
      this.orderTransportInfoForm.value["numberOfPallet"] == ""
    ) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Saisir Nombre de palette",
      });
    } else {
      this.weightMax = this.orderTransportInfoForm.value["weight"];
      this.numberOfPalletMax = this.orderTransportInfoForm.value["numberOfPallet"];
      this.capacityMax = this.orderTransportInfoForm.value["capacity"];

      this.showDialogOrderTransportInfoLine = true;

      if (mode == true) {
        this.selectOrderTransportInfoLine = line;
        this.editModeOrderTransportInfoLine = true;
      } else {
        this.selectOrderTransportInfoLine = new OrderTransportInfoLine();


        this.editModeOrderTransportInfoLine = false;
      }
    }
  }

  onDeleteOrderTransportInfoLine(id: number) {
    this.confirmationService.confirm({
      message: "Voulez vous vraiment Suprimer?",
      accept: () => {
        this.orderTransportInfoLines = this.orderTransportInfoLines.filter(
          (l) => l.id !== id
        );
        this.orderTransportService.addLinesAller(this.orderTransportInfoLines);
      },
    });
  }

  // fin Line

  previous() {
    this.loadForm();

    this.previousstep.emit(true);
  }

  next() {
    this.validateForm();
  }
}
