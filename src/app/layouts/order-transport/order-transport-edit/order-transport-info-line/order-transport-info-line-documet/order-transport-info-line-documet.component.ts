import { OrderTransportDocumentService } from './../../../../../shared/services/api/ordet-transport-document.service';
import { DocumentType } from './../../../../../shared/models/document-type';
import { OrderTransportDocumentType } from './../../../../../shared/models/order-transport-document-type';
import { OrderTransportDocumentTypeService } from './../../../../../shared/services/api/order-transport-document-type.service';
import { log } from 'console';
import { AuthenticationService } from './../../../../../shared/services/api/authentication.service';
import { RoundPipe } from 'ngx-pipes';
import { OrderTransportInfoLineDocument } from './../../../../../shared/models/order-transport-info-line-document';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { OrderTransportDocument } from './../../../../../shared/models/order-transport-document';
import { saveAs } from 'file-saver';
import { logWarnings } from 'protractor/built/driverProviders';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-transport-info-line-documet',
  templateUrl: './order-transport-info-line-documet.component.html',
  styleUrls: ['./order-transport-info-line-documet.component.scss']
})
export class OrderTransportInfoLineDocumetComponent implements OnInit {

  @Input() selectedOrderTransportInfoLineDocument: OrderTransportInfoLineDocument = new OrderTransportInfoLineDocument();
  @Input() editMode = false;
  @Output() orderTransportInfoLineDocumentEdited = new EventEmitter<OrderTransportInfoLineDocument>();
  @Output() showDialog = new EventEmitter<boolean>();
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier';
  lineForm: FormGroup;
  orderTransportDocumentTypeList: OrderTransportDocumentType[] = [];
  orderTransportDocumentList: OrderTransportDocument[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private orderTransportDocumentTypeService: OrderTransportDocumentTypeService,
    private orderTransportDocumentService: OrderTransportDocumentService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,

  ) { }

  ngOnInit() {
    this.title = 'Ajouter';
    this.displayDialog = true;
    this.orderTransportDocumentTypeService.findAll().subscribe(
      data => {
        this.orderTransportDocumentTypeList = data;
      }
    );
    console.log(this.selectedOrderTransportInfoLineDocument.orderTransportDocumentList);

    if (!this.editMode) {
      this.selectedOrderTransportInfoLineDocument = new OrderTransportInfoLineDocument();
      this.selectedOrderTransportInfoLineDocument.orderTransportDocumentList = [];
      console.log(this.selectedOrderTransportInfoLineDocument);
      this.selectedOrderTransportInfoLineDocument.documentStatus = 2;
      console.log("ajouter");

    }

    else {
      console.log("modifier");

      this.orderTransportDocumentService.find("orderTransportInfoLineDocument.id:" + this.selectedOrderTransportInfoLineDocument.id).subscribe(
        data => {

          if (data[0]) {
            this.selectedOrderTransportInfoLineDocument.orderTransportDocumentList = data
          }
        }
      );



    }
    console.log(this.selectedOrderTransportInfoLineDocument);

    this.initForm();


  }

  initForm() {
    this.lineForm = new FormGroup({
      'numero': new FormControl(this.selectedOrderTransportInfoLineDocument.numero, Validators.required),
      'documentType': new FormControl(this.selectedOrderTransportInfoLineDocument.orderTransportDocumentType, Validators.required),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.lineForm.invalid) {
      return;
    }

    this.selectedOrderTransportInfoLineDocument.numero = this.lineForm.value['numero'];
    this.orderTransportInfoLineDocumentEdited.emit(this.selectedOrderTransportInfoLineDocument);
    console.log("Valider");

    this.displayDialog = false;

  }


  onSelectorderTransportDocumentType(event) {

    this.selectedOrderTransportInfoLineDocument.orderTransportDocumentType = event.value
    console.log('ffff' + event.value.id);
  }

  onSelectDocument(event) {
    for (let file of event.files) {
      const selectedDocument = new OrderTransportDocument();
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        selectedDocument.fileName = file.name;
        selectedDocument.file = (fileReader.result as string).split(",")[1] as any;
        selectedDocument.fileType = file.name.split('.').pop().toLowerCase();
        this.selectedOrderTransportInfoLineDocument.orderTransportDocumentList.push(selectedDocument);
      };

    }
  }
  deleteFile(orderTransportDocument: OrderTransportDocument) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        console.log('cc');
         this.orderTransportDocumentService.delete(orderTransportDocument.id).subscribe(
          data => {
            const index = this.selectedOrderTransportInfoLineDocument.orderTransportDocumentList.indexOf(orderTransportDocument);
            if (index !== -1) {
              this.selectedOrderTransportInfoLineDocument.orderTransportDocumentList.splice(index, 1);
            }
            this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
          },
          error => {
            this.toastr.error(error.error.message, 'Erreur');
          }
        ) 
      },
    });
  }


  dowloand(orderTransportDocument: OrderTransportDocument) {
    var url = orderTransportDocument.file;
    var binaryString = window.atob(url as any);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    const data = new Blob([bytes]);
    let arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(data);
    var file = new File(arrayOfBlob, orderTransportDocument.fileName, {
      type: orderTransportDocument.fileType
    });

    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      saveAs(fileReader.result, orderTransportDocument.fileName);
    }
  }


  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);
    this.displayDialog = false;

  }

}
