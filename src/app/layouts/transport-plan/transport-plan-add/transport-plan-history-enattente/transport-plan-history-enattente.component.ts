import { TransportPlanHistoryService } from './../../../../shared/services/api/transport-plan-history.service';
import { TransportPlanHistory } from './../../../../shared/models/transport-plan-history';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-transport-plan-history-enattente',
  templateUrl: './transport-plan-history-enattente.component.html',
  styleUrls: ['./transport-plan-history-enattente.component.css']
})
export class TransportPlanHistoryEnattenteComponent implements OnInit {
  @Input() selectedOrderTransportId :number;
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() transportPlanHistoryAffected = new EventEmitter<TransportPlanHistory>();

  selectTransportPlanHistory : TransportPlanHistory=new TransportPlanHistory();
  displayDialog: boolean;
  title = 'Liste des transporteurs en attente';
 transportPlanHistoryList:TransportPlanHistory[]=[];
 showDialogReject:Boolean=false;
  constructor(private transportPlanHistoryService : TransportPlanHistoryService) { }

  ngOnInit() {
console.log(this.selectedOrderTransportId);

    this.transportPlanHistoryService
      .find("orderTransport.id:" + this.selectedOrderTransportId+',type:4')
      .subscribe((data) => {
if(data[0]){
this.transportPlanHistoryList=data}
      });
    this.displayDialog=true;
  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  onSelectOrder(event,type:number){
 this.selectTransportPlanHistory=event;
 this.selectTransportPlanHistory.type=type;

  this.showDialogReject=true;



  }
  onAffected(event){
    this.selectTransportPlanHistory=event;
  console.log(this.selectTransportPlanHistory);

   this.transportPlanHistoryAffected.emit( this.selectTransportPlanHistory);



     }

  onShowDialogHistory(event){
    this.transportPlanHistoryService
      .find("orderTransport.id:" + this.selectedOrderTransportId+',type:4')
      .subscribe((data) => {
if(data[0]){
this.transportPlanHistoryList=data}
else {
this.onShowDialog();
}
this.showDialogReject = event;

      });

  }
}
