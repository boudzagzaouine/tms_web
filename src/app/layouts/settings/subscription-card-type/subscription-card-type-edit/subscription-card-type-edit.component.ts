import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { SubscriptionCardTypeService } from './../../../../shared/services/api/subscription-card-type.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubscriptionCardType } from './../../../../shared/models/subscription-card-type';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-subscription-card-type-edit',
  templateUrl: './subscription-card-type-edit.component.html',
  styleUrls: ['./subscription-card-type-edit.component.css']
})
export class SubscriptionCardTypeEditComponent implements OnInit {

  @Input() selectedSubscriptionCardType = new SubscriptionCardType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  subscriptionCardTypeForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier Type  carte abonnement';
  subscriptions= new Subscription();

  constructor(private subscriptionCardTypeService: SubscriptionCardTypeService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedSubscriptionCardType = new SubscriptionCardType();
      this.title = 'Ajouter Type carte abonnement';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.subscriptionCardTypeForm = new FormGroup({
      'code': new FormControl(this.selectedSubscriptionCardType.code, Validators.required),
      'description': new FormControl(this.selectedSubscriptionCardType.description),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.subscriptionCardTypeForm.invalid) { return; }
    this.spinner.show();
    this.selectedSubscriptionCardType.code = this.subscriptionCardTypeForm.value['code'];
    this.selectedSubscriptionCardType.description = this.subscriptionCardTypeForm.value['description'];
 this.selectedSubscriptionCardType.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

 console.log(this.selectedSubscriptionCardType.owner);

    this.subscriptions.add( this.subscriptionCardTypeService.set(this.selectedSubscriptionCardType).subscribe(
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
