import { TransportPlanServiceCatalog } from "./../../../../shared/models/transport-plan-service-catalog";
import { PaymentType } from "./../../../../shared/models/payment-method";
import { OrderTransportType } from "./../../../../shared/models/order-transport-type";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { PaymentTypeService } from "./../../../../shared/services/api/payment-type.service";
import { OrderTransportTypeService } from "./../../../../shared/services/api/order-transport-type.service";
import { OrderTransportInfoLineDocument } from "./../../../../shared/models/order-transport-info-line-document";
import { ContactService } from "./../../../../shared/services/api/contact.service";
import { AddressService } from "./../../../../shared/services/api/address.service";
import { Contact } from "./../../../../shared/models/contact";
import { TrajetService } from "./../../../../shared/services/api/trajet.service";
import { Trajet } from "./../../../../shared/models/trajet";
import { Account } from "./../../../../shared/models/account";
import { OrderTransportTrajetQuantity } from "./../../../../shared/models/order-transport-trajet-quantity";
import { Itinerary } from "./../../../../shared/models/Itinerairy";
import { TurnStatusService } from "./../../../../shared/services/api/turn-status.service";
import { TurnStatus } from "./../../../../shared/models/turn-status";
import { VilleService } from "./../../../../shared/services/api/ville.service";
import { Ville } from "./../../../../shared/models/ville";
import { TypeInfo } from "./../../../../shared/enum/type-info.enum";
import { OrderTransportService } from "./../../../../shared/services/api/order-transport.service";
import { AccountService } from "./../../../../shared/services/api/account.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { PackagingTypeService } from "./../../../../shared/services/api/packaging-type.service";
import { ContainerTypeService } from "./../../../../shared/services/api/container-type.service";
import { PackagingType } from "./../../../../shared/models/packaging-type";
import { ContainerType } from "./../../../../shared/models/container-type";
import { OrderTransportInfoLine } from "./../../../../shared/models/order-transport-info-line";
import { PackageDetail } from "./../../../../shared/models/package-detail";
import { AddressContactOrderTransportInfo } from "./../../../../shared/models/address-contact-order-transport-nfo";
import { OrderTransportInfo } from "./../../../../shared/models/order-transport-info";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Address } from "./../../../../shared/models";
import { OrderTransport } from "./../../../../shared/models/order-transport";

@Component({
  selector: "app-order-transport-complet",
  templateUrl: "./order-transport-complet.component.html",
  styleUrls: ["./order-transport-complet.component.scss"],
})
export class OrderTransportCompletComponent implements OnInit {
  // @Input() type: number; //1 aller // 2 retour
  @Output() nextstep = new EventEmitter<boolean>();
  @Output() previousstep = new EventEmitter<boolean>();
  orderTransportInfoForm: FormGroup;
  selectedOrderTransportInfo: OrderTransportInfo = new OrderTransportInfo();
  selectedOrderTransport: OrderTransport = new OrderTransport();

  selectPackageDetail: PackageDetail;
  idPackageDetail: number = 0;
  packageDetails: PackageDetail[] = [];
  editModePackageDetail: boolean = false;

  orderTransportInfoLines: OrderTransportInfoLine[] = [];



  selectOrderTransportInfoLineEnlevement: OrderTransportInfoLine;
  selectOrderTransportInfoLineLivraison: OrderTransportInfoLine;
  editModeOrderTransportInfoLine: boolean = false;
  showDialogOrderTransportInfoLineEnlevement: boolean = false;
  showDialogOrderTransportInfoLineLivraison: boolean = false;

  showDialogContactAddress: boolean = false;
  showDialogPackageDetail: boolean = false;
  orderTransportTypeList: OrderTransportType[] = [];

  packagingTypeList: PackagingType[] = [];
  accountList: Account[] = [];
  isFormSubmitted = false;
  trajetList: Trajet[] = [];
  turnStatus: TurnStatus = new TurnStatus();
  showDialogTransportProduct: Boolean = false;
  editModeTransportProduct: Boolean = false;
  nextOrPrevious: number; //1next  // 2 previouss
  isNext: number = -1;
  isPreviouss: number = -1;
  size :number= 0;
  selectedTransportProductService = new TransportPlanServiceCatalog();
  constructor(
    private packagingTypeService: PackagingTypeService,
    private confirmationService: ConfirmationService,
    private accountService: AccountService,
    public orderTransportService: OrderTransportService,
    private trajetService: TrajetService,
    private orderTransportTypeService: OrderTransportTypeService,
    private turnStatusService: TurnStatusService
  ) {}

  ngOnInit() {
    this.packagingTypeService.findAll().subscribe((data) => {
      this.packagingTypeList = data;
      if (
        this.selectedOrderTransportInfo.packagingType == undefined &&
        this.selectedOrderTransportInfo.packagingType == null
      ) {
        this.selectedOrderTransportInfo.packagingType =
          this.packagingTypeList.filter((f) => f.id == 1)[0];
        this.initForm();
      }
    });

    this.orderTransportTypeService.findAll().subscribe((data) => {
      this.orderTransportTypeList = data;
    });

    this.selectedOrderTransport = this.orderTransportService.getOrderTransport()
      ? this.orderTransportService.getOrderTransport()
      : new OrderTransport();
console.log( this.selectedOrderTransport);

      console.log("get aller");

      this.selectedOrderTransportInfo =
        this.orderTransportService.getorderTransportInfoAller()
          ? this.orderTransportService.getorderTransportInfoAller()
          : new OrderTransportInfo();
console.log( this.orderTransportService.getorderTransportInfoAller());

console.log(this.selectedOrderTransportInfo);

    this.packageDetails = this.selectedOrderTransportInfo.packageDetails
      ? this.selectedOrderTransportInfo.packageDetails
      : [];
    this.orderTransportInfoLines = this.selectedOrderTransportInfo
      .orderTransportInfoLines
      ? this.selectedOrderTransportInfo.orderTransportInfoLines
      : [];
      console.log(this.selectedOrderTransportInfo
        .orderTransportInfoLines);

    if (this.selectedOrderTransportInfo.turnStatus == null) {
      this.turnStatusService.find("id:" + 1).subscribe((data) => {
        this.selectedOrderTransportInfo.turnStatus = data[0];
        this.initForm();
      });
    }
    if (this.orderTransportInfoLines[0] != null) {
      this.selectOrderTransportInfoLineEnlevement =
        this.orderTransportInfoLines[0];
      this.selectOrderTransportInfoLineLivraison =
        this.orderTransportInfoLines[1];

      this.onShowDialogOrderTransportInfoLineEnlevement(
        this.selectOrderTransportInfoLineEnlevement,
        true
      );
      this.onShowDialogOrderTransportInfoLineLivraison(
        this.selectOrderTransportInfoLineLivraison,
        true
      );
    } else {
      this.onShowDialogOrderTransportInfoLineEnlevement(null, false);
      this.onShowDialogOrderTransportInfoLineLivraison(null, false);
    }

    this.initForm();
  }

  initForm() {
    this.orderTransportInfoForm = new FormGroup({
      packagingType: new FormControl(
        this.selectedOrderTransportInfo.packagingType,
        Validators.required
      ),
      numberOfPallet: new FormControl(
        this.selectedOrderTransportInfo.numberOfPallet
      ),
      weight: new FormControl(this.selectedOrderTransportInfo.weightTotal),
      // capacity: new FormControl(this.selectedOrderTransportInfo.capacityTotal),

      orderTransportInfoInitialDate: new FormControl(
        new Date(this.selectedOrderTransportInfo.date)
      ),
      // orderTransportInfoStatus: new FormControl(
      //   this.selectedOrderTransportInfo?.turnStatus?.code
      // ),
    });
  }
  validateForm() {
    this.isFormSubmitted = true;

    if (this.orderTransportInfoForm.invalid) {
      return;
    }

    this.loadForm();
    console.log("validate ");

    this.nextstep.emit(true);
  }
  loadForm() {
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

    //this.orderTransportService.addTrajet( this.selectedOrderTransportInfo.trajet);

    ;
    this.selectedOrderTransportInfo.type=1;
      this.orderTransportService.addOrderTransportInfoAller(
        this.selectedOrderTransportInfo
      );


  }

  // address

  onSelectTrajetSource(event) {
    this.selectedOrderTransportInfo.trajet = event;
  }
  // onSelectVilleDistination(event){
  //   this.selectedOrderTransportInfo.villeDistination=event;
  //  }

  onTrajetSearch(event) {
    this.trajetService
      .find("code~" + event.query)
      .subscribe((data) => (this.trajetList = data));
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
  }

  onSelectAccountFinal() {
    this.showDialogContactAddress = true;
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
      message: "Voulez vous vraiment Supprimer?",
      accept: () => {
        this.packageDetails = this.packageDetails.filter((l) => l.id !== id);
      },
    });
  }

  // Fin PackageDetail

  //  line

  onHideDialogOrderTransportInfoLineEnlevement(event) {
    this.showDialogOrderTransportInfoLineEnlevement = event;
  }
  onHideDialogOrderTransportInfoLineLivraison(event) {
    this.showDialogOrderTransportInfoLineEnlevement = event;
  }
  onLineEditedOrderTransportInfoLine(
    orderTransportInfoLine: OrderTransportInfoLine
  ) {
    console.log("orderlineee");

    const orderline = this.orderTransportInfoLines.find(
      (line) => line.id === orderTransportInfoLine.id
    );

    if (orderline == null) {
      this.orderTransportInfoLines.push(orderTransportInfoLine);
        this.orderTransportService.addLinesAller(this.orderTransportInfoLines);

    }


          this.size++;
          console.log("sizeeeeeeeee");

console.log(this.size);

    if (this.size == 2) {
      if (this.nextOrPrevious == 1) {
        console.log("next");
        this.validateForm();
      } else if (this.nextOrPrevious == 2) {
        //  if(this.isPreviouss==true){
        console.log("previousssss");

        this.loadForm();
        this.previousstep.emit(true);
        //}
      }
    }
  }

  onShowDialogOrderTransportInfoLineEnlevement(line, mode) {
    console.log("line");
console.log(line);

    if (mode == true) {
      this.selectOrderTransportInfoLineEnlevement =
        new OrderTransportInfoLine();
      this.selectOrderTransportInfoLineEnlevement = line;
      this.editModeOrderTransportInfoLine = true;
      this.showDialogOrderTransportInfoLineEnlevement = true;
    } else {
      this.selectOrderTransportInfoLineEnlevement =
        new OrderTransportInfoLine();
      this.selectOrderTransportInfoLineEnlevement.lineNumber = 1;
      this.selectOrderTransportInfoLineEnlevement.id = -1;

      this.editModeOrderTransportInfoLine = false;

      this.showDialogOrderTransportInfoLineEnlevement = true;
    }
  }

  onShowDialogOrderTransportInfoLineLivraison(line, mode) {
    if (mode == true) {
      this.selectOrderTransportInfoLineLivraison = line;
      this.editModeOrderTransportInfoLine = true;
      this.showDialogOrderTransportInfoLineLivraison = true;
    } else {
      this.selectOrderTransportInfoLineLivraison = new OrderTransportInfoLine();
      this.selectOrderTransportInfoLineLivraison.lineNumber = 2;
      this.selectOrderTransportInfoLineLivraison.id = -2;
      this.editModeOrderTransportInfoLine = false;
      this.showDialogOrderTransportInfoLineLivraison = true;
    }
  }

  onDeleteOrderTransportInfoLine(id: number) {
    this.confirmationService.confirm({
      message: "Voulez vous vraiment Supprimer?",
      accept: () => {
        this.orderTransportInfoLines = this.orderTransportInfoLines.filter(
          (l) => l.id !== id
        );
          this.orderTransportService.addLinesAller(
            this.orderTransportInfoLines
          );

      },
    });
  }

  onLineEditedTransportProduct(line: TransportPlanServiceCatalog) {
    if (
      this.selectedOrderTransport.orderTransportServiceCatalogs == null ||
      this.selectedOrderTransport.orderTransportServiceCatalogs == undefined
    ) {
      this.selectedOrderTransport.orderTransportServiceCatalogs = [];
    }


         this.selectedOrderTransport.orderTransportServiceCatalogs =
      this.selectedOrderTransport.orderTransportServiceCatalogs.filter(
        (l) => l.product.code !== line.product.code
      );





    this.selectedOrderTransport.orderTransportServiceCatalogs.push(line);
    this.calculateAllLines();
  }
  onDeleteTransportProduct(productCode: string) {
    this.confirmationService.confirm({
      message: "Voulez vous vraiment Supprimer?",
      accept: () => {
        this.selectedOrderTransport.orderTransportServiceCatalogs =
          this.selectedOrderTransport.orderTransportServiceCatalogs.filter(
            (l) => l.product.code !== productCode
          );
        this.calculateAllLines();
      },
    });
  }
  calculateAllLines() {
    // this.selectedOrderTransport.totalPriceHT =
    //   this.selectedOrderTransport.priceHT;
    // this.selectedOrderTransport.totalPriceTTC =
    //   this.selectedOrderTransport.priceTTC;
    // this.selectedOrderTransport.totalPriceVat =
    //   this.selectedOrderTransport.priceVat;
    this.selectedOrderTransport.totalServiceHT = 0.0;
    this.selectedOrderTransport.totalServiceTTC = 0.0;
    this.selectedOrderTransport.totalServiceVat = 0.0;
    this.selectedOrderTransport?.orderTransportServiceCatalogs.forEach(
      (line) => {
        this.selectedOrderTransport.totalServiceHT += +line.totalSalePriceHT;
        this.selectedOrderTransport.totalServiceTTC += +line.totalSalePriceTTC;
        this.selectedOrderTransport.totalServiceVat += +line.totalSalePriceVat;
      }
    );
  }

  onShowDialogTransportProduct(line, mode) {
    this.showDialogTransportProduct = true;

    if (mode == true) {
      this.selectedTransportProductService = line;
      this.editModeTransportProduct = true;
    } else if (mode == false) {
      this.selectedTransportProductService = new TransportPlanServiceCatalog();
      //this.selectedTransportProductService.transport=this.selectedOrderTransport.transport;
      this.selectedTransportProductService.account =
        this.selectedOrderTransport.account;
      //  this.selectedTransportProductService.invoice=this.selectedOrderTransport.transport.factureService;

      this.editModeTransportProduct = false;
    }
  }

  onHideDialogTransportProduct(event) {
    this.showDialogTransportProduct = event;
  }

  // fin Line

  previous() {
    this.nextOrPrevious = 2;
    this.orderTransportService.addIndex();
  }

  next() {
    //this.validateForm();
    this.nextOrPrevious = 1;

    this.orderTransportService.addIndex();
  }
}
