import { OrderTransport } from './../../../shared/models/order-transport';
import { OrderTransportService } from './../../../shared/services/api/order-transport.service';
import { DatePipe } from '@angular/common';
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
import 'leaflet.awesome-markers';
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

  orderTransportSearch: OrderTransport;
  orderTransportList:OrderTransport[]=[];

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
 private iconDrive: Icon = icon({
  iconUrl: "./assets/img/drive.png",
     iconSize:    [40, 40],
});
private iconNone: Icon = icon({
  iconUrl: "./assets/img/none.png",
     iconSize:    [40, 40],


});



 display: boolean = false;
  constructor(private vehicleService :VehicleService,
              private driverservice:DriverService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private TransportPlanLocationService:TransportPlanLocationService,
              private datePipe:DatePipe,
              private orderTransportService:OrderTransportService) { }

  ngOnInit() {
   Marker.prototype.options.icon = this.iconNone;

    this.createLayer();
this.searchQuery="date>"+new Date().toISOString()+"date<"+new Date().toISOString();
    this.loadData(this.searchQuery);
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


  onOrderTransportSearch(event){
    this.subscriptions.add(this.orderTransportService.find('code~' + event.query).subscribe(
      data => this.orderTransportList = data
    ));
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
    this.subscriptions.add( this.TransportPlanLocationService.find( search).subscribe(
      data => {

        this.transportPlanLocation = data;

        this.map.eachLayer((layer) => {
          layer.remove();
        });
        console.log(this.searchQuery);

console.log(this.transportPlanLocation);
  let i :number =0.3500;
  this.itineraries=[];

//   const transportPlanLocations=  this.transportPlanLocation.filter((value, index, array) =>
//        index ==  array.findIndex(
//        item =>  item.orderTransportInfoLine?.id == value.orderTransportInfoLine?.id)

// );

this.transportPlanLocation.forEach((item, index) => {
  if(item?.orderTransportInfoLine?.id>0){


  if (index!== this.transportPlanLocation.findIndex(i => i.orderTransportInfoLine?.id === item.orderTransportInfoLine?.id))
  {
      this.transportPlanLocation.splice(index, 1);
  }}
});



this.transportPlanLocation.forEach(ligne => {

      console.log(ligne.orderTransportInfoLine?.id);

      this.itinerary= new Itinerary();
      this.itinerary.lat= ligne.latitude;
      this.itinerary.lon=ligne.longitude;
      this.itinerary.orderTransportInfoLine=ligne.orderTransportInfoLine;

      this.itinerary.description=ligne.orderTransportInfoLine?.contact?.name;
      this.itinerary.type=ligne.orderTransportInfoLine?.orderTransportType?.code;
      this.itinerary.status=ligne.orderTransportInfoLine?.turnStatus?.code;
      this.itinerary.dateArriver=ligne.orderTransportInfoLine?.dateArriver;
      this.itinerary.dateCommancerChargement=ligne.orderTransportInfoLine?.dateCommancerChargement;
      this.itinerary.dateCommancerDechargement=ligne.orderTransportInfoLine?.dateCommancerDechargement;
      this.itinerary.dateFinDechargement=ligne.orderTransportInfoLine?.dateFinDechargement;
      this.itinerary.dateFinChargement=ligne.orderTransportInfoLine?.dateFinChargement;

      this.itinerary.date=ligne.date;
i+=0.500;
console.log(i);

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
  this.spinner.show();
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
  let message="" ;
  if(this.itineraries[i].type!=undefined){
    message += "<b> line : " + this.itineraries[i].orderTransportInfoLine?.id + "</b><br>" ;

    message += "<b> Type : " + this.itineraries[i].type + "</b>"+"<br><b > Client :" + this.itineraries[i].description +
    "</b><br>";
    if(this.itineraries[i].type =="ENLEVEMENT" || this.itineraries[i].type =="ENLEVEMENT/LIVRAISON" ){
     message +=  " <b> arrivée :"+this.datePipe.transform(this.itineraries[i].dateArriver,'dd-MM-yyyy HH:mm:ss')+"</b><br>"+
     " <b> Debut Chargement :"+this.datePipe.transform(this.itineraries[i].dateCommancerChargement,'dd-MM-yyyy HH:mm:ss')+"</b><br>"+
    " <b> Fin Chargement :"+this.datePipe.transform(this.itineraries[i].dateFinChargement,'dd-MM-yyyy HH:mm:ss')+"</b> <br>"

    }
    else if(this.itineraries[i].type =="LIVRAISON" || this.itineraries[i].type =="ENLEVEMENT/LIVRAISON" ){
     message +=  " <b> arrivée :"+this.datePipe.transform(this.itineraries[i].dateArriver,'dd-MM-yyyy HH:mm:ss')+"</b><br>"+
     " <b>Debut Dechargement :"+this.datePipe.transform(this.itineraries[i].dateCommancerDechargement,'dd-MM-yyyy HH:mm:ss')+"</b> <br>"+
    " <b> Fin Dechargement :"+this.datePipe.transform(this.itineraries[i].dateFinDechargement,'dd-MM-yyyy HH:mm:ss')+"</b> <br>"
    }

    message +=  " <b> Statut :"+this.itineraries[i].status+"</b><br>";


  }
  else{
    message += "<b> En Route "
  }
  console.log(message );
  console.log(message);



  var numberDiv = document.createElement('div');
  numberDiv.className = 'number';
  numberDiv.textContent = '1';

  L.marker(L.latLng(this.itineraries[i].lat, this.itineraries[i].lon), {

icon:  this.itineraries[i].type!=undefined ?  new L.DivIcon({
  className: 'circle',
  //  iconSize:[90, 90],
  html: numberDiv
},) :this.iconDrive


   // title: this.itineraries[i].description ,
  // icon:
  // L.AwesomeMarkers.icon({
  //   icon: '',
  //   markerColor:'blue',
  //   prefix: 'fa',

  //   })

    //icon: this.itineraries[i].type=="LIVRAISON" ?this.iconLivraison :this.iconEnlevement
  //  icon:this.showMarkerByTurnType(this.itineraries[i].type),
 //draggable:true,
 //zIndexOffset:1,
  }).addTo(this.map).bindPopup(message,).openPopup();
}
  this.mainLayer.addTo(this.map);

// this.recuperateDistance();
this.spinner.hide();
}

 showMarkerByTurnType(type :string){


   if(type =="LIVRAISON"){
    console.log(type);
   return this.iconLivraison;
   }else if(type =="ENLEVEMENT"){
    console.log(type);
    return this.iconEnlevement;
   }else if(type =="ENLEVEMENT/LIVRAISON"){
    console.log(type);
    return this.iconEnlevementLivraison;
  }else{
    console.log(type);
     return this.iconDrive;
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
