import { OrderTransportService } from './../../../shared/services/api/order-transport.service';
import { DatePipe } from '@angular/common';
import { TransportPlanLocationService } from './../../../shared/services/api/transport-plan-location.service';
import { TransportPlanService } from './../../../shared/services/api/transport-plan.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DriverService } from './../../../shared/services/api/driver.service';
import { TurnStatusService } from './../../../shared/services/api/turn-status.service';
import { VehicleService } from './../../../shared/services/api/vehicle.service';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TransportPlan } from './../../../shared/models/transport-plan';
import { OrderTransport } from './../../../shared/models/order-transport';
import { Driver } from './../../../shared/models/driver';
import { Vehicle } from './../../../shared/models/vehicle';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-operation-tracking',
  templateUrl: './dashboard-operation-tracking.component.html',
  styleUrls: ['./dashboard-operation-tracking.component.scss']
})
export class DashboardOperationTrackingComponent implements OnInit {


  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  vehicleSearch: Vehicle;
  driverSearch: Driver;
  driverList:Driver[]=[];
  vehicleList:Vehicle[]=[];

  orderTransportSearch: OrderTransport;
  orderTransportList:OrderTransport[]=[];

  turnStatusSearch: Boolean=true;


  className: string;
  cols: any[];
  editMode: number;
  showDialog: boolean;
  transportPlan:TransportPlan[]=[];
  transportPlanCloneList:TransportPlan[]=[];

  subscriptions= new Subscription();
  dateSearch: Date;

  items: MenuItem[];

  home: MenuItem;
  constructor(private vehicleService :VehicleService,
    private  turnStatusService:TurnStatusService,
             private driverservice:DriverService,
             private spinner: NgxSpinnerService,
             private toastr: ToastrService,
             private TransportPlanService:TransportPlanService,
             private transportPlanLocationService:TransportPlanLocationService,
             private datePipe:DatePipe,
             private orderTransportService:OrderTransportService) { }

  ngOnInit() {
  }




  onSearchClicked() {

    const buffer = new EmsBuffer();

    if (this.orderTransportSearch != null && this.orderTransportSearch !== undefined) {
      buffer.append(`orderTransport.id:${this.orderTransportSearch.id}`);
    }
    if (this.vehicleSearch != null && this.vehicleSearch !== undefined) {
      buffer.append(`vehicle.id:${this.vehicleSearch.id}`);
    }
    if (this.driverSearch != null && this.driverSearch !== undefined) {
      buffer.append(`driver.id:${this.driverSearch.id}`);
    }

    if (this.turnStatusSearch != null ) {
      if(this.turnStatusSearch==true){
        //en Cour
      buffer.append('turnStatus.id!3;4;1');

      }
      else if (this.turnStatusSearch==false){
        //Fermer
      buffer.append('turnStatus.id:3');

      }
    }
    if (this.dateSearch != null && this.dateSearch !== undefined) {
      let dateD,dateF;
      dateD=this.dateSearch[0];
      dateF=this.dateSearch[1];
      if(dateD!=null){
      buffer.append(`date>${dateD.toISOString()}`);
      }
     else if(dateF!=null){
        buffer.append(`date< ${dateD.toISOString()}`);
        }
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery,'ORDER');

  }

  reset() {
    this.vehicleSearch = null;
   this.driverSearch=null;
   this.dateSearch=null;
   this.orderTransportSearch=null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery,'ALL');
  }

  loadData(search: string = '',type:string='') {
    this.spinner.show();


    this.subscriptions.add( this.TransportPlanService.getItineraries( search).subscribe(
      data => {

        this.transportPlan = data;
 this.transportPlanCloneList=data;
      }))
    }

    onVehicleSearch(event){
      this.subscriptions.add(this.vehicleService.find('registrationNumber~' + event.query).subscribe(
        data => this.vehicleList = data
      ));
    }

    onDriverSearch(event){
      this.subscriptions.add(this.driverservice.find('name~' + event.query).subscribe(
        data => this.driverList = data
      ));
    }


    onOrderTransportSearch(event){
      this.subscriptions.add(this.orderTransportService.find('code~' + event.query).subscribe(
        data => this.orderTransportList = data
      ));
    }
}
