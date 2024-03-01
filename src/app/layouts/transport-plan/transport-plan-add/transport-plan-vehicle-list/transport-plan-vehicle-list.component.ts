import { TransportPlan } from './../../../../shared/models/transport-plan';
import { TransportPlanLocationService } from './../../../../shared/services/api/transport-plan-location.service';
import { OrderTransportInfoLineService } from './../../../../shared/services/api/order-transport-info-line.service';
import { OrderTransportInfoLine } from './../../../../shared/models/order-transport-info-line';
import { TransportPlanService } from './../../../../shared/services/api/transport-plan.service';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { VehicleService } from './../../../../shared/services/api/vehicle.service';
import { VehicleCategory } from './../../../../shared/models/vehicle-category';
import { Vehicle } from './../../../../shared/models/vehicle';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OrderTransport } from './../../../../shared/models/order-transport';

@Component({
  selector: 'app-transport-plan-vehicle-list',
  templateUrl: './transport-plan-vehicle-list.component.html',
  styleUrls: ['./transport-plan-vehicle-list.component.scss']
})
export class TransportPlanVehicleListComponent implements OnInit {
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() selectedVehicule= new EventEmitter<Vehicle>();
   @Input() vehicleCategory = new VehicleCategory();
   @Input() dateOt=new Date();
  vehicleList :Vehicle[]=[];
  vehicleAvailable: Vehicle[] = [];
  vehicleNotAvailable: Vehicle[] = [];
  showVehicleAvailable: Boolean = false;
  isFormSubmitted = false;
  displayDialog: boolean;
  title ="Véhicule";

  constructor(private vehicleService:VehicleService,
              private transportPlanService :TransportPlanService,
              private orderTransportInfoLineService:OrderTransportInfoLineService,
              private transportPlanLocationService:TransportPlanLocationService) { }

  ngOnInit() {
    this.loadVehicleByCategory();
    this.displayDialog=true;
  }
    // Disponibilite de vehicule
    loadVehicleByCategory() {
      this.vehicleService
        .find(
          "vehicleCategory.tonnage>" +
            this.vehicleCategory.tonnage
        )
        .subscribe((data) => {
          if (data[0] != null || data[0] != undefined) {
            this.vehicleList = data;
  this.disponible();
//             this.vehicleList.forEach((vehicle) => {
//               this.searchVehicleInTranportPlan(vehicle).subscribe((data) => {
//    console.log(data);

//                   vehicle.state = data;


//                   this.searchLastCityByVehicle(vehicle).subscribe((last) => {
//                     console.log(last);
// console.log("ddddddddddddddddddddddd");

//                                    vehicle.lastCity = last?last:"";





//                                    this.onSearchVehicleAvailable();

//                                });



//               });

//               // this.searchVehicleInMaintenance(vehicle).subscribe((data) => {
//               //   if (vehicle.state == "Trajet") {
//               //     vehicle.state += "-" + data;
//               //   } else {
//               //     vehicle.state = data;
//               //   }
//               //   this.onSearchVehicleAvailable();
//               // });
//             });
          } else {
            this.vehicleList = [];
          }
        });
    }

    searchVehicleInTranportPlan(vehicle: Vehicle): Observable<string> {
      let state: string = "Disponible";
      var subject = new Subject<string>();
      this.transportPlanService
        .sizeSearch(
          "vehicle.registrationNumber:" +
            vehicle.registrationNumber +
            ",turnStatus.id!" +
            3+';'+4
        )
        .subscribe((data) => {
          console.log(vehicle.registrationNumber);
          console.log(data);

          if (data && data > 0) {
            state = "Trajet";
            subject.next(state);
          }
          // else {
          //   state = "Disponible";
          //   subject.next(state);
          // }
        });
      return subject.asObservable();
    }
    searchLastCityByVehicle(vehicle: Vehicle): Observable<string> {
      let state: string = "";
      var subject = new Subject<string>();
      this.transportPlanService
        .find(
          "vehicle.registrationNumber:" +
            vehicle.registrationNumber +
            ",turnStatus.id!" +
            1+';'+4
        )
        .subscribe((data) => {
         console.log("-----last----");

console.log(data);


          if (data[0] ) {
            state = data.sort(
              (n1, n2) => n2.dateDepart - n1.dateDepart
            )[0].trajet?.villeDestination?.code;
            subject.next(state);
          }
        });
      return subject.asObservable();
    }
    onSearchVehicleAvailable() {
      console.log(this.showVehicleAvailable);
      if (this.showVehicleAvailable == true) {
        this.vehicleAvailable = this.vehicleList;
      } else {
        this.vehicleAvailable = this.vehicleList.filter(
          (f) => f.disponible == 4
        );
      }
    }

    onSubmit(){

    }




disponible(){
  this.vehicleAvailable = this.vehicleList.filter(
    (f) => f.disponible == 4
  );
}

indisponible(){
  this.vehicleAvailable = this.vehicleList.filter(
    (f) => f.disponible != 4
  );
}

    onSelectVehicle(event){
console.log(event);
this.selectedVehicule.emit(event);
this.onHideDialog();
    }
    onHideDialog(){
      const a = false;
      this.showDialog.emit(a);
      this.displayDialog = false;

    }


}
