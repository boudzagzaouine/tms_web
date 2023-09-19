import { OrderTransportDocumentTypeService } from './../../../../shared/services/api/order-transport-document-type.service';
import { OrderTransportDocumentType } from './../../../../shared/models/order-transport-document-type';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-document-type-edit',
  templateUrl: './document-type-edit.component.html',
  styleUrls: ['./document-type-edit.component.scss']
})
export class DocumentTypeEditComponent implements OnInit {


  @Input() selectedOrderTransportDocumentType = new OrderTransportDocumentType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  orderTransportDocumentTypeForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un type de Document';
  subscriptions= new Subscription();

  constructor(private orderTransportDocumentTypeService: OrderTransportDocumentTypeService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedOrderTransportDocumentType = new OrderTransportDocumentType();
      this.title = 'Ajouter un type de Document';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.orderTransportDocumentTypeForm = new FormGroup({
      'code': new FormControl(this.selectedOrderTransportDocumentType.code, Validators.required),
      'description': new FormControl(this.selectedOrderTransportDocumentType.description),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.orderTransportDocumentTypeForm.invalid) { return; }
    this.spinner.show();
    this.selectedOrderTransportDocumentType.code = this.orderTransportDocumentTypeForm.value['code'];
    this.selectedOrderTransportDocumentType.description = this.orderTransportDocumentTypeForm.value['description'];
//  this.selectedOrderTransportDocumentType.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

//  console.log(this.selectedOrderTransportDocumentType.owner);

    this.subscriptions.add( this.orderTransportDocumentTypeService.set(this.selectedOrderTransportDocumentType).subscribe(
      data => {
        //this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément est Enregistré avec succès'});

        // this.loadData();
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

       // this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
