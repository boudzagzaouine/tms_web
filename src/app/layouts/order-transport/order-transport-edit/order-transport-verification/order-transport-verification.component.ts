import { OrderTransportInfoLine } from './../../../../shared/models/order-transport-info-line';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderTransportInfoService } from './../../../../shared/services/api/order-transport-info.service';
import { OrderTransportService } from './../../../../shared/services/api/order-transport.service';
import { ToastrService } from 'ngx-toastr';
import { OrderTransportInfo } from './../../../../shared/models/order-transport-info';
import { OrderTransport } from './../../../../shared/models/order-transport';
import { Component, OnInit, Output, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-order-transport-verification',
  templateUrl: './order-transport-verification.component.html',
  styleUrls: ['./order-transport-verification.component.scss']
})
export class OrderTransportVerificationComponent implements OnInit,AfterViewInit,OnDestroy {

  @Output() previousstep = new EventEmitter<boolean>();
  selectOrderTransport : OrderTransport = new OrderTransport();
  selectOrderTransportInfoAller :OrderTransportInfo= new OrderTransportInfo();
  selectOrderTransportInfoRetour :OrderTransportInfo= new OrderTransportInfo();
  showDialogMap: boolean;
  itineraryLignes: OrderTransportInfoLine = new OrderTransportInfoLine
  constructor(private orderTransportService :OrderTransportService,
    private orderTransportinfoService :OrderTransportInfoService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,


    ) { }

  ngOnInit() {

   this.selectOrderTransport=this.orderTransportService.getOrderTransport();
   this.selectOrderTransportInfoAller=this.orderTransportService.getOrderTransport().orderTransportInfoAller;
   this.selectOrderTransportInfoRetour=this.orderTransportService.getOrderTransport().orderTransportInfoRetour;


  }

  ngAfterViewInit() {
    this.selectOrderTransport=this.orderTransportService.getOrderTransport();
    this.selectOrderTransportInfoAller=this.orderTransportService.getOrderTransport().orderTransportInfoAller;
    this.selectOrderTransportInfoRetour=this.orderTransportService.getOrderTransport().orderTransportInfoRetour;

  }

  onSubmit(close =false){
    this.spinner.show();

  console.log(this.selectOrderTransport);
   this.selectOrderTransport.orderTransportInfoAller=null;
   this.selectOrderTransport.orderTransportInfoRetour=null;

  this.orderTransportService.set(this.selectOrderTransport).subscribe(
    data =>{
  this.selectOrderTransport =data;
  console.log(  this.selectOrderTransportInfoAller );

  if(   this.selectOrderTransport.turnType.id ==1 ||   this.selectOrderTransport.turnType.id ==3 ){

    this.selectOrderTransportInfoAller.orderTransport= this.selectOrderTransport;

    this.saveAller( this.selectOrderTransportInfoAller);
  }
  if(    this.selectOrderTransport.turnType.id ==2 ||   this.selectOrderTransport.turnType.id ==3 ){
    this.selectOrderTransportInfoRetour.orderTransport= this.selectOrderTransport;
    this.saveRetour( this.selectOrderTransportInfoRetour);
  }
   console.log(data);
   this.orderTransportService.clearObject();
   this.toastr.success('Elément est Enregistré Avec Succès', 'Edition');

   this.spinner.hide();

   if (close) {
     this.router.navigate(['/core/order-transport/list']);
   } else {

     this.router.navigate(['/core/order-transport/edit']);
   }

    },
    err =>{
      this.toastr.error(err.error.message,"Erreur");
    }
  );

  }

  saveAller( aller :OrderTransportInfo){
    console.log("save info");

    this.orderTransportinfoService.set(aller).subscribe(
      data =>{
    this.selectOrderTransportInfoAller =data;
     console.log(data);
     this.toastr.success('Elément est Enregistré Avec Succès', 'Edition');
    // this.orderTransportService.addOrderTransportInfoAller(data);
      },
      err =>{
        this.toastr.error(err.error.message,"Erreur");
      }
    );


  }
  saveRetour( retour :OrderTransportInfo){
    console.log("save info");

    this.orderTransportinfoService.set(retour).subscribe(
      data =>{
    this.selectOrderTransportInfoRetour =data;
     console.log(data);
     this.toastr.success('Elément est Enregistré Avec Succès', 'Edition');
     //this.orderTransportService.addOrderTransportInfoRetour(data);

      },
      err =>{
        this.toastr.error(err.error.message,"Erreur");
      }
    );


  }



  previous() {


this.previousstep.emit(true);
  }

  onHideDialogMapAller(event) {
    this.showDialogMap = event;
  }
  onShowDialogMapAller(){
    console.log("hheho");

    this.showDialogMap = true;
  }
  ngOnDestroy() {
   // this.orderTransportService.clearObject();
    //this.subscriptions.unsubscribe();
  }

  onSelectedItineraryInfo(event){
    console.log("infoooooooooooo");
    console.log(event);

   }
   onSelectedItineraryInfoRetour(event){
    console.log("infoooooooooooo Retour");
    console.log(event);

   }

}
