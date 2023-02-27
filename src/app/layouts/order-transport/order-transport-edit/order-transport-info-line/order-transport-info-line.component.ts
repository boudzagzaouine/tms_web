import { OrderTransportInfoLineDocumentService } from './../../../../shared/services/api/order-transport-info-line-documet.service';
import { OrderTransportInfoLineDocument } from './../../../../shared/models/order-transport-info-line-document';
import { OrderTransportTrajetQuantity } from "./../../../../shared/models/order-transport-trajet-quantity";
import { AccountService } from "./../../../../shared/services/api/account.service";
import { Account } from "./../../../../shared/models/account";
import { PaymentTypeService } from "./../../../../shared/services/api/payment-type.service";
import { PaymentType } from "./../../../../shared/models/payment-method";
import { TurnStatusService } from "./../../../../shared/services/api/turn-status.service";
import { TurnStatus } from "./../../../../shared/models/turn-status";
import { Observable } from "rxjs/Observable";
import { MessageService } from "primeng/api";
import { OrderTransportType } from "./../../../../shared/models/order-transport-type";
import { OrderTransportService } from "./../../../../shared/services/api/order-transport.service";
import { OrderTransportTypeService } from "./../../../../shared/services/api/order-transport-type.service";
import { AddressContactOrderTransportInfo } from "./../../../../shared/models/address-contact-order-transport-nfo";
import { OrderTransportInfoLine } from "./../../../../shared/models/order-transport-info-line";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { CompanyService } from "./../../../../shared/services/api/company.service";
import { Company } from "./../../../../shared/models/company";
import { Subject, Subscription } from "rxjs";
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { OrderTransport } from "./../../../../shared/models/order-transport";
import { PaymentRule } from "./../../../../shared/models/payment-rule";

@Component({
  selector: "app-order-transport-info-line",
  templateUrl: "./order-transport-info-line.component.html",
  styleUrls: ["./order-transport-info-line.component.scss"],
})
export class OrderTransportInfoLineComponent implements OnInit {
  @Input() selectedOrderTransportInfoLine: OrderTransportInfoLine;
  @Input() selectedOrderTransportTrajetQuantity: OrderTransportTrajetQuantity;
  @Input() editMode: number;
  @Input() typeInfo: string;
  @Input() weightMax: number;
  @Input() capacityMax: number;
  @Input() palletMax: number;

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
  title = " Trajet";
  subscrubtion = new Subscription();
  accountList: Account[] = [];
  selectedAccount: Account = new Account();
  showDialogContactAddress: Boolean = false;
  selectedCompany: Company = new Company();

  lines: OrderTransportInfoLine[] = [];
  turnStatus: TurnStatus = new TurnStatus();
  paymentTypeList: PaymentType[] = [];
  orderTransportInfoLineDocumentEnlevementBL:OrderTransportInfoLineDocument[]=[];
  orderTransportInfoLineDocumentEnlevementFacture:OrderTransportInfoLineDocument[]=[];

  orderTransportInfoLineDocumentLivraisonBL:OrderTransportInfoLineDocument[]=[];
  orderTransportInfoLineDocumentLivraisonFacture:OrderTransportInfoLineDocument[]=[];

  selectedOrderTransportInfoLineDocument :OrderTransportInfoLineDocument=new OrderTransportInfoLineDocument();
orderTransportInfoLineDocuments:OrderTransportInfoLineDocument[]=[];
  showDialogEnlevementBl: boolean;
  showDialogEnlevementFacture: boolean;
  showDialogLivraisonBl: boolean;
  showDialogLivraisonFacture: boolean;
  editModeLine: boolean;

  constructor(
    private orderTransportTypeService: OrderTransportTypeService,
    private companyService: CompanyService,
    public orderTransportService: OrderTransportService,
    private messageService: MessageService,
    private turnStatusService: TurnStatusService,
    private paymentTypeService: PaymentTypeService,
    private accountService: AccountService,
    private orderTransportInfoLineDocumentService:OrderTransportInfoLineDocumentService
  ) {}

  ngOnInit() {
    this.selectedOrderTransportInfoLine.account;
    this.initForm();
    this.selectedOrderTransport = this.orderTransportService.getOrderTransport()
      ? this.orderTransportService.getOrderTransport()
      : new OrderTransport();
    this.selectedCompany = this.selectedOrderTransport.company;
    this.lines =
      this.typeInfo == "Aller"
        ? this.orderTransportService.getLinesAller()
        : this.orderTransportService.getLinesRetour();

    this.orderTransportTypeService.findAll().subscribe((data) => {
      this.orderTransportTypeList = data;
      this.initForm();
    });
    this.paymentTypeService.findAll().subscribe((data) => {
      this.paymentTypeList = data;
    });
    if (this.editMode) {
      this.selectAddressContactDeliveryInfo =
        this.selectedOrderTransportInfoLine.addressContactDeliveryInfo;
      this.selectedAccount = this.selectedOrderTransportInfoLine.account;
      this.getOrderTransportInfoLineDocumentEnlevement(this.selectedOrderTransportInfoLine);

      //this.orderTransportInfoLineDocuments=this.selectedOrderTransportInfoLine.orderTransportInfoLineDocuments;


    } else {

      console.log(this.selectedOrderTransportTrajetQuantity);

      this.selectedOrderTransportInfoLine.weightEnlevement=0;

      this.selectedOrderTransportInfoLine.numberOfPalletEnlevement=0;

      this.selectedOrderTransportInfoLine.capacityEnlevement=0;


      this.selectedOrderTransportInfoLine.weightLivraison=this.selectedOrderTransportTrajetQuantity?.weightEnlevement-this.selectedOrderTransportTrajetQuantity?.weightLivraison;

      this.selectedOrderTransportInfoLine.numberOfPalletLivraison=this.selectedOrderTransportTrajetQuantity?.numberOfPalletEnlevement-this.selectedOrderTransportTrajetQuantity?.numberOfPalletLivraison;

      this.selectedOrderTransportInfoLine.capacityLivraison=this.selectedOrderTransportTrajetQuantity?.capacityEnlevement-this.selectedOrderTransportTrajetQuantity?.capacityLivraison;


    }
console.log(this.selectedOrderTransportInfoLine);

    this.displayDialog = true;
    this.initForm();
  }

  initForm() {
    if (!this.editMode) {
      this.selectedOrderTransportInfoLine.orderTransportType =
        this.orderTransportTypeList.filter((f) => f.id == 1)[0];
    }

    this.orderTransportInfoLineForm = new FormGroup({
      general: new FormGroup({
        orderTransportType: new FormControl(
          this.selectedOrderTransportInfoLine.orderTransportType,
          Validators.required
        ),
        account: new FormControl(
          this.selectedOrderTransportInfoLine.account,
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
          this.selectedOrderTransportInfoLine.capacityEnlevement
        ),
        weight: new FormControl(
          this.selectedOrderTransportInfoLine.weightEnlevement,
          Validators.required
        ),
        comment: new FormControl(
          this.selectedOrderTransportInfoLine.commentEnlevement
        ),
        contreBL: new FormControl(
          this.selectedOrderTransportInfoLine.contreBlEnlevement
        ),
        contreFacture: new FormControl(
          this.selectedOrderTransportInfoLine?.contreFactureEnlevement
        ),
        paymentType: new FormControl(
          this.selectedOrderTransportInfoLine?.paymentTypeEnlevement
        ),
        paymentAmount: new FormControl(
          this.selectedOrderTransportInfoLine?.paymentAmountEnlevement
        ),
      }),
      livraison: new FormGroup({
        numberOfPallets: new FormControl(
          this.selectedOrderTransportInfoLine.numberOfPalletLivraison,
          Validators.required
        ),
        capacity: new FormControl(
          this.selectedOrderTransportInfoLine.capacityLivraison
        ),
        weight: new FormControl(
          this.selectedOrderTransportInfoLine.weightLivraison,
          Validators.required
        ),
        comment: new FormControl(
          this.selectedOrderTransportInfoLine.commentLivraison
        ),
        contreBL: new FormControl(
          this.selectedOrderTransportInfoLine?.contreBlLivraison
        ),
        contreFacture: new FormControl(
          this.selectedOrderTransportInfoLine?.contreFactureLivraison
        ),
        paymentType: new FormControl(
          this.selectedOrderTransportInfoLine?.paymentTypeLivraison
        ),
        paymentAmount: new FormControl(
          this.selectedOrderTransportInfoLine?.paymentAmountLivraison
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

    let formvalue = this.orderTransportInfoLineForm.value;
    this.getValueFromEnlevementForm();
    this.selectedOrderTransportInfoLine.addressContactDeliveryInfo =
    this.selectAddressContactDeliveryInfo;

    if (this.selectedOrderTransportInfoLine.orderTransportType.id == 1) {
      if (this.orderTransportInfoLineForm.controls["enlevement"].invalid) {
        return;
      }
      this.destroyLivraison();
      this.validateEnlevement();
    }
    if (this.selectedOrderTransportInfoLine.orderTransportType.id == 2) {
      if (this.orderTransportInfoLineForm.controls["livraison"].invalid) {
        return;
      }
      this.destroyEnlevement();
      this.validateLivraison();
    }
    if (this.selectedOrderTransportInfoLine.orderTransportType.id == 3) {
      if (
        this.orderTransportInfoLineForm.controls["enlevement"].invalid &&
        this.orderTransportInfoLineForm.controls["livraison"].invalid
      ) {
        return;
      }
      this.validateEnlevement();
      this.validateLivraison();
    }
    console.log(this.turnStatus);

    if (this.selectedOrderTransportInfoLine.turnStatus == null) {
      this.turnStatusService.find("id:" + 1).subscribe((data) => {
        this.selectedOrderTransportInfoLine.turnStatus = data[0];
      });
    }
    this.selectedOrderTransportInfoLine.orderTransportInfoLineDocuments= this.orderTransportInfoLineDocuments;
    console.log(this.selectedOrderTransportInfoLine);

    this.orderTransportInfoLineAdded.emit(this.selectedOrderTransportInfoLine);
    this.displayDialog = false;
  }
  getOrderTransportInfoLineDocumentEnlevement(line:OrderTransportInfoLine){
  this.orderTransportInfoLineDocuments=this.selectedOrderTransportInfoLine.orderTransportInfoLineDocuments;

console.log(this.orderTransportInfoLineDocuments);
this.orderTransportInfoLineDocumentEnlevementBL=this.orderTransportInfoLineDocuments.filter(f=> f.contreType=="BL" && f.type==1);
this.orderTransportInfoLineDocumentEnlevementFacture=this.orderTransportInfoLineDocuments.filter(f=> f.contreType=="FACTURE" && f.type==1);

this.orderTransportInfoLineDocumentLivraisonBL=this.orderTransportInfoLineDocuments.filter(f=> f.contreType=="BL" && f.type==2);
this.orderTransportInfoLineDocumentLivraisonFacture=this.orderTransportInfoLineDocuments.filter(f=> f.contreType=="FACTURE" && f.type==2);


// this.orderTransportInfoLineDocumentService.find("type:"+line.orderTransportType.id+",orderTransportInfoLine.id:"+line.id).subscribe(
//   data=>{
//       if(data[0]){
//           this.orderTransportInfoLineDocuments=data;
//       }
//     this.orderTransportInfoLineDocumentEnlevementBL=this.orderTransportInfoLineDocuments.filter(f=> f.contreType=="BL" && f.type==1);
//     this.orderTransportInfoLineDocumentEnlevementFacture=this.orderTransportInfoLineDocuments.filter(f=> f.contreType=="FACTURE" && f.type==1);

//     this.orderTransportInfoLineDocumentLivraisonBL=this.orderTransportInfoLineDocuments.filter(f=> f.contreType=="BL" && f.type==2);
//     this.orderTransportInfoLineDocumentLivraisonFacture=this.orderTransportInfoLineDocuments.filter(f=> f.contreType=="FACTURE" && f.type==2);


//   }
// );

  }


  destroyEnlevement() {
    this.selectedOrderTransportInfoLine.capacityEnlevement = null;
    this.selectedOrderTransportInfoLine.weightEnlevement = null;
    this.selectedOrderTransportInfoLine.numberOfPalletEnlevement = null;
    this.selectedOrderTransportInfoLine.commentEnlevement = null;
    this.selectedOrderTransportInfoLine.contreBlEnlevement = null;
    this.selectedOrderTransportInfoLine.contreFactureEnlevement = null;
    this.selectedOrderTransportInfoLine.paymentTypeEnlevement = null;
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
      this.selectedOrderTransportInfoLine.paymentAmountEnlevement =
      formvalue["enlevement"]["paymentAmount"];



  }
  destroyLivraison() {
    this.selectedOrderTransportInfoLine.capacityLivraison = null;
    this.selectedOrderTransportInfoLine.weightLivraison = null;
    this.selectedOrderTransportInfoLine.numberOfPalletLivraison = null;
    this.selectedOrderTransportInfoLine.commentLivraison = null;
    this.selectedOrderTransportInfoLine.contreFactureLivraison = null;
    this.selectedOrderTransportInfoLine.contreFactureLivraison = null;
    this.selectedOrderTransportInfoLine.paymentTypeLivraison = null;
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
      this.selectedOrderTransportInfoLine.paymentAmountLivraison =
      formvalue["livraison"]["paymentAmount"];


  }
  onSelectorderTransportType(event) {
    this.selectedOrderTransportInfoLine.orderTransportType = event.value;
  }

  onSelectPaymentTypeEnlevement(event) {
    this.selectedOrderTransportInfoLine.paymentTypeEnlevement = event.value;
  }
  onSelectPaymentTypeLivraison(event) {
    this.selectedOrderTransportInfoLine.paymentTypeLivraison = event.value;
  }
  onSelectAccount(event) {
    this.selectedOrderTransportInfoLine.account = event;
    this.selectedAccount = event;
  }

  onAccountSearch(event) {
    console.log(this.selectedCompany);
    // company.id:'+this.selectedCompany.id+',
    this.accountService
      .find("name~" + event.query)
      .subscribe((data) => (this.accountList = data));
  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  onSelectAddress(event, type) {
    if (this.selectedAccount.id > 0) {
      this.showDialogContactAddress = true;
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Saisir  Compte",
      });
    }

    //  this.selectedCompany = this.selectedOrderTransport.company;
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



  onChangeCBLEnlevement(event) {
    this.selectedOrderTransportInfoLine.contreBlEnlevement = event.checked;
    console.log(this.selectedOrderTransportInfoLine.contreBlEnlevement);
  }
  onChangeCBLLivraison(event) {
    this.selectedOrderTransportInfoLine.contreBlLivraison = event.checked;
    console.log(this.selectedOrderTransportInfoLine.contreBlLivraison);
  }
  onChangeCFEnlevement(event) {
    this.selectedOrderTransportInfoLine.contreFactureEnlevement = event.checked;
    console.log(this.selectedOrderTransportInfoLine.contreFactureEnlevement);
  }
  onChangeCFLivraison(event) {
    this.selectedOrderTransportInfoLine.contreFactureLivraison = event.checked;
    console.log(this.selectedOrderTransportInfoLine.contreFactureLivraison);
  }

  ngOnDestroy() {
    this.subscrubtion.unsubscribe();
  }

  onShowDialogLine(line, mode,trajetType:number,contreType:string) {
    if(trajetType==1 && contreType=="BL"){
      this.showDialogEnlevementBl = true;
    }
    else if(trajetType==1 && contreType=="FACTURE"){
      this.showDialogEnlevementFacture = true;
    }
    else if(trajetType==2 && contreType=="BL"){
      this.showDialogLivraisonBl = true;
    }
    else if(trajetType==2 && contreType=="FACTURE"){
      this.showDialogLivraisonFacture = true;
    }

console.log(mode);

    if (mode == true) {
      this.selectedOrderTransportInfoLineDocument = line;
      this.editModeLine = true;

    } else {
      this.editModeLine = false;

    }

  }
  onHideDialogLine(event) {

    this.showDialogEnlevementBl = event;
    this.showDialogEnlevementFacture = event;

  }

  onLineEditedDocumentEnlevementBL(line :OrderTransportInfoLineDocument){
    console.log("EnlBl");

    this.orderTransportInfoLineDocumentEnlevementBL = this.orderTransportInfoLineDocumentEnlevementBL.filter(
      (l) => l.numero !== line.numero
    );
    line.contreType="BL";
    line.type=1;
    this.onLineEditedDocument(line);

    this.orderTransportInfoLineDocumentEnlevementBL.push(line);
  }

  onLineEditedDocumentEnlevementFacture(line :OrderTransportInfoLineDocument){
    console.log("enlvFacture");

    this.orderTransportInfoLineDocumentEnlevementFacture = this.orderTransportInfoLineDocumentEnlevementFacture.filter(
      (l) => l.numero !== line.numero
    );
    line.contreType="FACTURE";
    line.type=1;
    this.onLineEditedDocument(line);

    this.orderTransportInfoLineDocumentEnlevementFacture.push(line);
  }

  onLineEditedDocumentLivraisonBL(line :OrderTransportInfoLineDocument){
    console.log("EnlBl");

    this.orderTransportInfoLineDocumentLivraisonBL = this.orderTransportInfoLineDocumentLivraisonBL.filter(
      (l) => l.numero !== line.numero
    );
    line.contreType="BL";
    line.type=2;
    this.onLineEditedDocument(line);

    this.orderTransportInfoLineDocumentLivraisonBL.push(line);
  }

  onLineEditedDocumentLivraisonFacture(line :OrderTransportInfoLineDocument){
    console.log("enlvFacture");

    this.orderTransportInfoLineDocumentLivraisonFacture = this.orderTransportInfoLineDocumentLivraisonFacture.filter(
      (l) => l.numero !== line.numero
    );
    line.contreType="FACTURE";
    line.type=1;
    this.onLineEditedDocument(line);
    this.orderTransportInfoLineDocumentLivraisonFacture.push(line);
  }

  onLineEditedDocument(line :OrderTransportInfoLineDocument){
    console.log("enlvFacture");

    this.orderTransportInfoLineDocuments = this.orderTransportInfoLineDocuments.filter(
      (l) => (l.numero !== line.numero)
    );

    this.orderTransportInfoLineDocuments.push(line);
  }

}
