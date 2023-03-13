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
import { MessageService } from "primeng/api";
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
  @Input() selectedOrderTransportTrajetQuantity: OrderTransportTrajetQuantity;
  @Input() editMode: number;
  @Input() displayDialog: boolean = false;

  @Output() showDialog = new EventEmitter<boolean>();
  @Output() orderTransportInfoLineAdded =
    new EventEmitter<OrderTransportInfoLine>();
  selectedOrderTransport: OrderTransport = new OrderTransport();
  orderTransportInfoLineForm: FormGroup;
  selectAddress: Address = new Address();
  selectContact: Contact = new Contact();

  orderTransportTypeList: OrderTransportType[] = [];
  isFormSubmitted = false;

  title = " Trajet";
  subscrubtion = new Subscription();
  //accountList: Account[] = [];
  selectedAccount: Account = new Account();
  showDialogContactAddress: Boolean = false;
  //selectedAccount: Account = new Account();

  lines: OrderTransportInfoLine[] = [];
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
  contactList: Contact[] = [];
  showDialogContact: Boolean = false;
  showDialogAddress: Boolean = false;
  weightLivraison: number;
  numberOfPalletLivraison: number;
  capacityLivraison: number;
  isWeightLivraison: Boolean;
  isNumberOfPalletLivraison: Boolean;
  isCapacityLivraison: Boolean;
  constructor(
    private orderTransportTypeService: OrderTransportTypeService,
    private accountService: AccountService,
    public orderTransportService: OrderTransportService,
    private messageService: MessageService,
    private turnStatusService: TurnStatusService,
    private paymentTypeService: PaymentTypeService,
    private addressService: AddressService,
    private contactService: ContactService,
    private toastr: ToastrService,

    private orderTransportInfoLineDocumentService: OrderTransportInfoLineDocumentService
  ) {}

  ngOnInit() {
    //this.displayDialog = false;
    console.log(".......");

    this.selectedOrderTransportInfoLine.account;
    this.initForm();
    this.selectedOrderTransport = this.orderTransportService.getOrderTransport()
      ? this.orderTransportService.getOrderTransport()
      : new OrderTransport();
    // this.selectedAccount = this.selectedOrderTransport.account;
    this.lines = this.orderTransportService.getLinesAller();

    this.orderTransportTypeService.findAll().subscribe((data) => {
      this.orderTransportTypeList = data;
      this.initForm();
    });
    this.paymentTypeService.findAll().subscribe((data) => {
      this.paymentTypeList = data;
      // this.selectedOrderTransportInfoLine.paymentTypeEnlevement=this.paymentTypeList.filter(f=>f.id==2)[0];
      // this.selectedOrderTransportInfoLine.paymentTypeLivraison=this.paymentTypeList.filter(f=>f.id==2)[0];
      this.initForm();
      console.log(this.paymentTypeList);
    });
    if (this.editMode) {
      this.selectAddress = this.selectedOrderTransportInfoLine.address;
      this.onLineEditedContact(this.selectedOrderTransportInfoLine.contact);
      // this.selectContact =this.selectedOrderTransportInfoLine.contact;
      this.selectedAccount = this.selectedOrderTransportInfoLine.account;
      this.getOrderTransportInfoLineDocumentEnlevement(
        this.selectedOrderTransportInfoLine
      );

      //this.orderTransportInfoLineDocuments=this.selectedOrderTransportInfoLine.orderTransportInfoLineDocuments;
    } else {
      console.log(this.selectedOrderTransportTrajetQuantity);

      this.selectedOrderTransportInfoLine.weightEnlevement = 0;

      this.selectedOrderTransportInfoLine.numberOfPalletEnlevement = 0;

      this.selectedOrderTransportInfoLine.capacityEnlevement = 0;

      this.selectedOrderTransportInfoLine.weightLivraison =
        this.selectedOrderTransportTrajetQuantity?.weightEnlevement -
        this.selectedOrderTransportTrajetQuantity?.weightLivraison;

      this.selectedOrderTransportInfoLine.numberOfPalletLivraison =
        this.selectedOrderTransportTrajetQuantity?.numberOfPalletEnlevement -
        this.selectedOrderTransportTrajetQuantity?.numberOfPalletLivraison;

      this.selectedOrderTransportInfoLine.capacityLivraison =
        this.selectedOrderTransportTrajetQuantity?.capacityEnlevement -
        this.selectedOrderTransportTrajetQuantity?.capacityLivraison;

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
        // account: new FormControl(
        //   this.selectedOrderTransportInfoLine.account,
        //   Validators.required
        // ),
        deliveryInfoName: new FormControl(
          this.selectContact.name,
          Validators.required
        ),
        deliveryInfoTel1: new FormControl(this.selectContact.tel1),
        deliveryInfoEmail: new FormControl(this.selectContact.email),

        deliveryInfoAddressName: new FormControl(
          this.selectAddress,
          Validators.required
        ),
        deliveryInfoLine1: new FormControl(this.selectAddress.line1),
        deliveryInfoCity: new FormControl(this.selectAddress.city),
        deliveryInfoZip: new FormControl(this.selectAddress.zip),
        deliveryInfoCountry: new FormControl(this.selectAddress.country),
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

  // getValueFromEnlevementForm() {
  //   let formvalue = this.orderTransportInfoLineForm.value;
  //   this.selectContact.name = formvalue["general"][
  //     "deliveryInfoName"
  //   ].name
  //     ? formvalue["general"]["deliveryInfoName"].name
  //     : formvalue["general"]["deliveryInfoName"];
  //   this.selectContact.tel1 =
  //     formvalue["general"]["deliveryInfoTel1"];
  //   this.selectContact.email =
  //     formvalue["general"]["deliveryInfoEmail"];
  //   // this.selectContact.account =
  //   //   formvalue["general"]["deliveryInfoAccount"];
  //   this.selectAddress.line1 =
  //     formvalue["general"]["deliveryInfoLine1"];
  //   this.selectAddress.city =
  //     formvalue["general"]["deliveryInfoCity"];
  //   this.selectAddress.zip =
  //     formvalue["general"]["deliveryInfoZip"];
  //   this.selectAddress.country =
  //     formvalue["general"]["deliveryInfoCountry"];
  //   // this.selectAddress.date =
  //   //   formvalue["general"]["deliveryInfoDate"];
  //   this.selectAddress.latitude =
  //     formvalue["general"]["deliveryInfoLatitude"];
  //   this.selectAddress.longitude =
  //     formvalue["general"]["deliveryInfoLongitude"];
  // }

  onSubmit() {
    this.isFormSubmitted = true;

    if (this.orderTransportInfoLineForm.controls["general"].invalid) {
      return;
    }

    let formvalue = this.orderTransportInfoLineForm.value;
    //  this.getValueFromEnlevementForm();
    this.selectedOrderTransportInfoLine.address = this.selectAddress;
    this.selectedOrderTransportInfoLine.contact = this.selectContact;
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

    this.orderTransportInfoLineAdded.emit(this.selectedOrderTransportInfoLine);
    this.displayDialog = false;
    this.onShowDialog();
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

  onSelectPaymentTypeEnlevement(event) {
    this.selectedOrderTransportInfoLine.paymentTypeEnlevement = event.value;
  }
  onSelectPaymentTypeLivraison(event) {
    this.selectedOrderTransportInfoLine.paymentTypeLivraison = event.value;
  }
  // onSelectAccount(event) {
  //   this.selectedOrderTransportInfoLine.account = event;
  //   this.selectedAccount = event;
  // }

  // onAccountSearch(event) {
  //   console.log(this.selectedAccount);
  //   // account.id:'+this.selectedAccount.id+',
  //   this.accountService
  //     .find("name~" + event.query)
  //     .subscribe((data) => (this.accountList = data));
  // }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
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
    // this.showDialogContactAddress = true;
  }
  onSelectContact(event) {
    this.selectedOrderTransportInfoLine.contact = event.value;

    this.setInfoContact(event.value);
    // this.showDialogContactAddress = true;
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
  }

  setInfoContact(event) {
    console.log("enleventm set");
    console.log(event);
    this.selectContact = event;
    this.orderTransportInfoLineForm.controls["general"].patchValue({
      deliveryInfoName: event,
      deliveryInfoTel1: event.tel1,
      deliveryInfoEmail: event.email,
      // deliveryInfoAccount: event.account,
    });
    this.orderTransportInfoLineForm.updateValueAndValidity();
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

    this.orderTransportInfoLineDocumentEnlevement =
      this.orderTransportInfoLineDocumentEnlevement.filter(
        (l) => l.numero !== line.numero
      );
    line.type = 1;
    this.onLineEditedDocument(line);

    this.orderTransportInfoLineDocumentEnlevement.push(line);
  }

  onLineEditedDocumentLivraison(line: OrderTransportInfoLineDocument) {
    console.log("liv");

    this.orderTransportInfoLineDocumentLivraison =
      this.orderTransportInfoLineDocumentLivraison.filter(
        (l) => l.numero !== line.numero
      );
    line.type = 2;
    this.onLineEditedDocument(line);

    this.orderTransportInfoLineDocumentLivraison.push(line);
  }

  onLineEditedDocument(line: OrderTransportInfoLineDocument) {
    console.log("LineEditDocument");

    this.orderTransportInfoLineDocuments =
      this.orderTransportInfoLineDocuments.filter(
        (l) => l.numero !== line.numero
      );

    this.orderTransportInfoLineDocuments.push(line);
    console.log( this.orderTransportInfoLineDocuments);

  }

  onShowdialogAddress() {
    this.showDialogAddress = true;
  }
  onHideDialogAddress(event) {
    this.showDialogAddress = event;
  }
  onLineEditedAddress(line: Address) {
    this.setInfoAddress(line);
    console.log(line);
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
}
