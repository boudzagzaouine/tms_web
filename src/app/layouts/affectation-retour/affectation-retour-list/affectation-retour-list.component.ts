import { ZoneVille } from './../../../shared/models/zone-ville';
import { ZoneVilleService } from './../../../shared/services/api/zone-ville.service';
import { Agency } from './../../../shared/models/agency';
import { AuthenticationService } from './../../../shared/services/api/authentication.service';
import { Ville } from './../../../shared/models/ville';
import { TransportPlan } from './../../../shared/models/transport-plan';
import { TransportPlanService } from './../../../shared/services/api/transport-plan.service';
import { Component, OnInit } from '@angular/core';
import { AgencyService } from './../../../shared/services/api/agency.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-affectation-retour-list',
  templateUrl: './affectation-retour-list.component.html',
  styleUrls: ['./affectation-retour-list.component.scss']
})
export class AffectationRetourListComponent implements OnInit {

  transportPlanList:TransportPlan[]=[];
  villeList:Ville[]=[];
  selectAgency:Agency=new Agency();
  constructor(private transportPlanService:TransportPlanService,
              private agencyService:AgencyService,
              private authenticationService:AuthenticationService,
              private zonerVilleService:ZoneVilleService,
              private router :Router) { }

  ngOnInit() {

this.getAgencyByUser();
console.log("ng on init");

  }

  affectedTransport(){

    this.router.navigate(['/core/order-transport/edit']);

  }

  loadData(villes:string){
 console.log("Buffer");
 console.log(villes);


    this.transportPlanService.find('transport.interneOrExterne:true,turnStatus.id!2;3;4,orderTransport.turnType.id:1,trajet.villeDestination.id:'+villes).subscribe(
      data=>{
        this.transportPlanList=data;
        console.log(this.transportPlanList);

      }
    );

  }
  getAgencyByUser(){
this.agencyService.find('responsable.id:'+this.authenticationService.getCurrentUser().id).subscribe(
  data=>{
    console.log(" data agence");
console.log(data);

    if(data[0]){
      console.log("existe agency");

 this.selectAgency=data[0];
 if(this.selectAgency.zone.id>0){
  console.log("existe zone ");

  this.getZoneVille(this.selectAgency)
 }
    }
  }
);

  }
  getZoneVille(agency:Agency){
 this.zonerVilleService.find('id:'+agency.id).subscribe(
  data=>{
if(data[0]){
  console.log("exite zone ville ");

  this.villeList=data.map(m=>m.ville);
  if(this.villeList[0]){
    console.log("exite ville ");
console.log(this.villeList);

    let buffer = '';
    this.villeList.forEach(ville => {
      if (buffer.length > 0) {
        buffer += ';';
    }
    buffer += ville.id;
    });
this.loadData(buffer);
  }
}
  }
 );
  }



}
