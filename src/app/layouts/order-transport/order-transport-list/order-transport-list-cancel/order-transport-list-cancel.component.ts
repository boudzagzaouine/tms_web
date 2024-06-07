import { Subscription } from 'rxjs';
import { TransportPlanHistoryService } from './../../../../shared/services/api/transport-plan-history.service';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrderTransportRejectTypeService } from './../../../../shared/services/api/order-transport-reject-type.service';
import { TransportPlanService } from './../../../../shared/services/api/transport-plan.service';
import { OrderTransportService } from './../../../../shared/services/api/order-transport.service';
import { TurnStatusService } from './../../../../shared/services/api/turn-status.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TransportPlanHistory } from './../../../../shared/models/transport-plan-history';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TransportPlan } from './../../../../shared/models/transport-plan';
import { TurnStatus } from './../../../../shared/models/turn-status';
import { OrderTransport } from './../../../../shared/models/order-transport';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-order-transport-list-cancel',
  templateUrl: './order-transport-list-cancel.component.html',
  styleUrls: ['./order-transport-list-cancel.component.scss']
})
export class OrderTransportListCancelComponent implements OnInit {

  @Input() selectedOrderTransport=new OrderTransport();

  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
 selectedTransportPlanHistroy = new TransportPlanHistory();
 selectedTransportPlan = new TransportPlan();

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
 this.orderTransportRejectTypeService.find("type:"+3).subscribe(
  data => {
   this.orderTransportRejectTypeList=data;
   console.log("type");

  }
 );


 this.transportPlanService.find("orderTransport.id:"+this.selectedOrderTransport.id+",turnStatus.id!3;4").subscribe(
  data => {
    if(data[0]){
   this.selectedTransportPlan=data[0];
   this.selectedTransportPlanHistroy = new TransportPlanHistory();
   this.selectedTransportPlanHistroy.orderTransport =
     this.selectedTransportPlanHistroy[0].orderTransport;
   this.selectedTransportPlanHistroy.account =
     this.selectedTransportPlanHistroy[0].account;
   this.selectedTransportPlanHistroy.transportPlan = this.selectedTransportPlanHistroy[0];
   this.selectedTransportPlanHistroy.transport =
     this.selectedTransportPlanHistroy[0].transport;
   this.selectedTransportPlanHistroy.vehicleCategory =
     this.selectedTransportPlanHistroy[0].vehicleCategory;
   this.selectedTransportPlanHistroy.marginRate =
     this.selectedTransportPlanHistroy[0].marginRate;
   this.selectedTransportPlanHistroy.margineService =
     this.selectedTransportPlanHistroy[0].margineService;
   this.selectedTransportPlanHistroy.salePrice =
     this.selectedTransportPlanHistroy[0].salePrice;

   this.selectedTransportPlanHistroy.purchasePrice =
     this.selectedTransportPlanHistroy[0].purchasePrice;

   this.selectedTransportPlanHistroy.trajet =
     this.selectedTransportPlanHistroy[0]?.trajet;

   this.selectedTransportPlanHistroy.type = 3;
    }


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

    this.updateStatusOrderTransport(this.selectedOrderTransport,this.statusAnnuler);
    if(this.selectedTransportPlan.id>0){
    this.updateStatusPlanTransport(this.selectedTransportPlan);
    this.inserHitory();

    console.log("salina");


  }
  this.displayDialog = false;
    this.showDialog.emit(false);
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
