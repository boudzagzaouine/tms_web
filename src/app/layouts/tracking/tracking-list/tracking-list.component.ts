import { PatrimonyService } from './../../../shared/services/api/patrimony-service';
import { OrderTransportInfo } from './../../../shared/models/order-transport-info';
import { TransportPlanLocationService } from './../../../shared/services/api/transport-plan-location.service';
import { TransportPlanLocation } from './../../../shared/models/transport-plan-location';
import { TurnStatusService } from './../../../shared/services/api/turn-status.service';
import { OrderTransport } from './../../../shared/models/order-transport';
import { OrderTransportService } from './../../../shared/services/api/order-transport.service';
import { DatePipe } from '@angular/common';
import { itineraryInfo } from './../../../shared/models/itineraryInfo';
import { Itinerary } from './../../../shared/models/Itinerairy';
import { TransportPlanService } from './../../../shared/services/api/transport-plan.service';
import { TransportPlan } from './../../../shared/models/transport-plan';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { DriverService } from './../../../shared/services/api/driver.service';
import { VehicleService } from './../../../shared/services/api/vehicle.service';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Driver } from './../../../shared/models/driver';
import { Vehicle } from './../../../shared/models/vehicle';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import  * as L  from 'leaflet';
import 'leaflet.awesome-markers';
import 'leaflet-routing-machine';
import { Marker, Icon,icon } from 'leaflet';
import { TurnStatus } from './../../../shared/models/turn-status';

@Component({
  selector: 'app-tracking-list',
  templateUrl: './tracking-list.component.html',
  styleUrls: ['./tracking-list.component.scss']
})
export class TrackingListComponent implements OnInit,AfterViewInit,OnDestroy  {
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
  dateSearch: Date[];

  items: MenuItem[];

  home: MenuItem;
css4="form-group col-md-4";
css8="form-group col-md-8"
  itinerary :Itinerary= new Itinerary();
  itineraries : Array<Itinerary>=[];
  map:any;
  mainLayer:any;

 distance:any;
  time:string;
  heur :any ;
  minute : any ;
  visibleSidebar2;
  selectItineraryInfo :itineraryInfo = new itineraryInfo();

  transportPlanLocations :TransportPlanLocation[]=[]
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
private iconPoint: Icon = icon({
  iconUrl: "./assets/img/point.png",
     iconSize:    [15, 15],


});

letters = '0123456789ABCDEF';
color = '#';
// @ViewChild('mapContainer') mapContainer: ElementRef;
@ViewChild('mapContainer1', { static: true }) mapContainer!: ElementRef;

 display: boolean = false;
  constructor(private vehicleService :VehicleService,
     private  turnStatusService:TurnStatusService,
              private driverservice:DriverService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private TransportPlanService:TransportPlanService,
              private transportPlanLocationService:TransportPlanLocationService,
              private datePipe:DatePipe,
              private orderTransportService:OrderTransportService,
              private patrimonyService:PatrimonyService) { }

  ngOnInit() {
   Marker.prototype.options.icon = this.iconNone;

   console.log(this.mapContainer);

  //  if (this.mapContainer) {
  //  if (this.mapContainer.nativeElement.hasChildNodes()) {
  //   const existingMap = this.mapContainer.nativeElement.firstChild;
  //   if (existingMap instanceof L.Map) {
  //     existingMap.remove(); // Remove existing map
  //   }
  // }

//}

   // this.createLayer();
this.searchQuery="turnStatus.id!1;2;3;4";
this.loadData(this.searchQuery,'ALL')
  //   this.createLayer();
 //   this.loadData(this.searchQuery);
  }
ngAfterViewInit(){
     Marker.prototype.options.icon = this.iconNone;

  this.createLayer();


}

  onVehicleSearch(event){
    this.subscriptions.add(this.patrimonyService.find('code~' + event.query).subscribe(
      data => this.vehicleList = data.filter(f=> f.patrimony_type=='vehicule')
    ));
  }

  onDriverSearch(event){

 let search;
    if (!isNaN(event.query)) {
      search = "code~" + event.query;
    } else {
      search = "name~" + event.query;
    }
    this.driverservice
      .find(search)
      .subscribe((data) =>{console.log(data);
       (this.driverList = data)});


  }


  onOrderTransportSearch(event){
    this.subscriptions.add(this.orderTransportService.find('code~' + event.query).subscribe(
      data => this.orderTransportList = data
    ));
  }

  onTransportPlanLocationSearch(orderTransport:OrderTransportInfo){

console.log(orderTransport);


    // this.subscriptions.add(this.transportPlanLocationService.find('orderTransport.id:' + orderTransport.id).subscribe(
    //   data => {this.transportPlanLocations = data
    //   }
    // ));

  }

  onSearchClicked() {

    const buffer = new EmsBuffer();

    if (this.orderTransportSearch != null && this.orderTransportSearch !== undefined) {
      buffer.append(`orderTransport.id:${this.orderTransportSearch.id}`);
    }
    if (this.vehicleSearch != null && this.vehicleSearch !== undefined) {
      buffer.append(`vehicle.registrationNumber~${this.vehicleSearch.registrationNumber}`);
    }
    if (this.driverSearch != null && this.driverSearch !== undefined) {
      buffer.append(`driver.id:${this.driverSearch.id}`);
    }

    if (this.turnStatusSearch != null ) {
      if(this.turnStatusSearch==true){
        //en Cour
      buffer.append('turnStatus.id!1;2;3;4');

      }
      else if (this.turnStatusSearch==false){
        //Fermer
      buffer.append('turnStatus.id:3');

      }
    }
    if (this.dateSearch != null && this.dateSearch !== undefined) {
      let dateD,dateF;
      console.log(this.dateSearch);

      dateD=this.datePipe.transform(this.dateSearch[0],'yyyy-MM-dd');
      dateF=this.datePipe.transform(this.dateSearch[1],'yyyy-MM-dd');
      console.log(dateF);

      if(dateD!=null){

      buffer.append(`dateDepart>${ dateD}`);
      }
      if(dateF!=null){
        buffer.append(`dateDepart<${ dateF}`);
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
console.log(search);


    this.subscriptions.add( this.TransportPlanService.getItineraries( search).subscribe(
      data => {

        this.transportPlan = data;
 this.transportPlanCloneList=data;

        this.map.eachLayer((layer) => {
          layer.remove();
        });
if(type=='ALL'){
  this.cloneItiniraryAllByTransportPlan();

}else if (type=='ORDER'){
this.cloneItiniraryOrderByTransportPlan();

}

//   const transportPlans=  this.transportPlan.filter((value, index, array) =>
//        index ==  array.findIndex(
//        item =>  item.orderTransportInfoLine?.id == value.orderTransportInfoLine?.id)

// );

// this.transportPlan.forEach((item, index) => {
//   if(item?.orderTransportInfoLine?.id>0){


//   if (index!== this.transportPlan.findIndex(i => i.orderTransportInfoLine?.id === item.orderTransportInfoLine?.id))
//   {
//       this.transportPlan.splice(index, 1);
//   }}
// });




    console.log(    this.itineraries);

       // Marker.prototype.options.icon = this.iconEnlevement;

        // this.createRoute();
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));
  }


  cloneItiniraryAllByTransportPlan(){


    this.itineraries=[];
this.transportPlan.forEach(plan => {



  let  itineraries :Itinerary[]=[];

  if( plan?.latitude!=null && plan?.longitude!=null){


        this.itinerary= new Itinerary();
        this.itinerary.transportPlan= plan;

        this.itinerary.lat= plan?.latitude;
        this.itinerary.lon=plan?.longitude;


        this.itinerary.vehicle= plan.vehicle;
        this.itinerary.driver= plan.driver;


        itineraries.push(this.itinerary);
  }

        itineraries.sort((a, b) => {
        return <any>new Date(b.date) + <any>new Date(a.date);
      });
      this.createMarker(itineraries);

      });
  }


  cloneItiniraryOrderByTransportPlan(){


    this.itineraries=[];




this.transportPlan.forEach(plan => {
  let  itineraries :Itinerary[]=[];
   this.itinerary= new Itinerary();
    this.itinerary.lat= plan?.latitude;
    this.itinerary.lon=plan?.longitude;
     this.itinerary.vehicle= plan.vehicle;
    this.itinerary.driver= plan.driver;
    itineraries.push(this.itinerary);

    plan.orderTransport.orderTransportInfos.forEach(info => {

      info.orderTransportInfoLines.forEach(line =>{


        this.itinerary= new Itinerary();
        this.itinerary.lat= line.address?.latitude;
        this.itinerary.lon=line.address?.longitude;
        this.itinerary.orderTransportInfoLine=line;

        this.itinerary.description=line?.contact?.name;
        this.itinerary.type=line?.orderTransportType?.code;
        this.itinerary.status=line?.turnStatus?.code;
        this.itinerary.dateArriver=line?.dateArriver;
        this.itinerary.dateCommancerChargement=line?.dateCommancerChargement;
        this.itinerary.dateCommancerDechargement=line?.dateCommancerDechargement;
        this.itinerary.dateFinDechargement=line?.dateFinDechargement;
        this.itinerary.dateFinChargement=line?.dateFinChargement;
        this.itinerary.lineNumber=line?.lineNumber;
        this.itinerary.date=line?.dateArriver!=undefined ? line?.dateArriver: line.date;

        this.itinerary.vehicle= plan.vehicle;
        this.itinerary.driver= plan.driver;


        itineraries.push(this.itinerary);

      })

       });
        itineraries.sort((a, b) => {
        return <any>new Date(b.date) + <any>new Date(a.date);
      });
      // this.createMarker(itineraries);
      this.createRoute(itineraries);

      });
  }


  getLocalisation(transportPlan:TransportPlan){
    let  itineraries :Itinerary[]=[];
this.spinner.show();
    this.transportPlanLocationService.find('transportPlan.id:'+transportPlan.id).subscribe(
      data=>{


        this.transportPlanLocations=data;
        console.log(data);

if(data[0]){

  this.transportPlanLocations.forEach(line =>{


    this. itinerary= new Itinerary();
    this.itinerary.lat= line.latitude;
    this.itinerary.lon=line.longitude;




    itineraries.push(this.itinerary);
  });
  this.spinner.show();
  this.createMarkerLocation(itineraries);


}


      }
    );




  }


  createMarkerLocation(itineraries){
    this.itineraries=itineraries;
    console.log(itineraries);


      for (var i in this.itineraries) {
        L.marker(L.latLng(this.itineraries[i].lat, this.itineraries[i].lon), {
        //  title: this.itineraries[i].description ,
        // icon:
        // L.AwesomeMarkers.icon({
        //   icon: "coffee",
        //   markerColor: "orange",
        //   prefix: "fa",
        //   iconColor: "black"

        //   })
          //icon: this.itineraries[i].type=="LIVRAISON" ?this.iconLivraison :this.iconEnlevement
         icon:this.iconPoint,
       //draggable:true,
       //zIndexOffset:1,
        }).addTo(this.map)

      }

        this.mainLayer.addTo(this.map);

      this.spinner.hide();

    }


  getRandomColor2() {
    var length = 6;
    var chars = '0123456789ABCDEF';
    var hex = '#';
    while(length--) hex += chars[(Math.random() * 16) | 0];
    return hex;
  }


 createRoute(itineraries) {
  console.log('itineraire');

  console.log(itineraries);

  this.itineraries=itineraries
  this.spinner.show();
  const  dis = null;
  var split_route1:L.LatLng[]=[];


this.itineraries.forEach(element => {
         split_route1.push(new L.LatLng(element.lat ,  element.lon,0 ));
});
//var polyline = L.polyline(split_route1, {color: 'white'}).addTo(this.map);
var pane1 = this.map.createPane(this.itineraries[0]?.orderTransportInfoLine?.id.toString());
//console.log(this.getRandomColor2());

 var route= L.Routing.control({
    routeWhileDragging: true,
    addWaypoints: false,

    waypoints: split_route1,
lineOptions: {styles: [{pane:pane1, color: '#0cb0fb', opacity: 1, weight: 4}],missingRouteTolerance:2,extendToWaypoints:true},




}).on('routesfound',(e)=>{

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


this.createMarker(  this.itineraries);
}

createMarker(itineraries){
this.itineraries=itineraries;

  for (var i in this.itineraries) {
    let message="" ;
    let ot = this.itineraries[i]?.transportPlan?.id;
    if(this.itineraries[i].type!=undefined){
      // message += "<b> line : " + this.itineraries[i].orderTransportInfoLine?.id + "</b><br>" ;

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
      message += "<i class='fa fa-road'  style='    color: #ee8e8f;'> </i><b> En Route<br>"+
      "<i class='fa fa-truck mr-2' style='    color: #ee8e8f;'></i>"+this.itineraries[i]?.vehicle?.registrationNumber +
      "<br><i class='fa fa-user mr-2' style='    color: #ee8e8f;' ></i> "+this.itineraries[i]?.driver?.codeName ;
     message +="<br><button type='button' class='btn btn-primary p-0' style='width: 100%;'>Détails</button>"

    }




    var numberDiv = document.createElement('div');
    numberDiv.className = 'number';
    numberDiv.textContent =''+ this.itineraries[i].lineNumber;



    L.marker(L.latLng(this.itineraries[i].lat, this.itineraries[i].lon), {

  icon:  this.itineraries[i].type!=undefined ?  new L.DivIcon({
    className: 'circleMarker',
     iconSize:[90, 90],
    html: numberDiv
  },) :this.iconDrive


    //  title: this.itineraries[i].description ,
    // icon:
    // L.AwesomeMarkers.icon({
    //   icon: "coffee",
    //   markerColor: "orange",
    //   prefix: "fa",
    //   iconColor: "black"

    //   })

      //icon: this.itineraries[i].type=="LIVRAISON" ?this.iconLivraison :this.iconEnlevement
    //  icon:this.showMarkerByTurnType(this.itineraries[i].type),
   //draggable:true,
   //zIndexOffset:1,
    }).addTo(this.map).bindPopup(message,)
    //.openPopup()
    .on("popupopen", (a) => {
      var popUp = a.target.getPopup()
      popUp.getElement()
     .querySelector(".btn")
     .addEventListener("click", e => {


      console.log(ot);
       this.test(ot);
      });    })
    //.on('click', this.onClick);


  }

    this.mainLayer.addTo(this.map);

  // this.recuperateDistance();
  this.spinner.hide();

}
onClick(e) {
  var popup = e.target.getPopup();
  var content = popup.getContent();

  console.log(content);
}
test(transportPlanId){
  this.map.eachLayer((layer) => {
    layer.remove();
  });
  console.log("test");
this.visibleSidebar2=true;
this.transportPlan=this.transportPlanCloneList.filter(f=> f.id==transportPlanId)
this.cloneItiniraryOrderByTransportPlan();


console.log(event);

}
 showMarkerByTurnType(type :string){


   if(type =="LIVRAISON"){

   return this.iconLivraison;
   }else if(type =="ENLEVEMENT"){
    return this.iconEnlevement;
   }else if(type =="ENLEVEMENT/LIVRAISON"){
    return this.iconEnlevementLivraison;
  }else{
     return this.iconDrive;
   }

 }

createLayer(){
// console.log(this.map);

// if(this.map ){
//   console.log("map");
//  this.map.eachLayer((layer) => {
//     layer.remove();
//   });
// this.map.off();
// this.map.remove();
// }






 this.map =  new L.Map('mapp').setView([ 31.942037500922847, -6.391733638504066 ],10)




// this.map = new  L.Map('map', {
//   center: [ 31.942037500922847, -6.391733638504066 ],
//   zoom: 10,
//   renderer: L.canvas()
// })

// this.mainLayer=L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
//     maxZoom: 8,
//     subdomains:['mt0','mt1','mt2','mt3']
// }).addTo(this.map);
//this.map = L.map('map', {});

 this.mainLayer= new L.TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(this.map);
console.log(this.map);

}

ngOnDestroy(): void {
  // Clean up resources here if needed
  if (this.map) {
    this.map.eachLayer((layer) => {
          layer.remove();
        });
   this.map.off();

    this.map.remove(); // Remove the map when the component is destroyed
  }

// if (this.mapContainer.nativeElement.hasChildNodes()) {
//     const existingMap = this.mapContainer.nativeElement.firstChild;
//     console.log(existingMap);

//     if (existingMap instanceof L.Map) {
//       existingMap.remove(); // Remove existing map
//     }
//   }
}


}
