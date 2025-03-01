import { OrderTransportTrajetQuantity } from './../../../../../shared/models/order-transport-trajet-quantity';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ConfirmationService, MessageService } from "primeng/api";
import { observable, Subscription } from "rxjs";
import { Address, Contact, Account, PaymentType } from "./../../../../../shared/models";
import { OrderTransportInfoLine } from "./../../../../../shared/models/order-transport-info-line";
import { OrderTransportInfoLineDocument } from "./../../../../../shared/models/order-transport-info-line-document";
import { OrderTransportType } from "./../../../../../shared/models/order-transport-type";
import { TurnStatus } from "./../../../../../shared/models/turn-status";
import { AddressService } from "./../../../../../shared/services/api/address.service";
import { ContactService } from "./../../../../../shared/services/api/contact.service";
import { OrderTransportTypeService } from "./../../../../../shared/services/api/order-transport-type.service";
import { OrderTransportService } from "./../../../../../shared/services/api/order-transport.service";
import { PaymentTypeService } from "./../../../../../shared/services/api/payment-type.service";
import { TurnStatusService } from "./../../../../../shared/services/api/turn-status.service";
import { OrderTransportInfoLineDocumentService } from './../../../../../shared/services/api/order-transport-info-line-documet.service';

@Component({
  selector: "app-order-transport-complet-edit",
  templateUrl: "./order-transport-complet-edit.component.html",
  styleUrls: ["./order-transport-complet-edit.component.scss"],
})
export class OrderTransportCompletEditComponent implements OnInit {


  @Input() selectedOrderTransportInfoLine: OrderTransportInfoLine;
  selectedOrderTransportTrajetQuantity: OrderTransportTrajetQuantity;
  @Input() editMode: number;
  @Input() displayDialog: Boolean;
  @Input() orderTypeTitle: string;
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() orderTransportInfoLineAdded =
    new EventEmitter<OrderTransportInfoLine>();
  orderTransportInfoLineForm: FormGroup;
  selectAddress: Address = new Address();
  selectContact: Contact = new Contact();

  orderTransportTypeList: OrderTransportType[] = [];
  isFormSubmitted = false;


  subscrubtion = new Subscription();
  selectedAccount: Account = new Account();
  showDialogContactAddress: Boolean = false;
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

  documentIdEnlevement=-100;
  documentIdLivraison=-200;


  constructor(
    private orderTransportTypeService: OrderTransportTypeService,
    public orderTransportService: OrderTransportService,
    private orderTransportInfoLineDocumentService: OrderTransportInfoLineDocumentService,
    private turnStatusService: TurnStatusService,
    private paymentTypeService: PaymentTypeService,
    private addressService: AddressService,
    private contactService: ContactService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService


  ) { }

  ngOnInit() {

    this.orderTransportService.subject.subscribe(
      data => {



        if (data == true) {
          this.onSubmit();
        }


      }
    )


    this.initForm();
    this.paymentTypeService.findAll().subscribe((data) => {
      this.paymentTypeList = data;
      this.initForm();
    });
    if (this.editMode) {
      this.selectAddress = this.selectedOrderTransportInfoLine.address;
      this.onLineEditedContact(this.selectedOrderTransportInfoLine.contact);
      this.selectedAccount = this.selectedOrderTransportInfoLine.account;
      this.getOrderTransportInfoLineDocumentEnlevement(
        this.selectedOrderTransportInfoLine
      );
      // if(this.orderTypeTitle=="Livraison"){
      //   this.orderTransportInfoLineForm.controls["date"].setValue[];
      // }

    } else {

      if (this.orderTypeTitle == "Enlevement") {
        this.orderTransportTypeService.findAll().subscribe((data) => {
          this.orderTransportTypeList = data;
          this.selectedOrderTransportInfoLine.orderTransportType = this.orderTransportTypeList.filter((f) => f.id == 1)[0];
        });

      } else if (this.orderTypeTitle == "Livraison") {

        this.orderTransportTypeService.findAll().subscribe((data) => {
          this.orderTransportTypeList = data;
          this.selectedOrderTransportInfoLine.orderTransportType = this.orderTransportTypeList.filter((f) => f.id == 2)[0];

        });
      }



    }

    this.initForm();
  }

  initForm() {


    this.orderTransportInfoLineForm = new FormGroup({
      general: new FormGroup({

        deliveryInfoName: new FormControl(
          this.selectContact.name
        ),
        deliveryInfoTel1: new FormControl(this.selectContact.tel1),

        deliveryInfoAddressName: new FormControl(
          this.selectAddress.code,
          Validators.required
        ),
        deliveryInfoLine1: new FormControl(this.selectAddress.line1),
        deliveryInfoCity: new FormControl(this.selectAddress.ville?.code),
        deliveryInfoCountry: new FormControl(this.selectAddress.pays?.code),

      }),
      enlevement: new FormGroup({

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

    if (this.orderTransportInfoLineForm.controls["general"].invalid) {
      return;
    }
    if (this.selectedOrderTransportInfoLine.turnStatus == null) {
      this.turnStatusService.find("id:" + 1).subscribe((data) => {
        this.selectedOrderTransportInfoLine.turnStatus = data[0];
      });
    }
    this.selectedOrderTransportInfoLine.orderTransportInfoLineDocuments =
      this.orderTransportInfoLineDocuments;
    let formvalue = this.orderTransportInfoLineForm.value;
    this.selectedOrderTransportInfoLine.address = this.selectAddress?.id > 0 ? this.selectAddress : null;
    this.selectedOrderTransportInfoLine.contact = this.selectContact?.id > 0 ? this.selectContact : null;
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






    this.orderTransportInfoLineAdded.emit(this.selectedOrderTransportInfoLine);





  }
  getOrderTransportInfoLineDocumentEnlevement(line: OrderTransportInfoLine) {
    this.orderTransportInfoLineDocuments =
      this.selectedOrderTransportInfoLine.orderTransportInfoLineDocuments;

    this.orderTransportInfoLineDocumentEnlevement =
      this.orderTransportInfoLineDocuments.filter(
        (f) => f.type == 1
      );

    this.orderTransportInfoLineDocumentLivraison =
      this.orderTransportInfoLineDocuments.filter(
        (f) => f.type == 2
      );


  }


  destroyEnlevement() {
    this.selectedOrderTransportInfoLine.commentEnlevement = null;
    this.selectedOrderTransportInfoLine.paymentTypeEnlevement = null;
  }
  validateEnlevement() {
    let formvalue = this.orderTransportInfoLineForm.value;
    if (this.orderTransportInfoLineForm.controls["enlevement"].invalid) {
      return;
    }

    this.selectedOrderTransportInfoLine.commentEnlevement =
      formvalue["enlevement"]["comment"];
    this.selectedOrderTransportInfoLine.paymentAmountEnlevement =
      formvalue["enlevement"]["paymentAmount"];
    this.selectedOrderTransportInfoLine.dateEnlevement =
      formvalue["enlevement"]["date"];
  }
  destroyLivraison() {
    this.selectedOrderTransportInfoLine.commentLivraison = null;
    this.selectedOrderTransportInfoLine.paymentTypeLivraison = null;
  }
  validateLivraison() {
    let formvalue = this.orderTransportInfoLineForm.value;

    if (this.orderTransportInfoLineForm.controls["livraison"].invalid) {
      return;
    }
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




  onAddressSearch(event) {
    this.addressService
      .find("delivery:true,code~" + event.query)
      .subscribe((data) => (this.addressList = data));
  }

  onSelectAddress(event) {
    this.selectedOrderTransportInfoLine.address = event;

    this.setInfoAddress(event);
    this.contactService.find("address.id:" + event.id).subscribe((data) => {
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



  setInfoAddress(event) {
    this.selectAddress = event;
    console.log(this.selectAddress);


    this.orderTransportInfoLineForm.controls["general"].patchValue({
      deliveryInfoAddressName: event,
      deliveryInfoLine1: event.line1,
      deliveryInfoCity: event.ville.code,
      deliveryInfoCountry: event.pays.code,

    });
    this.orderTransportInfoLineForm.updateValueAndValidity();
  }
  setInfoContact(event) {

    this.selectContact = event;
    this.orderTransportInfoLineForm.controls["general"].patchValue({
      deliveryInfoName: event,
      deliveryInfoTel1: event?.tel1,
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

  }
  onHideDialogLine(event) {
    this.showDialogEnlevement = event;
    this.showDialogLivraison = event;

  }

  onLineEditedDocumentEnlevement(line: OrderTransportInfoLineDocument) {
    console.log(this.orderTransportInfoLineDocuments);

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
  onDeleteLineEnlevement(line) {
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
    console.log(this.orderTransportInfoLineDocuments);

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

  onDeleteLineLivraison(line) {
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

  onLineEditedContact(contact: Contact) {
    this.contactService
      .find("address.id:" + this.selectAddress.id)
      .subscribe((data) => {

        this.contactList = data;
        this.setInfoContact(contact);
      });
  }
  onShowdialogContact() {

    if (this.selectAddress.code != null) {
      this.showDialogContact = true;
    } else {
      this.toastr.info("sélectionné adresse", "Info");
    }
  }

  onHideDialogContact(event) {
    this.showDialogContact = event;
  }





}
