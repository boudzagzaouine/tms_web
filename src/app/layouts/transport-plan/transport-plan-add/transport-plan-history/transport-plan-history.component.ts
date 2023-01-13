import { OrderTransportRejectTypeService } from './../../../../shared/services/api/order-transport-reject-type.service';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { TransportPlanHistoryService } from './../../../../shared/services/api/transport-plan-history.service';
import { Subscription } from 'rxjs';
import { TransportPlanHistory } from './../../../../shared/models/transport-plan-history';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transport-plan-history',
  templateUrl: './transport-plan-history.component.html',
  styleUrls: ['./transport-plan-history.component.css']
})
export class TransportPlanHistoryComponent implements OnInit {

  @Input() selectedTransportPlanHistroy = new TransportPlanHistory();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  orderTransportRejectTypeList : OrderTransportRejectTypeService[]=[];
    transportPlanHistoryForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier Motif';
  subscriptions= new Subscription();

  constructor(private transportPlanHistoryService: TransportPlanHistoryService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private orderTransportRejectTypeService : OrderTransportRejectTypeService
  ) { }

  ngOnInit() {

 console.log(this.selectedTransportPlanHistroy);

    if (this.editMode === 1) {
      this.selectedTransportPlanHistroy = new TransportPlanHistory();
      this.title = 'Ajouter Motif';
    }
 this.orderTransportRejectTypeService.find("type:"+this.selectedTransportPlanHistroy.type).subscribe(
  data => {
   this.orderTransportRejectTypeList=data;
  }
 );
    this.displayDialog = true;
    this.initForm();


  }

  initForm() {
    this.transportPlanHistoryForm = new FormGroup({
      'code': new FormControl(this.selectedTransportPlanHistroy.orderTransportRejectType, Validators.required),
      'description': new FormControl(this.selectedTransportPlanHistroy.remark),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.transportPlanHistoryForm.invalid) { return; }
    this.spinner.show();
    this.selectedTransportPlanHistroy.remark = this.transportPlanHistoryForm.value['description'];
//  this.selectedTransportPlanHistroy.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

//  console.log(this.selectedTransportPlanHistroy.owner);

    this.subscriptions.add( this.transportPlanHistoryService.set(this.selectedTransportPlanHistroy).subscribe(
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

  onSelectOrderTransportRejectType(event){
  this.selectedTransportPlanHistroy.orderTransportRejectType=event.value;
  }
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
