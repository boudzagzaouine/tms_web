import { TurnStatusService } from './../../../../shared/services/api/turn-status.service';
import { TurnStatus } from './../../../../shared/models/turn-status';
import { VilleService } from './../../../../shared/services/api/ville.service';
import { Ville } from './../../../../shared/models/ville';
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
  villeList :Ville[]=[];
  turnStatus : TurnStatus = new TurnStatus();
  constructor(
    private containerTypeService: ContainerTypeService,
    private packagingTypeService: PackagingTypeService,
    private confirmationService: ConfirmationService,
    private accountService: AccountService,
    public orderTransportService: OrderTransportService,
    private messageService: MessageService,
    private villeService: VilleService,
    private turnStatusService:TurnStatusService
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


      orderTransportInfoInitialCity: new FormControl(
        this.selectedOrderTransportInfo.villeSource,
        Validators.required
      ),

      orderTransportInfoInitialCountry: new FormControl(
        'MAROC',
      ),
      orderTransportInfoInitialDate: new FormControl(
       new Date(this.selectedOrderTransportInfo.date)
      ),


      orderTransportInfoFinalCity: new FormControl(
        this.selectedOrderTransportInfo.villeDistination,
        Validators.required
      ),

      orderTransportInfoFinalCountry: new FormControl(
        'MAROC',
      ),
    });
  }
  validateForm() {
    this.isFormSubmitted = true;

    if (this.orderTransportInfoForm.invalid) {
      return;
    }



        this.loadForm();
        this.nextstep.emit(true);

  }
  loadForm() {
    if( this.selectedOrderTransportInfo.turnStatus==null){
    this.turnStatusService.find('id:'+1).subscribe(
      data =>{
        this.selectedOrderTransportInfo.turnStatus=data[0];
      }
    );
    }

    this.selectedOrderTransportInfo.weightTotal =
      this.orderTransportInfoForm.value["weight"];
    this.selectedOrderTransportInfo.capacityTotal =
      this.orderTransportInfoForm.value["capacity"];
      this.selectedOrderTransportInfo.numberOfPallet =
      this.orderTransportInfoForm.value["numberOfPallet"];
      this.selectedOrderTransportInfo.date =
      this.orderTransportInfoForm.value["orderTransportInfoInitialDate"];
      this.selectedOrderTransportInfo.orderTransportInfoLines =
      this.orderTransportInfoLines;

    this.selectedOrderTransportInfo.packageDetails = this.packageDetails;

    this.selectedOrderTransportInfo.type = TypeInfo.Aller.toString();
    this.orderTransportService.addOrderTransportInfoAller(
      this.selectedOrderTransportInfo
    );
  }



  // address



  onSelectVilleSource(event){
   this.selectedOrderTransportInfo.villeSource=event;
  }
  onSelectVilleDistination(event){
    this.selectedOrderTransportInfo.villeDistination=event;
   }

   onVilleSearch(event){
    this.villeService
    .find('code~' + event.query)
    .subscribe(data => (this.villeList = data))
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
    this.idOrderTransportLine=size;
    if (size == 0) {
      this.idOrderTransportLine--;
      orderTransportInfoLine.id = this.idOrderTransportLine;
      orderTransportInfoLine.lineNumber = 1;
    } else {
      if (
        orderTransportInfoLine.id == undefined ||
        orderTransportInfoLine.id == null
      ) {
        // this.idOrderTransportLine =
        //   this.orderTransportInfoLines[
        //     this.orderTransportInfoLines.length - 1
        //   ].id;
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
