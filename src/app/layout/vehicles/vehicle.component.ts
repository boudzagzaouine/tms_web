import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { VehicleService } from "../../shared/services/http/vehicle.service";
import { routerTransition } from "../../router.animations";
import { Vehicle } from "../../shared";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
    selector: "app-vehicle",
    templateUrl: "./vehicle.component.html",
    styleUrls: ["./vehicle.component.scss"],
    animations: [routerTransition()]
})
export class VehicleComponent implements OnInit {
    vehiclesList: Vehicle[];
    pageNumber = 1;
    pageSize = 20;
    collectionSize: number;
    search = "";
    constructor(
        private vehicleService: VehicleService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.onPageChanged();
        this.vehicleService.driverListChanged.subscribe(data => {
            console.log("Data: ", data);
            this.vehiclesList = data;
        });
    }
    onPageChanged() {
        this.spinner.show();
        this.vehicleService
            .size()
            .subscribe(data => (this.collectionSize = data));
        this.vehicleService
            .findAllPagination(this.pageNumber - 1, this.pageSize)
            .subscribe(
                data => {
                    console.log("Data: ", data);
                    this.vehiclesList = data;
                    this.spinner.hide();
                },
                error => {
                    this.spinner.hide();
                    this.toastr.error("Erreur de connexion", "Erreur");
                }
            );
    }

    delete(vehicle: Vehicle) {
        console.log("Vehicle deleted : " + vehicle.code);
        if (confirm("Êtes vous sûr de vouloir supprimer ?")) {
            this.vehicleService.delete(vehicle);
        }
    }

    onSearchChanged(f: NgForm) {
        this.spinner.show();
        const driverCode = f.value["searchQuary"] as string;
        if (driverCode !== "") {
            this.search = "name~" + driverCode;
            this.onPageChanged();
        } else {
            this.search = "";
            this.onPageChanged();
        }
    }
}
