import { OrderTransportDocumentType } from './../../../../../shared/models/order-transport-document-type';
import { OrderTransportDocumentTypeService } from './../../../../../shared/services/api/order-transport-document-type.service';
import { log } from 'console';
import { AuthenticationService } from './../../../../../shared/services/api/authentication.service';
import { RoundPipe } from 'ngx-pipes';
import { OrderTransportInfoLineDocument } from './../../../../../shared/models/order-transport-info-line-document';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

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
 orderTransportDocumentTypeList : OrderTransportDocumentType[]=[];

  constructor(
    private formBuilder: FormBuilder,
  private orderTransportDocumentTypeService : OrderTransportDocumentTypeService,

    private authentificationService:AuthenticationService,

  ) { }

  ngOnInit() {
 console.log("ddddd");

    this.title = 'Ajouter';
    this.displayDialog = true;
  this.orderTransportDocumentTypeService.findAll().subscribe(
    data=>{
   this.orderTransportDocumentTypeList=data;
    }
  );

    if (!this.editMode) {
      this.selectedOrderTransportInfoLineDocument = new OrderTransportInfoLineDocument();
console.log(this.selectedOrderTransportInfoLineDocument);

      // this.maintenanceStateService.findAll().subscribe((data) => {
      //  this.maintenanceStateList= data.filter(f => f.id === 2);
      //  this.selectedOrderTransportInfoLineDocument.maintenanceState=this.maintenanceStateList[0];
      // })
    }
    console.log(this.selectedOrderTransportInfoLineDocument);

    this.initForm();


  }

  initForm() {
    this.lineForm = new FormGroup({
      'numero': new FormControl(this.selectedOrderTransportInfoLineDocument.numero, Validators.required),
      'documentType': new FormControl(this.selectedOrderTransportInfoLineDocument.numero, Validators.required),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.lineForm.invalid) {
      return;
    }

    this.selectedOrderTransportInfoLineDocument.numero = this.lineForm.value['numero'];
     this.orderTransportInfoLineDocumentEdited.emit(this.selectedOrderTransportInfoLineDocument);
    this.displayDialog = false;

  }


  onSelectorderTransportDocumentType(event){

    this.selectedOrderTransportInfoLineDocument.orderTransportDocumentType=event.value
  }




  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);
    this.displayDialog = false;

  }

}
