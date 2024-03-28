import { SubscriptionCardTypeService } from './../../../../shared/services/api/subscription-card-type.service';
import { SubscriptionCardType } from './../../../../shared/models/subscription-card-type';
import { EventEmitter,Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { SubscriptionCard } from './../../../../shared/models/subscription-card';
import { AuthenticationService } from './../../../../shared/services';
import { SubscriptionCardService } from './../../../../shared/services/api/subscription-card.service';

@Component({
  selector: 'app-subscription-card-edit',
  templateUrl: './subscription-card-edit.component.html',
  styleUrls: ['./subscription-card-edit.component.css']
})
export class SubscriptionCardEditComponent implements OnInit {

  @Input() selectedSubscriptionCard = new SubscriptionCard();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  subscriptionCardForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier une carte abonnement';
  subscriptions= new Subscription();
  subscriptionCardTypeList :SubscriptionCardType[]=[];

  constructor(private subscriptionCardService: SubscriptionCardService,
    private subsribtionCardTypeSevice: SubscriptionCardTypeService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    this.subsribtionCardTypeSevice.findAll().subscribe(
      data => {
           this.subscriptionCardTypeList=data;
      }
    );
console.log(this.editMode);

    if (this.editMode === 1) {
      this.selectedSubscriptionCard = new SubscriptionCard();
      this.title = 'Ajouter une carte abonnement';
    }

    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.subscriptionCardForm = new FormGroup({
      'code': new FormControl(this.selectedSubscriptionCard.code, Validators.required),
      'description': new FormControl(this.selectedSubscriptionCard.description),
      'fSubscriptionCardType': new FormControl(this.selectedSubscriptionCard?.subscriptionCardType),
      'price': new FormControl(this.selectedSubscriptionCard.price),


    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.subscriptionCardForm.invalid) { return; }
    this.spinner.show();
    this.selectedSubscriptionCard.code = this.subscriptionCardForm.value['code'];
    this.selectedSubscriptionCard.description = this.subscriptionCardForm.value['description'];
    this.selectedSubscriptionCard.price = this.subscriptionCardForm.value['price'];

 this.selectedSubscriptionCard.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

 console.log(this.selectedSubscriptionCard.owner);

    this.subscriptions.add( this.subscriptionCardService.set(this.selectedSubscriptionCard).subscribe(
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



  onSelectSubscriptionCardType(event){

    this.selectedSubscriptionCard.subscriptionCardType=event.value;
    console.log(  this.selectedSubscriptionCard.subscriptionCardType);


}

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
