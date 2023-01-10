import { TransportPlanService } from './../../../../shared/services/api/transport-plan.service';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { VehicleService } from './../../../../shared/services/api/vehicle.service';
import { VehicleCategory } from './../../../../shared/models/vehicle-category';
import { Vehicle } from './../../../../shared/models/vehicle';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-transport-plan-vehicle-list',
  templateUrl: './transport-plan-vehicle-list.component.html',
  styleUrls: ['./transport-plan-vehicle-list.component.scss']
})
export class TransportPlanVehicleListComponent implements OnInit {
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() selectedVehicule= new EventEmitter<Vehicle>();
   @Input() vehicleCategory = new VehicleCategory();
  vehicleList :Vehicle[]=[];
  vehicleAvailable: Vehicle[] = [];
  vehicleNotAvailable: Vehicle[] = [];
  showVehicleAvailable: Boolean = false;
  isFormSubmitted = false;
  displayDialog: boolean;
  title ="Véhicule";

  constructor(private vehicleService:VehicleService,
              private transportPlanService :TransportPlanService) { }

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
            this.vehicleList.forEach((vehicle) => {
              this.searchVehicleInTranportPlan(vehicle).subscribe((data) => {
   console.log(data);

                  vehicle.state = data;
                  this.onSearchVehicleAvailable();

              });

              // this.searchVehicleInMaintenance(vehicle).subscribe((data) => {
              //   if (vehicle.state == "Trajet") {
              //     vehicle.state += "-" + data;
              //   } else {
              //     vehicle.state = data;
              //   }
              //   this.onSearchVehicleAvailable();
              // });
            });
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
            2
        )
        .subscribe((data) => {
          console.log(vehicle.registrationNumber);
          console.log(data);

          if (data && data > 0) {
            state = "Trajet";
            subject.next(state);
          } else {
            state = "Disponible";
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
          (f) => f.state == "Disponible"
        );
      }
    }

    onSubmit(){

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
