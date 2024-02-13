import { itineraryInfo } from './../../../shared/models/itineraryInfo';
import { Itinerary } from './../../../shared/models/Itinerairy';
import { TransportPlanLocationService } from './../../../shared/services/api/transport-plan-location.service';
import { TransportPlanLocation } from './../../../shared/models/transport-plan-location';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { DriverService } from './../../../shared/services/api/driver.service';
import { VehicleService } from './../../../shared/services/api/vehicle.service';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Driver } from './../../../shared/models/driver';
import { Vehicle } from './../../../shared/models/vehicle';
import { Component, OnInit } from '@angular/core';
import  * as L  from 'leaflet';
import 'leaflet-routing-machine';
import { Marker, Icon,icon } from 'leaflet';

@Component({
  selector: 'app-tracking-list',
  templateUrl: './tracking-list.component.html',
  styleUrls: ['./tracking-list.component.scss']
})
export class TrackingListComponent implements OnInit {
  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  vehicleSearch: Vehicle;
  driverSearch: Driver;
  driverList:Driver[]=[];
  vehicleList:Vehicle[]=[];

  className: string;
  cols: any[];
  editMode: number;
  showDialog: boolean;
  transportPlanLocation:TransportPlanLocation[]=[];
  subscriptions= new Subscription();
  dateSearch: Date;

  items: MenuItem[];

  home: MenuItem;

  itinerary :Itinerary= new Itinerary();
  itineraries : Array<Itinerary>=[];
  map:any;
  mainLayer:any;

 distance:any;
  time:string;
  heur :any ;
  minute : any ;

  selectItineraryInfo :itineraryInfo = new itineraryInfo();

 private iconEnlevement: Icon = icon({
   iconUrl: "./assets/img/enlevement.png",
      iconSize:    [40, 40],
 });
 private iconEnlevementLivraison: Icon = icon({
  iconUrl: "./assets/img/EnlLiv.png",
     iconSize:    [40, 40],
});
 private iconLivraison: Icon = icon({
   iconUrl: "./assets/img/livraison.png",
      iconSize:    [40, 40],
 });

 display: boolean = false;
  constructor(private vehicleService :VehicleService,
              private driverservice:DriverService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private TransportPlanLocationService:TransportPlanLocationService) { }

  ngOnInit() {
    Marker.prototype.options.icon = this.iconEnlevement;
    this.createLayer();

  }
  // ngAfterViewInit(){
  //   Marker.prototype.options.icon = this.iconEnlevement;
  //   this.createLayer();



  //  }

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


  onSearchClicked() {

    const buffer = new EmsBuffer();
    if (this.vehicleSearch != null && this.vehicleSearch !== undefined) {
      buffer.append(`vehicleId:${this.vehicleSearch.id}`);
    }
    if (this.driverSearch != null && this.driverSearch !== undefined) {
      buffer.append(`driverId~${this.driverSearch.id}`);
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
    this.loadData(this.searchQuery);
console.log(this.searchQuery);

  }

  reset() {
    this.vehicleSearch = null;
   this.driverSearch=null;
   this.dateSearch=null;

    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  loadData(search: string = '') {
    this.spinner.show();
    this.subscriptions.add(this.TransportPlanLocationService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add( this.TransportPlanLocationService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.transportPlanLocation = data;
        console.log(this.searchQuery);

console.log(this.transportPlanLocation);

    this.transportPlanLocation.forEach(ligne => {
      this.itinerary= new Itinerary();
      this.itinerary.lat= ligne.latitude;
      this.itinerary.lon=ligne.longitude;
      this.itinerary.description="df";
      this.itinerary.type="ENLEVEMENT";
      this.itinerary.date=ligne.date;

      this.itineraries.push(this.itinerary);
     });


     this.itineraries.sort((a, b) => {
      return <any>new Date(b.date) + <any>new Date(a.date);
    });

    console.log(    this.itineraries);

       // Marker.prototype.options.icon = this.iconEnlevement;

         this.createRoute();
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));
  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    this.loadData(this.searchQuery);
  }





 createRoute() {
  const  dis = null;
  var split_route1:L.LatLng[]=[];
console.log(this.itineraries);

this.itineraries.forEach(element => {
         split_route1.push(new L.LatLng(element.lat ,  element.lon,0 ));
});

 var route= L.Routing.control({
    routeWhileDragging: true,
    addWaypoints: false,

    waypoints: split_route1,

}).on('routesfound',(e)=>{
  console.log(e);
// this.distance=e.routes[0].summary.totalDistance/1000 as number;
// console.log(e.routes[0].summary.totalTime);

// this.time= (e.routes[0].summary.totalTime/3600).toString();
// this.heur=  this.time.split('.',2)[0];
// this.minute=this.time.split('.',2)[1].substring(0,2);



this.selectItineraryInfo.distance=this.distance;
this.selectItineraryInfo.heur=this.heur;
this.selectItineraryInfo.minute=this.minute;
this.selectItineraryInfo.time=this.time;
//this.itineraryInfo.emit(this.selectItineraryInfo);



//new Date()
}
).addTo(this.map).hide();


for (var i in this.itineraries) {
  L.marker(L.latLng(this.itineraries[i].lat, this.itineraries[i].lon), {
    title: this.itineraries[i].description,
    //icon: this.itineraries[i].type=="LIVRAISON" ?this.iconLivraison :this.iconEnlevement
    icon:this.showMarkerByTurnType(this.itineraries[i].type)
  }).addTo(this.map).bindPopup("<b> Type : " + this.itineraries[i].type + "</b>"+"<br><b > Client :" + this.itineraries[i].description + "</b>").openPopup();
}
  this.mainLayer.addTo(this.map);

// this.recuperateDistance();
}

 showMarkerByTurnType(type :string){
   if(type =="LIVRAISON"){
    return this.iconLivraison;
   }else if(type =="ENLEVEMENT"){
     return this.iconEnlevement;
   }else{
     return this.iconEnlevementLivraison;
   }

 }

createLayer(){



 this.mainLayer= L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// this.mainLayer=L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
//     maxZoom: 20,
//     subdomains:['mt0','mt1','mt2','mt3']
// });
this.map = L.map('map', {});

}

}
