import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { OrderTransportRejectTypeService } from './../../../../shared/services/api/order-transport-reject-type.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderTransportRejectType } from './../../../../shared/models/order-transport-reject-type';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-refus-edit',
  templateUrl: './refus-edit.component.html',
  styleUrls: ['./refus-edit.component.css']
})
export class RefusEditComponent implements OnInit {

  @Input() selectedOrderTransportRejectType = new OrderTransportRejectType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  orderTransportRejectTypeForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier Motif';
  subscriptions= new Subscription();

  constructor(private orderTransportRejectTypeService: OrderTransportRejectTypeService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedOrderTransportRejectType = new OrderTransportRejectType();
      this.title = 'Ajouter Motif';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.orderTransportRejectTypeForm = new FormGroup({
      'code': new FormControl(this.selectedOrderTransportRejectType.code, Validators.required),
      'description': new FormControl(this.selectedOrderTransportRejectType.description),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.orderTransportRejectTypeForm.invalid) { return; }
    this.spinner.show();
    this.selectedOrderTransportRejectType.code = this.orderTransportRejectTypeForm.value['code'];
    this.selectedOrderTransportRejectType.description = this.orderTransportRejectTypeForm.value['description'];
    this.selectedOrderTransportRejectType.type=2;
 this.selectedOrderTransportRejectType.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

 console.log(this.selectedOrderTransportRejectType.owner);

    this.subscriptions.add( this.orderTransportRejectTypeService.set(this.selectedOrderTransportRejectType).subscribe(
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
