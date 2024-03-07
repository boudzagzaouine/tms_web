import { PaymentTypeService } from './../../../../shared/services/api/payment-type.service';
import { PaymentType } from './../../../../shared/models/payment-method';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-payment-type-edit',
  templateUrl: './payment-type-edit.component.html',
  styleUrls: ['./payment-type-edit.component.scss']
})
export class PaymentTypeEditComponent implements OnInit {

  @Input() selectedPaymentType = new PaymentType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  paymentTypeForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier PaymentType';
  subscriptions= new Subscription();

  constructor(private paymentTypeService: PaymentTypeService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedPaymentType = new PaymentType();
      this.title = 'Ajouter PaymentType';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.paymentTypeForm = new FormGroup({
      'code': new FormControl(this.selectedPaymentType.code, Validators.required),
      'description': new FormControl(this.selectedPaymentType.description),


    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.paymentTypeForm.invalid) { return; }
    this.spinner.show();
    this.selectedPaymentType.code = this.paymentTypeForm.value['code'];
    this.selectedPaymentType.description = this.paymentTypeForm.value['description'];
    this.selectedPaymentType.active=true;
 console.log("owner");


    this.subscriptions.add( this.paymentTypeService.set(this.selectedPaymentType).subscribe(
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
