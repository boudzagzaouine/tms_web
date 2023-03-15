import { TurnStatus } from './../../../../shared/models/turn-status';
import { TurnStatusService } from './../../../../shared/services/api/turn-status.service';
import { OrderTransportService } from './../../../../shared/services/api/order-transport.service';
import { TransportPlanService } from './../../../../shared/services/api/transport-plan.service';
import { OrderTransport } from './../../../../shared/models/order-transport';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { TransportPlanHistoryService } from './../../../../shared/services/api/transport-plan-history.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderTransportRejectTypeService } from './../../../../shared/services/api/order-transport-reject-type.service';
import { TransportPlanHistory } from './../../../../shared/models/transport-plan-history';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TransportPlan } from './../../../../shared/models/transport-plan';

@Component({
  selector: 'app-transport-plan-cancel',
  templateUrl: './transport-plan-cancel.component.html',
  styleUrls: ['./transport-plan-cancel.component.css']
})
export class TransportPlanCancelComponent implements OnInit {

  @Input() selectedTransportPlanHistroy = new TransportPlanHistory();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  orderTransportRejectTypeList : OrderTransportRejectTypeService[]=[];
    transportPlanHistoryForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier Motif';
  subscriptions= new Subscription();
  statusAnnuler:TurnStatus = new TurnStatus();
  statusCreate:TurnStatus = new TurnStatus();
  orderTransport : OrderTransport = new OrderTransport();
  transportPlan : TransportPlan=new TransportPlan();
  constructor(private transportPlanHistoryService: TransportPlanHistoryService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private orderTransportRejectTypeService : OrderTransportRejectTypeService,
    private transportPlanService:TransportPlanService,
    private orderTransportService:OrderTransportService,
    private turnStatusService:TurnStatusService,
    private confirmationService:ConfirmationService
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

 this.getStatusAnnuler();
 this.getStatusCreate();
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

    this.selectedTransportPlanHistroy.remark = this.transportPlanHistoryForm.value['description'];
//  this.selectedTransportPlanHistroy.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

//  console.log(this.selectedTransportPlanHistroy.owner);
this.confirmationService.confirm({
  message: 'Voulez-vous   Annuler Order Transport ?',
  accept: () => {
    this.updateStatusOrderTransport(this.selectedTransportPlanHistroy.orderTransport,this.statusAnnuler);
    this.updateStatusPlanTransport(this.selectedTransportPlanHistroy.transportPlan);
    this.inserHitory();
    },
    reject:() =>{
      this.updateStatusOrderTransport(this.selectedTransportPlanHistroy.orderTransport,this.statusCreate);
      this.updateStatusPlanTransport(this.selectedTransportPlanHistroy.transportPlan);
      this.inserHitory();
    }
  })

  }

  inserHitory(){
    this.spinner.show();
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

getStatusAnnuler(){

  this.turnStatusService.findById(4).subscribe(
    data=>{
            this.statusAnnuler=data;
    }
  );
}
getStatusCreate(){

  this.turnStatusService.findById(1).subscribe(
    data=>{
            this.statusCreate=data;
    }
  );
}

  updateStatusPlanTransport(planTransport : TransportPlan){

    this.transportPlanService.findById(planTransport.id).subscribe(
      data=>{
    this.transportPlan=data;
        this.transportPlan.turnStatus=this.statusAnnuler;
        this.transportPlanService.set(this.transportPlan).subscribe(
           savePT=>{
            this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément PT est Enregistré avec succès'});


           }
          )
        }
    )


  }

  updateStatusOrderTransport(orderTransport : OrderTransport,turnstatus : TurnStatus){
    this.orderTransportService.findById(orderTransport.id).subscribe(
      data=>{
    this.orderTransport=data;

        this.orderTransport.turnStatus=turnstatus;
        this.orderTransportService.set(this.orderTransport).subscribe(
           savePT=>{
            this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément PT est Enregistré avec succès'});


           }
          )
        }
    )
  }




}
