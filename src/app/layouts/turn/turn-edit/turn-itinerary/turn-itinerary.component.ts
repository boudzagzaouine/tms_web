import { Itinerary } from './../../../../shared/models/Itinerairy';
import { TurnSoPo } from './../../../../shared/models/turn-so-po';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit, Input } from '@angular/core';
import  * as L  from 'leaflet';
import 'leaflet-routing-machine';
import { Icon, icon, Marker } from "leaflet";
@Component({
  selector: 'app-turn-itinerary',
  templateUrl: './turn-itinerary.component.html',
  styleUrls: ['./turn-itinerary.component.scss']
})
export class TurnItineraryComponent implements OnInit,AfterViewInit {

  @Output() showDialog = new EventEmitter<boolean>();
  @Input () turnSoList: Array<TurnSoPo> = [];
  displayDialog: boolean;
  itinerary :Itinerary= new Itinerary();
  itineraries : Array<Itinerary>=[];
  map:any;
  mainLayer:any;

 distance:any;
  time:string;
  heur :any ;
  minute : any ;


 private defaultIcon: Icon = icon({
   iconUrl: "./assets/img/markerWarehouse.png",
      iconSize:    [40, 40],
 });

 private defaultIcon2: Icon = icon({
   iconUrl: "./assets/img/markerWarehouse3.png",
      iconSize:    [40, 40],
 });

 display: boolean = false;
  constructor() { }


  ngOnInit() {
    this.displayDialog = true;

    this.itinerary= new Itinerary();
    this.itinerary.lat=34.03149;
    this.itinerary.lon=-5.00924;
    this.itinerary.description="depot";
    this.itinerary.type="depot";
    this.itineraries.push(this.itinerary);



    this.turnSoList.forEach(so => {
     this.itinerary= new Itinerary();
     this.itinerary.lat= so.saleOrder.deliveryAddress.latitude;
     this.itinerary.lon=so.saleOrder.deliveryAddress.longitude;
     this.itinerary.description=so.saleOrder.account.name;
     this.itineraries.push(this.itinerary);
    });

 }

 ngAfterViewInit(){
  Marker.prototype.options.icon = this.defaultIcon;
  this.createLayer();
    this.createRoute();
 }



 createRoute() {
   const  dis = null;
   var split_route1:L.LatLng[]=[];

 this.itineraries.forEach(element => {
          split_route1.push(new L.LatLng(element.lat ,  element.lon,0 ));
 });

  var route= L.Routing.control({
     routeWhileDragging: true,
     addWaypoints: false,

     waypoints: split_route1,

 }).on('routesfound',(e)=>{
   console.log(e);
 this.distance=e.routes[0].summary.totalDistance/1000 as number;
 this.time= (e.routes[0].summary.totalTime/3600).toString();
 this.heur=  this.time.split('.',2)[0];
 this.minute=this.time.split('.',2)[1].substring(0,2);



 new Date()
 }
 ).addTo(this.map).hide();
this.map.dragging.disable();

 for (var i in this.itineraries) {
   L.marker(L.latLng(this.itineraries[i].lat, this.itineraries[i].lon), {
     title: this.itineraries[i].description,
     icon: this.itineraries[i].type=="depot" ?this.defaultIcon2 :this.defaultIcon
   }).addTo(this.map).bindPopup("<b>" + this.itineraries[i].description + "</b>").openPopup();
 }
   this.mainLayer.addTo(this.map);

 // this.recuperateDistance();
 }

 createLayer(){
   this.mainLayer =L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
     maxZoom: 20,
     subdomains:['mt0','mt1','mt2','mt3']
 });
 this.map = L.map('map', {});

 }

 recuperateDistance(){
   L.Routing.control({
     addWaypoints: false,
     routeWhileDragging: false,
          waypoints: [
         L.latLng(33.92296, -6.42224),

     ],
   }).addTo(this.map).hide();
 }
  onHideDialog() {
    const a = false;
    this.showDialog.emit(a);
    this.displayDialog = false;

  }

}
