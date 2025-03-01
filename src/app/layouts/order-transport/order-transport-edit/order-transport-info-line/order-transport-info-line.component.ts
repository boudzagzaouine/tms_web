import { VatService } from './../../../../shared/services/api/vat.service';
import { Vat } from './../../../../shared/models/vat';
import { AccountPricing } from './../../../../shared/models/account-pricing';
import { CatalogPricing } from './../../../../shared/models/catalog-pricing';
import { CatalogPricingService } from './../../../../shared/services/api/catalog-pricing.service';
import { AccountPricingService } from './../../../../shared/services/api/account-pricing.service';
import { TrajetService } from './../../../../shared/services/api/trajet.service';
import { log } from "console";
import { ToastrService } from "ngx-toastr";
import { ContactService } from "./../../../../shared/services/api/contact.service";
import { Contact } from "./../../../../shared/models/contact";
import { AddressService } from "./../../../../shared/services/api/address.service";
import { OrderTransportInfoLineDocumentService } from "./../../../../shared/services/api/order-transport-info-line-documet.service";
import { OrderTransportInfoLineDocument } from "./../../../../shared/models/order-transport-info-line-document";
import { OrderTransportTrajetQuantity } from "./../../../../shared/models/order-transport-trajet-quantity";
import { AccountService } from "./../../../../shared/services/api/account.service";
import { Account } from "./../../../../shared/models/account";
import { PaymentTypeService } from "./../../../../shared/services/api/payment-type.service";
import { PaymentType } from "./../../../../shared/models/payment-method";
import { TurnStatusService } from "./../../../../shared/services/api/turn-status.service";
import { TurnStatus } from "./../../../../shared/models/turn-status";
import { Observable } from "rxjs/Observable";
import { ConfirmationService, MessageService } from "primeng/api";
import { OrderTransportType } from "./../../../../shared/models/order-transport-type";
import { OrderTransportService } from "./../../../../shared/services/api/order-transport.service";
import { OrderTransportTypeService } from "./../../../../shared/services/api/order-transport-type.service";
import { AddressContactOrderTransportInfo } from "./../../../../shared/models/address-contact-order-transport-nfo";
import { OrderTransportInfoLine } from "./../../../../shared/models/order-transport-info-line";
import { FormGroup, Validators, FormControl } from "@angular/forms";

import { Subject, Subscription } from "rxjs";
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  DoCheck,
} from "@angular/core";
import { OrderTransport } from "./../../../../shared/models/order-transport";
import { PaymentRule } from "./../../../../shared/models/payment-rule";
import { Address } from "./../../../../shared/models";

@Component({
  selector: "app-order-transport-info-line",
  templateUrl: "./order-transport-info-line.component.html",
  styleUrls: ["./order-transport-info-line.component.scss"],
})
export class OrderTransportInfoLineComponent implements OnInit {
  @Input() selectedOrderTransportInfoLine: OrderTransportInfoLine;
  selectedOrderTransportTrajetQuantity: OrderTransportTrajetQuantity;
  @Input() editMode: number;
  @Input() displayDialog: boolean = false;

  @Output() showDialog = new EventEmitter<boolean>();
  @Output() orderTransportInfoLineAdded =
    new EventEmitter<OrderTransportInfoLine>();
  orderTransportInfoLineForm: FormGroup;
  selectAddress: Address = new Address();
  selectContact: Contact = new Contact();

  orderTransportTypeList: OrderTransportType[] = [];
  isFormSubmitted = false;

  title = " Trajet";
  subscrubtion = new Subscription();
  selectedAccount: Account = new Account();
  showDialogContactAddress: Boolean = false;
  lines: OrderTransportInfoLine[] = [];
  Infolines: OrderTransportInfoLine[] = [];

  turnStatus: TurnStatus = new TurnStatus();
  paymentTypeList: PaymentType[] = [];
  orderTransportInfoLineDocumentEnlevement: OrderTransportInfoLineDocument[] =
    [];
  orderTransportInfoLineDocumentLivraison: OrderTransportInfoLineDocument[] =
    [];
  selectedOrderTransportInfoLineDocument: OrderTransportInfoLineDocument =
    new OrderTransportInfoLineDocument();
  orderTransportInfoLineDocuments: OrderTransportInfoLineDocument[] = [];
  showDialogEnlevement: boolean;
  showDialogLivraison: boolean;
  editModeLine: boolean;
  addressList: Address[] = [];
  accountList:Account[]=[];
  contactList: Contact[] = [];
  showDialogContact: Boolean = false;
  showDialogAddress: Boolean = false;
  weightLivraison: number;
  numberOfPalletLivraison: number;
  capacityLivraison: number;
  isWeightLivraison: Boolean;
  isNumberOfPalletLivraison: Boolean;
  isCapacityLivraison: Boolean;
  selectedCatalogPricing:CatalogPricing= new CatalogPricing();
 selectedOrderTransport : OrderTransport=new OrderTransport();
 selectedAccountPricing : AccountPricing = new AccountPricing();
 vatList:Vat[]=[];
 documentIdEnlevement=-100;
 documentIdLivraison=-200;
  constructor(
    private orderTransportTypeService: OrderTransportTypeService,
    public orderTransportService: OrderTransportService,
    private messageService: MessageService,
    private turnStatusService: TurnStatusService,
    private paymentTypeService: PaymentTypeService,
    private addressService: AddressService,
    private contactService: ContactService,
    private toastr: ToastrService,
    private accountService:AccountService,
    private  trajetService:TrajetService,
    private accountPricingService :AccountPricingService,
    private catalogPricingService:CatalogPricingService,
    private vatService : VatService,
    private confirmationService: ConfirmationService,
    private orderTransportInfoLineDocumentService:OrderTransportInfoLineDocumentService


  ) {}

  ngOnInit() {
    console.log(this.selectedOrderTransportInfoLine.lineNumber);

    //this.displayDialog = false;
    this.selectedOrderTransportInfoLine.account;
    this.initForm();

   this.selectedOrderTransport = this.orderTransportService.getOrderTransport();

    this.orderTransportTypeService.findAll().subscribe((data) => {
      this.orderTransportTypeList = data;
      this.initForm();
    });
    this.paymentTypeService.findAll().subscribe((data) => {
      this.paymentTypeList = data;
      this.initForm();
      console.log(this.paymentTypeList);
    });
    this.vatService.findAll().subscribe((data) => {
      this.vatList = data;

      console.log(this.paymentTypeList);
    });
    this.getTrajetQuantity();
    if (this.editMode) {
      console.log("edit mode ");

      this.selectAddress = this.selectedOrderTransportInfoLine.address;
      this.onLineEditedContact(this.selectedOrderTransportInfoLine.contact);
      this.selectedAccount = this.selectedOrderTransportInfoLine.account;
      console.log( this.selectAddress);
    console.log(this.selectedOrderTransportInfoLine);

      this.getOrderTransportInfoLineDocumentEnlevement(
        this.selectedOrderTransportInfoLine
      );

    } else {
      console.log(this.selectedOrderTransportTrajetQuantity);
      // this.selectedOrderTransportInfoLine.weightEnlevement = 0;

      // this.selectedOrderTransportInfoLine.numberOfPalletEnlevement = 0;

      // this.selectedOrderTransportInfoLine.capacityEnlevement = 0;


    }
    console.log(this.selectedOrderTransportInfoLine);

    // this.displayDialog = true;
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
          this.selectedOrderTransportInfoLine.account
        ),
        priceHT: new FormControl(
          this.selectedOrderTransportInfoLine.priceHT
        ),
        vat: new FormControl(
          this.selectedOrderTransportInfoLine.vat
        ),
        priceTTC: new FormControl(
          this.selectedOrderTransportInfoLine.priceTTC
        ),
        deliveryInfoName: new FormControl(
          this.selectContact
        ),
        deliveryInfoTel1: new FormControl(this.selectContact?.tel1),
        deliveryInfoEmail: new FormControl(this.selectContact?.email),

        deliveryInfoAddressName: new FormControl(
          this.selectAddress,
          Validators.required
        ),
        deliveryInfoLine1: new FormControl(this.selectAddress.line1, Validators.required),
        deliveryInfoCountry: new FormControl(this.selectAddress?.pays?.code),

        deliveryInfoCity: new FormControl(this.selectAddress?.ville?.code),
        deliveryInfoZip: new FormControl(this.selectAddress.zip),
        // deliveryInfoCountry: new FormControl(this.selectAddress.country),
        deliveryInfoLatitude: new FormControl(this.selectAddress.latitude),
        deliveryInfoLongitude: new FormControl(this.selectAddress.longitude),

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

        paymentType: new FormControl(
          this.selectedOrderTransportInfoLine?.paymentTypeEnlevement
        ),
        paymentAmount: new FormControl(
          this.selectedOrderTransportInfoLine?.paymentAmountEnlevement
        ),
        date: new FormControl(
          new Date(this.selectedOrderTransportInfoLine?.dateEnlevement)
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

        paymentType: new FormControl(
          this.selectedOrderTransportInfoLine?.paymentTypeLivraison
        ),
        paymentAmount: new FormControl(
          this.selectedOrderTransportInfoLine?.paymentAmountLivraison
        ),
        date: new FormControl(
          new Date(this.selectedOrderTransportInfoLine?.dateLivraison)
        ),
      }),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    console.log("subùmit");
 console.log(this.orderTransportInfoLineForm);


    if (this.orderTransportInfoLineForm.controls["general"].invalid) {
      return;
    }

    console.log("1");
    let formvalue = this.orderTransportInfoLineForm.value;
    this.selectedOrderTransportInfoLine.priceHT =
      formvalue["general"]["priceHT"];
      this.selectedOrderTransportInfoLine.priceTTC =
      formvalue["general"]["priceTTC"];
      this.selectedOrderTransportInfoLine.vat =
      formvalue["general"]["vat"];
    this.selectedOrderTransportInfoLine.address = this.selectAddress?.id >0 ?this.selectAddress:null;
    this.selectedOrderTransportInfoLine.contact = this.selectContact?.id>0 ?this.selectContact:null;
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
    this.selectedOrderTransportInfoLine.orderTransportInfoLineDocuments =
      this.orderTransportInfoLineDocuments;
    console.log(this.selectedOrderTransportInfoLine);



    if(this.selectedOrderTransportInfoLine.orderTransportType.id==2 || this.selectedOrderTransportInfoLine.orderTransportType.id==3){

      if(this.selectedOrderTransportInfoLine.weightLivraison>this.weightLivraison ){
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur ! Verifier Poids <Livraison>'});

      }else if(this.selectedOrderTransportInfoLine.numberOfPalletLivraison>this.numberOfPalletLivraison ){
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur ! Verifier Nombre de palettes<Livraison>'});

      }else if(this.selectedOrderTransportInfoLine.capacityLivraison>this.capacityLivraison){
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur ! Verifier Volume <Livraison>'});

      }
      else {
        this.orderTransportInfoLineAdded.emit(this.selectedOrderTransportInfoLine);
        this.displayDialog = false;
        this.onShowDialog();
      }


    }else{
      this.orderTransportInfoLineAdded.emit(this.selectedOrderTransportInfoLine);
    this.displayDialog = false;
    this.onShowDialog();
  }

  }
  getOrderTransportInfoLineDocumentEnlevement(line: OrderTransportInfoLine) {
    this.orderTransportInfoLineDocuments =
      this.selectedOrderTransportInfoLine.orderTransportInfoLineDocuments;

    console.log(this.orderTransportInfoLineDocuments);
    this.orderTransportInfoLineDocumentEnlevement =
      this.orderTransportInfoLineDocuments.filter(
        (f) =>  f.type == 1
      );

    this.orderTransportInfoLineDocumentLivraison =
      this.orderTransportInfoLineDocuments.filter(
        (f) => f.type == 2
      );

      }

  getquantityLivraison(){

  }

  destroyEnlevement() {
    this.selectedOrderTransportInfoLine.capacityEnlevement = null;
    this.selectedOrderTransportInfoLine.weightEnlevement = null;
    this.selectedOrderTransportInfoLine.numberOfPalletEnlevement = null;
    this.selectedOrderTransportInfoLine.commentEnlevement = null;

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

    this.selectedOrderTransportInfoLine.dateEnlevement =
      formvalue["enlevement"]["date"];
  }
  destroyLivraison() {
    this.selectedOrderTransportInfoLine.capacityLivraison = null;
    this.selectedOrderTransportInfoLine.weightLivraison = null;
    this.selectedOrderTransportInfoLine.numberOfPalletLivraison = null;
    this.selectedOrderTransportInfoLine.commentLivraison = null;

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

    this.selectedOrderTransportInfoLine.dateLivraison =
      formvalue["livraison"]["date"];
  }
  onSelectorderTransportType(event) {
    this.selectedOrderTransportInfoLine.orderTransportType = event.value;
  }

  onSelectVat(event) {
    this.selectedOrderTransportInfoLine.vat = event.value;
    this.onPriceChange(1);
  }

  onSelectPaymentTypeEnlevement(event) {
    this.selectedOrderTransportInfoLine.paymentTypeEnlevement = event.value;
  }
  onSelectPaymentTypeLivraison(event) {
    this.selectedOrderTransportInfoLine.paymentTypeLivraison = event.value;
  }


  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }
   onAccountSearch(event) {
    let search;
    if (!isNaN(event.query)) {
      search = "code~" + event.query;
    } else {
      search = "name~" + event.query;
    }
    this.accountService
      .find(search)
      .subscribe((data) =>{console.log(data);
       (this.accountList = data)});

    // this.accountService
    //   .find("name~" + event.query)
    //   .subscribe((data) => (this.accountList = data));
  }
  onSelectAccount(event) {
    this.selectedOrderTransportInfoLine.account = event;
    console.log( this.selectedOrderTransportInfoLine.account);

  }

  onAddressSearch(event) {
    this.addressService
      .find("delivery:true,code~" + event.query)
      .subscribe((data) => (this.addressList = data));
  }

  onSelectAddress(event) {
    this.selectedOrderTransportInfoLine.address = event;

    this.setInfoAddress(event);
    this.contactService.find("address.id:" + event.id).subscribe((data) => {
      console.log(data);

      this.contactList = data;
    });
  }
  onSelectContact(event) {
    this.selectedOrderTransportInfoLine.contact = event.value;

    this.setInfoContact(event.value);
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
    this.selectAddress = event;
    console.log("addrs");
    console.log(this.selectAddress);

    this.orderTransportInfoLineForm.controls["general"].patchValue({
      deliveryInfoAddressName: event,

      deliveryInfoLine1: event.line1,
      deliveryInfoCity: event.ville.code,
      deliveryInfoZip: event.zip,
      deliveryInfoCountry: event.pays.code,
      deliveryInfoLatitude: event.latitude,
      deliveryInfoLongitude: event.longitude,
    });
    this.orderTransportInfoLineForm.updateValueAndValidity();
    console.log("hhshshs");

this.verifyTrajet(this.selectedOrderTransport.trajet.villeSource.id,event.ville.id);
  }

  getTarification(){






  }


  getTrajetQuantity(){
    this.selectedOrderTransportTrajetQuantity=new OrderTransportTrajetQuantity();
    this.lines=this.orderTransportService.getLinesAller();
if(this.selectedOrderTransportInfoLine.lineNumber != undefined && this.selectedOrderTransportInfoLine!= null){
  this.lines=this.orderTransportService.getLinesAller().filter(f=> f.lineNumber<this.selectedOrderTransportInfoLine.lineNumber);
}
if(this.lines.length>0){
    this.lines.forEach(ot => {
      if(ot.orderTransportType.id==1 || ot.orderTransportType.id==3){
                this.selectedOrderTransportTrajetQuantity.weightEnlevement += ot.weightEnlevement;
        this.selectedOrderTransportTrajetQuantity.numberOfPalletEnlevement += ot.numberOfPalletEnlevement;
        this.selectedOrderTransportTrajetQuantity.capacityEnlevement += ot.capacityEnlevement;
    }else if (ot.orderTransportType.id==2 || ot.orderTransportType.id==3){
        this.selectedOrderTransportTrajetQuantity.weightLivraison += ot.weightLivraison;
        this.selectedOrderTransportTrajetQuantity.numberOfPalletLivraison += ot.numberOfPalletLivraison;
        this.selectedOrderTransportTrajetQuantity.capacityLivraison += ot.capacityLivraison;
    }
    });

  //   this.selectedOrderTransportInfoLine.weightLivraison =
  //   this.selectedOrderTransportTrajetQuantity?.weightEnlevement -
  //   this.selectedOrderTransportTrajetQuantity?.weightLivraison;

  // this.selectedOrderTransportInfoLine.numberOfPalletLivraison =
  //   this.selectedOrderTransportTrajetQuantity?.numberOfPalletEnlevement -
  //   this.selectedOrderTransportTrajetQuantity?.numberOfPalletLivraison;

  // this.selectedOrderTransportInfoLine.capacityLivraison =
  //   this.selectedOrderTransportTrajetQuantity?.capacityEnlevement -
  //   this.selectedOrderTransportTrajetQuantity?.capacityLivraison;

  this.weightLivraison =
    this.selectedOrderTransportTrajetQuantity?.weightEnlevement -
    this.selectedOrderTransportTrajetQuantity?.weightLivraison;

  this.numberOfPalletLivraison =
    this.selectedOrderTransportTrajetQuantity?.numberOfPalletEnlevement -
    this.selectedOrderTransportTrajetQuantity?.numberOfPalletLivraison;

  this.capacityLivraison =
    this.selectedOrderTransportTrajetQuantity?.capacityEnlevement -
    this.selectedOrderTransportTrajetQuantity?.capacityLivraison;
  }

  }

  affectedNumberOfPalletsLivraison(){
    console.log( this.numberOfPalletLivraison );
   // this.selectedOrderTransportInfoLine.numberOfPalletLivraison= this.numberOfPalletLivraison;
    this.orderTransportInfoLineForm.controls["livraison"].patchValue({
      numberOfPallets: this.numberOfPalletLivraison
        });
        this.orderTransportInfoLineForm.updateValueAndValidity();
 this.isNumberOfPalletLivraison=false;
  }
  affectedWeightLivraison(){
    console.log( this.weightLivraison );
   // this.selectedOrderTransportInfoLine.numberOfPalletLivraison= this.numberOfPalletLivraison;
    this.orderTransportInfoLineForm.controls["livraison"].patchValue({
      weight: this.weightLivraison
        });
        this.orderTransportInfoLineForm.updateValueAndValidity();
 this.isWeightLivraison=false;
  }
  affectedCapacityLivraison(){
    console.log( this.capacityLivraison );
   // this.selectedOrderTransportInfoLine.numberOfPalletLivraison= this.numberOfPalletLivraison;
    this.orderTransportInfoLineForm.controls["livraison"].patchValue({
      capacity: this.capacityLivraison
        });
        this.orderTransportInfoLineForm.updateValueAndValidity();
 this.isCapacityLivraison=false;
  }

  setInfoContact(event) {
    console.log("enleventm set");
    console.log(event);
    this.selectContact = event;
    if(this.selectContact?.id>0){
    this.orderTransportInfoLineForm.controls["general"].patchValue({
      deliveryInfoName: event,
      deliveryInfoTel1: event.tel1,
      deliveryInfoEmail: event.email,
    });
    this.orderTransportInfoLineForm.updateValueAndValidity();
  }
  }

  ngOnDestroy() {
    this.subscrubtion.unsubscribe();
  }

  onShowDialogLine(line, mode, trajetType: number) {
    if (mode == true) {
      this.selectedOrderTransportInfoLineDocument = line;
      this.editModeLine = true;
    } else {
      this.editModeLine = false;
    }
    if (trajetType == 1) {
      this.showDialogEnlevement = true;
      this.showDialogLivraison = false;
    } else if (trajetType == 2) {
      this.showDialogLivraison = true;
      this.showDialogEnlevement = false;
    }

    console.log(mode);
  }




  onHideDialogLine(event) {
    this.showDialogEnlevement = event;
    this.showDialogLivraison = event;

  }

  onLineEditedDocumentEnlevement(line: OrderTransportInfoLineDocument) {
    console.log("Enl");


this.documentIdEnlevement--;
if(line.id==undefined){
  line.id=this.documentIdEnlevement;
  console.log(line.id);

}
this.orderTransportInfoLineDocumentEnlevement =
  this.orderTransportInfoLineDocumentEnlevement.filter(
    (l) => l.id !== line.id
  );
line.type = 1;
this.onLineEditedDocument(line,true);

this.orderTransportInfoLineDocumentEnlevement.push(line);
  }

  onDeleteLineEnlevement(line){
    console.log("enlevement delete");

    console.log(line);

    console.log("enlevement delete");
    console.log(line.id);



    this.confirmationService.confirm({
      message: "Voulez vous vraiment Supprimer?",
      accept: () => {
        if(line.id>0){
        this.orderTransportInfoLineDocumentService.delete(line.id).subscribe(
          data => {
            const index = this.orderTransportInfoLineDocumentEnlevement.indexOf(line);
            if (index !== -1) {
              this.orderTransportInfoLineDocumentEnlevement.splice(index, 1);
            }
            console.log('vv ' + this.orderTransportInfoLineDocumentEnlevement.length);
            this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
          },
          error => {
            this.toastr.error(error.error.message, 'Erreur');
          }
        )
        }
        else{
          this.orderTransportInfoLineDocumentEnlevement =
          this.orderTransportInfoLineDocumentEnlevement.filter(
            (l) => l.id !== line.id
          );
        }
        this.onLineEditedDocument(line,false);

      },
    });


  }
  onLineEditedDocumentLivraison(line: OrderTransportInfoLineDocument) {
    console.log("liv");

    this.documentIdLivraison--;
    if(line.id==undefined){
      line.id=this.documentIdLivraison;
      console.log(line.id);

    }
      this.orderTransportInfoLineDocumentLivraison =
        this.orderTransportInfoLineDocumentLivraison.filter(
          (l) => l.id !== line.id
        );
      line.type = 2;
      this.onLineEditedDocument(line,true);

      this.orderTransportInfoLineDocumentLivraison.push(line);
  }
 onDeleteLineLivraison(line , mode:number){
  console.log("enlevement delete");
  console.log("livraison delete");
  console.log(line);

      this.confirmationService.confirm({
        message: "Voulez vous vraiment Supprimer?",
        accept: () => {
          if(line.id>0){
          this.orderTransportInfoLineDocumentService.delete(line.id).subscribe(
            data => {
              const index = this.orderTransportInfoLineDocumentLivraison.indexOf(line);
              if (index !== -1) {
                this.orderTransportInfoLineDocumentLivraison.splice(index, 1);
              }
              this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
            },
            error => {
              this.toastr.error(error.error.message, 'Erreur');
            }
          )
          }
          else{
            this.orderTransportInfoLineDocumentLivraison =
            this.orderTransportInfoLineDocumentLivraison.filter(
              (l) =>l.id !== line.id
            );
          }
          this.onLineEditedDocument(line,false);

        },
      });


  }
  onLineEditedDocument(line: OrderTransportInfoLineDocument,add:boolean) {
    console.log("LineEditDocument");

    this.orderTransportInfoLineDocuments =
    this.orderTransportInfoLineDocuments.filter(
      (l) => l.id !== line.id
    );

    if(add==true){
      this.orderTransportInfoLineDocuments.push(line);

    }
console.log(this.orderTransportInfoLineDocuments);

  }

  onShowdialogAddress() {
    this.showDialogAddress = true;
  }
  onHideDialogAddress(event) {
    this.showDialogAddress = event;
  }
  onLineEditedAddress(line: Address) {
    this.addressService.set(line).subscribe(
      data => {

        this.setInfoAddress(data);

        this.toastr.success('Elément est Enregistré Avec Succès', 'Edition');
      }
    );
  }
  verifyTrajet(sourceId:number , distinationId :number ){

    this.trajetService
      .find(
        "villeSource.id:" +
          sourceId +
          ",villeDestination.id:" +
          distinationId
      )
      .subscribe((data) => {
console.log("hh");

        if (data[0] != null) {
          console.log(data);
this.onSearchAccountPricing(distinationId);
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Existe'});
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: "Trajet n'existe pas ",
          });
        }
      });

  }

  onSearchCatalogPricing(distinationId:number) {
    let trajet;
      trajet =

      this.catalogPricingService.find(
        "turnType.id:" +
          this.selectedOrderTransport?.turnType?.id +
          ",vehicleCategory.id:" +
          this.selectedOrderTransport?.vehicleCategory?.id +
          ",vehicleTray.id:" +
          this.selectedOrderTransport?.vehicleTray?.id +
          ",loadingType.id:" +
          this.selectedOrderTransport?.loadingType?.id +
          ",trajet.villeSource.id:" +
          this.selectedOrderTransport?.trajet?.villeSource.id +
          ",trajet.villeDestination.id:" +
distinationId
      )
      .subscribe((data) => {
        console.log(data);
        if (data[0]) {
          console.log("price catalog");

          this.selectedCatalogPricing = data[0];
          this.orderTransportInfoLineForm.controls["general"].patchValue({
            priceHT: this.selectedCatalogPricing.saleAmountHt,
            vat: this.selectedCatalogPricing.saleVat,
            priceTTC: this.selectedCatalogPricing.saleAmountTtc,

          });

        }

      });
  }

  onSearchAccountPricing(distinationId:number) {

    this.accountPricingService
      .find(
        "company.id:" +
          this.selectedOrderTransport?.account?.company?.id +
          ",turnType.id:" +
          this.selectedOrderTransport?.turnType?.id +
          ",vehicleCategory.id:" +
          this.selectedOrderTransport?.vehicleCategory?.id +
          ",vehicleTray.id:" +
          this.selectedOrderTransport?.vehicleTray?.id +
          ",loadingType.id:" +
          this.selectedOrderTransport?.loadingType?.id +
          ",trajet.villeSource.id:" +
          this.selectedOrderTransport?.trajet?.villeSource.id +
          ",trajet.villeDestination.id:" +
distinationId
      )
      .subscribe((data) => {
        console.log(data);
        if (data[0]) {
          this.selectedAccountPricing = data[0];
          console.log("pricAccount");

          this.orderTransportInfoLineForm.controls["general"].patchValue({
            priceHT: this.selectedAccountPricing.saleAmountHt,
            vat: this.selectedAccountPricing.saleVat,
            priceTTC: this.selectedAccountPricing.saleAmountTtc,

          });

        } else {
          this.onSearchCatalogPricing(distinationId);
        }
      });
  }

  onLineEditedContact(contact: Contact) {
    this.contactService
      .find("address.id:" + this.selectAddress.id)
      .subscribe((data) => {
        console.log(data);

        this.contactList = data;
        this.setInfoContact(contact);
      });
  }
  onShowdialogContact() {
    console.log(this.selectAddress);

    if (this.selectAddress.code != null) {
      this.showDialogContact = true;
    } else {
      this.toastr.info("sélectionné l adress", "Info");
    }
  }

  onHideDialogContact(event) {
    this.showDialogContact = event;
  }

  validateNumberOfPalletsLivraison(event) {
    console.log(event.value);
  console.log(this.numberOfPalletLivraison);

    if (event.value > this.numberOfPalletLivraison) {
      this.isNumberOfPalletLivraison = true;
    } else {
      this.isNumberOfPalletLivraison = false;
    }
  }

  validateWeightLivraison(event) {
    if (event.value > this.weightLivraison) {
      this.isWeightLivraison = true;
    } else {
      this.isWeightLivraison = false;
    }
  }

  validateCapacityLivraison(event) {
    if (event.value > this.capacityLivraison) {
      this.isCapacityLivraison = true;
    } else {
      this.isCapacityLivraison = false;
    }
  }



onPriceChange(n: Number) {
  let purchasePrice = +this.orderTransportInfoLineForm.value["general"]['priceHT'];
  let purchasePriceTTC = +this.orderTransportInfoLineForm.value["general"]['priceTTC'];
  let vat = this.orderTransportInfoLineForm.value["general"]['vat']?.value;
console.log(purchasePrice);
console.log(purchasePriceTTC);
console.log(vat);


  if (purchasePrice === undefined || purchasePrice == null) {
    purchasePrice = 0;
  } if (purchasePriceTTC === undefined || purchasePriceTTC == null) {
    purchasePriceTTC = 0;
  } if (vat === undefined || vat == null) {
    vat = 0;
  }

  if (n === 1) {
    const amountTva = (purchasePrice / 100) * vat;
    const priceTTC = purchasePrice + amountTva;
    this.orderTransportInfoLineForm.controls["general"].patchValue({
      'priceTTC': priceTTC,
    });
  }if (n === 2) {
      purchasePrice = purchasePriceTTC / (1 + vat / 100);
      this.orderTransportInfoLineForm.controls["general"].patchValue({
        priceHT: purchasePrice
      });
  }

}
}
