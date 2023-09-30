import { TransportPlanServiceCatalog } from './../../../../shared/models/transport-plan-service-catalog';
import { log } from 'console';
import { TrajetService } from './../../../../shared/services/api/trajet.service';
import { Trajet } from './../../../../shared/models/trajet';
import { Account } from './../../../../shared/models/account';
import { OrderTransportTrajetQuantity } from './../../../../shared/models/order-transport-trajet-quantity';
import { Itinerary } from './../../../../shared/models/Itinerairy';
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
import { OrderTransportInfoLine } from "./../../../../shared/models/order-transport-info-line";
import { PackageDetail } from "./../../../../shared/models/package-detail";
import { AddressContactOrderTransportInfo } from "./../../../../shared/models/address-contact-order-transport-nfo";
import { OrderTransportInfo } from "./../../../../shared/models/order-transport-info";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { OrderTransport } from "./../../../../shared/models/order-transport";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-order-transport-groupage",
  templateUrl: "./order-transport-groupage.component.html",
  styleUrls: ["./order-transport-groupage.component.scss"],
})
export class OrderTransportGroupageComponent implements OnInit {
  @Output() nextstep = new EventEmitter<boolean>();
  @Output() previousstep = new EventEmitter<boolean>();
  itineraries: Array<Itinerary> = [];
  itinerary: Itinerary = new Itinerary();
  map: any;
  mainLayer: any;
  orderTransportInfoForm: FormGroup;
  selectedOrderTransport: OrderTransport = new OrderTransport();

  selectedOrderTransportInfo: OrderTransportInfo = new OrderTransportInfo();
  selectOrderTransportTrajetQuantity: OrderTransportTrajetQuantity = new OrderTransportTrajetQuantity();

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
  showDialogOrderTransportInfoLine: Boolean = false;

  selectedaccountInitialOrFinal: string = "false";
  showDialogContactAddress: boolean = false;
  showDialogPackageDetail: boolean = false;

  containerTypeList: ContainerType[] = [];
  packagingTypeList: PackagingType[] = [];
  accountList: Account[] = [];
  isFormSubmitted = false;
  trajetList: Trajet[] = [];
  turnStatus: TurnStatus = new TurnStatus();
  statusList: TurnStatus[] = [];
  showDialogTransportProduct: Boolean = false;
  selectedTransportProductService = new TransportPlanServiceCatalog();
  editModeTransportProduct: Boolean = false;

  constructor(
    private containerTypeService: ContainerTypeService,
    private packagingTypeService: PackagingTypeService,
    private confirmationService: ConfirmationService,
    private accountService: AccountService,
    public orderTransportService: OrderTransportService,
    private messageService: MessageService,
    private trajetService: TrajetService,

    private villeService: VilleService,
    private turnStatusService: TurnStatusService
  ) { }

  ngOnInit() {
    this.packagingTypeService.findAll().subscribe((data) => {
      this.packagingTypeList = data;
      if (this.selectedOrderTransportInfo.packagingType == undefined && this.selectedOrderTransportInfo.packagingType == null) {
        this.selectedOrderTransportInfo.packagingType = this.packagingTypeList.filter(f => f.id == 1)[0];
        this.initForm();
      }
    });
 this.packageDetails = this.selectedOrderTransportInfo.packageDetails
      ? this.selectedOrderTransportInfo.packageDetails
      : [];
    this.selectedOrderTransport = this.orderTransportService.getOrderTransport()
      ? this.orderTransportService.getOrderTransport()
      : new OrderTransport();

    this.selectedOrderTransportInfo =
      this.orderTransportService.getorderTransportInfoAller()
        ? this.orderTransportService.getorderTransportInfoAller()
        : new OrderTransportInfo();



    this.orderTransportInfoLines = this.orderTransportService.getLinesAller();
    console.log( this.orderTransportInfoLines);

    // this.selectedOrderTransportInfo.orderTransportInfoLines? this.selectedOrderTransportInfo.orderTransportInfoLines: [];

    if (this.selectedOrderTransportInfo.turnStatus == null) {
      this.turnStatusService.find('id:' + 1).subscribe(
        data => {
          this.selectedOrderTransportInfo.turnStatus = data[0];
          this.initForm();
        }
      );
    }
    this.onShowDialogOrderTransportInfoLine(null, false);
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
      weight: new FormControl(
        this.selectedOrderTransportInfo.weightTotal
      ),
      capacity: new FormControl(
        this.selectedOrderTransportInfo.capacityTotal
      ),


      // orderTransportInfoTrajet: new FormControl(
      //   this.selectedOrderTransportInfo.trajet,Validators.required
      // ),

      orderTransportInfoInitialDate: new FormControl(
        new Date(this.selectedOrderTransportInfo.date)
      ),
      orderTransportInfoStatus: new FormControl(
        this.selectedOrderTransportInfo?.turnStatus?.code
      ),


    });
  }
  validateForm() {
    this.isFormSubmitted = true;

    if (this.orderTransportInfoForm.invalid) {
      return;
    }
    this.getTrajetQuantity();

    if (this.orderTransportInfoLines[0] != null) {


      if (this.selectOrderTransportTrajetQuantity.weightEnlevement < this.selectOrderTransportTrajetQuantity.weightLivraison || this.selectOrderTransportTrajetQuantity.capacityEnlevement < this.selectOrderTransportTrajetQuantity.capacityLivraison || this.selectOrderTransportTrajetQuantity.numberOfPalletEnlevement < this.selectOrderTransportTrajetQuantity.numberOfPalletLivraison) {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Quantité livrée est supérieure à la quantité chargée' });

      }
      else if (this.selectOrderTransportTrajetQuantity.weightEnlevement > this.selectOrderTransportTrajetQuantity.weightLivraison || this.selectOrderTransportTrajetQuantity.capacityEnlevement > this.selectOrderTransportTrajetQuantity.capacityLivraison || this.selectOrderTransportTrajetQuantity.numberOfPalletEnlevement > this.selectOrderTransportTrajetQuantity.numberOfPalletLivraison) {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Quantité Chargée est inférieure à la quantité Livrée' });

      }
      else {
        this.loadForm();
        this.nextstep.emit(true);
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur ! Ajouter Trajet' });

    }


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
      .find('code~' + event.query)
      .subscribe(data => (this.trajetList = data))
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
    this.selectedaccountInitialOrFinal = "Initial";
  }

  onSelectAccountFinal() {
    this.showDialogContactAddress = true;
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
      message: "Voulez vous vraiment Supprimer?",
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
    this.idOrderTransportLine = size;
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
      this.getTrajetQuantity();

    }
  }

  onShowDialogOrderTransportInfoLine(line, mode) {
    this.showDialogOrderTransportInfoLine = null;

    //  if(line!=null){
    //    this.getTrajetQuantity();
    //  }
    this.showDialogOrderTransportInfoLine = false;

    if (mode == true) {
      this.selectOrderTransportInfoLine = new OrderTransportInfoLine();
      this.selectOrderTransportInfoLine = line;
      this.editModeOrderTransportInfoLine = true;
    } else {
      this.selectOrderTransportInfoLine = new OrderTransportInfoLine();

      this.editModeOrderTransportInfoLine = false;
    }
    this.showDialogOrderTransportInfoLine = true;

  }

  onDeleteOrderTransportInfoLine(id: number) {
    this.confirmationService.confirm({
      message: "Voulez vous vraiment Supprimer?",
      accept: () => {
        this.orderTransportInfoLines = this.orderTransportInfoLines.filter(
          (l) => l.id !== id
        );
        this.orderTransportService.addLinesAller(this.orderTransportInfoLines);
        this.getTrajetQuantity();
      },
    });
  }


  getTrajetQuantity() {
    this.selectOrderTransportTrajetQuantity = new OrderTransportTrajetQuantity();
    this.orderTransportInfoLines = this.orderTransportService.getLinesAller();
    if (this.orderTransportInfoLines.length > 0) {
      this.orderTransportInfoLines.forEach(ot => {
        if (ot.orderTransportType.id == 1 || ot.orderTransportType.id == 3) {
          this.selectOrderTransportTrajetQuantity.weightEnlevement += ot.weightEnlevement;
          this.selectOrderTransportTrajetQuantity.numberOfPalletEnlevement += ot.numberOfPalletEnlevement;
          this.selectOrderTransportTrajetQuantity.capacityEnlevement += ot.capacityEnlevement;
        } else if (ot.orderTransportType.id == 2 || ot.orderTransportType.id == 3) {
          this.selectOrderTransportTrajetQuantity.weightLivraison += ot.weightLivraison;
          this.selectOrderTransportTrajetQuantity.numberOfPalletLivraison += ot.numberOfPalletLivraison;
          this.selectOrderTransportTrajetQuantity.capacityLivraison += ot.capacityLivraison;
        }
      });
      this.selectOrderTransportTrajetQuantity.firstTrajet = false;
      this.orderTransportInfoForm.controls["weight"].setValue(this.selectOrderTransportTrajetQuantity?.weightEnlevement ? this.selectOrderTransportTrajetQuantity?.weightEnlevement : 0);
      this.orderTransportInfoForm.controls["numberOfPallet"].setValue(this.selectOrderTransportTrajetQuantity?.numberOfPalletEnlevement ? this.selectOrderTransportTrajetQuantity?.numberOfPalletEnlevement : 0);
      this.orderTransportInfoForm.controls["capacity"].setValue(this.selectOrderTransportTrajetQuantity?.capacityEnlevement ? this.selectOrderTransportTrajetQuantity?.capacityEnlevement : 0);

    }
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

  onLineEditedTransportProduct(line: TransportPlanServiceCatalog) {
    if (
      this.selectedOrderTransport.orderTransportServiceCatalogs == null ||
      this.selectedOrderTransport.orderTransportServiceCatalogs == undefined
    ) {
      this.selectedOrderTransport.orderTransportServiceCatalogs = [];
    }


     this.selectedOrderTransport.orderTransportServiceCatalogs =
   this.selectedOrderTransport.orderTransportServiceCatalogs.filter(
     l =>   (l.product.id !== line.product.id) || (l.account.id !== line.account.id) || (l.address.id !== line.address.id)
  ) ;

  // const orderline = this.selectedOrderTransport.orderTransportServiceCatalogs.find(
  //   l => (l.product.id !== line.product.id) && (l.account.id !== line.account.id) && (l.address.id !== line.address.id)
  // );
  // if (orderline == null) {
    this.selectedOrderTransport.orderTransportServiceCatalogs.push(line);
    this.calculateAllLines();
  //}
  }
  onDeleteTransportProduct(line: TransportPlanServiceCatalog) {

    this.confirmationService.confirm({
      message: "Voulez vous vraiment Supprimer?",
      accept: () => {
        this.selectedOrderTransport.orderTransportServiceCatalogs =
          this.selectedOrderTransport.orderTransportServiceCatalogs.filter(
            (l) =>  (l.product.id !== line.product.id || l.account.id !== line.account.id || l.address.id !== line?.address.id)
          );
        this.calculateAllLines();
      },
    });
  }
  calculateAllLines() {
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




  // fin Line

  previous() {
    this.loadForm();

    this.previousstep.emit(true);
  }

  next() {






    this.validateForm();

  }






}
