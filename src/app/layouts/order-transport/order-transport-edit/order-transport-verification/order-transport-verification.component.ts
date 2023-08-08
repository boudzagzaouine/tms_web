import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { OrderTransportInfoLine } from './../../../../shared/models/order-transport-info-line';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderTransportInfoService } from './../../../../shared/services/api/order-transport-info.service';
import { OrderTransportService } from './../../../../shared/services/api/order-transport.service';
import { ToastrService } from 'ngx-toastr';
import { OrderTransportInfo } from './../../../../shared/models/order-transport-info';
import { OrderTransport } from './../../../../shared/models/order-transport';
import { Component, OnInit, Output, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import { itineraryInfo } from './../../../../shared/models/itineraryInfo';

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
  distance:number;
  itineraryLignes: OrderTransportInfoLine = new OrderTransportInfoLine
  constructor(private orderTransportService :OrderTransportService,
    private orderTransportinfoService :OrderTransportInfoService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private authenticationService:AuthenticationService


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
   console.log(this.onSelectedItineraryInfo);
   this.selectOrderTransport.numberKm=this.distance;
   //this.selectOrderTransport.orderTransportInfoRetour=null;
   console.log("================>"+this.selectOrderTransport.numberKm);

   this.selectOrderTransport.user=this.authenticationService.getCurrentUser();
  this.orderTransportService.set(this.selectOrderTransport).subscribe(
    data =>{
  this.selectOrderTransport =data;
  this.orderTransportService.addOrder(this.selectOrderTransport);
  console.log(  this.selectOrderTransportInfoAller );

  if(this.selectOrderTransport.loadingType.id==1){
    if (this.selectOrderTransport.turnType.id== 1 || this.selectOrderTransport.turnType.id==3){
      this.selectOrderTransportInfoAller.orderTransport= this.selectOrderTransport;
  console.log("aller");

      this.saveAller( this.selectOrderTransportInfoAller);

  }
   if (this.selectOrderTransport.turnType.id== 2 || this.selectOrderTransport.turnType.id==3){
    this.selectOrderTransportInfoRetour.orderTransport= this.selectOrderTransport;
    console.log("retour");

    this.saveRetour( this.selectOrderTransportInfoRetour);

  }

  }else if(this.selectOrderTransport.loadingType.id==2){
    this.selectOrderTransportInfoAller.orderTransport= this.selectOrderTransport;
    console.log("grupage");

        this.saveAller( this.selectOrderTransportInfoAller);

  }



   console.log(data);
   //this.orderTransportService.clearObject();
   this.toastr.success('Elément est Enregistré Avec Succès', 'Edition');

   this.spinner.hide();
   if (close) {
     this.router.navigate(['/core/order-transport/to-affect']);
   } else {

     this.router.navigate(['/core/order-transport/edit']);
     window.location.reload();

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
     this.orderTransportService.addOrderTransportInfoAller(this.selectOrderTransportInfoAller);
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
    this.orderTransportService.addOrderTransportInfoRetour(this.selectOrderTransportInfoRetour);

     console.log(data);
     this.toastr.success('Elément est Enregistré Avec Succès', 'Edition');
     this.orderTransportService.addOrderTransportInfoRetour(data);

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

  onSelectedItineraryInfo(itineraryInfo:itineraryInfo){

    this.distance=itineraryInfo.distance;
    console.log('----------->'+this.distance)

   }
   onSelectedItineraryInfoRetour(event){
    console.log("infoooooooooooo Retour");
    console.log(event);

   }

}
