import { Component, OnInit, Input } from "@angular/core";
import { MaintenancePlan } from "../../../shared/models";
import { MaintenancePlanService} from "../../../shared/services/http/maintenancePlan.service";
import { routerTransition } from "../../../router.animations";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-maintenancePlan",
    templateUrl: "./maintenancePlan.component.html",
    styleUrls: ["./maintenancePlan.component.scss"],
    animations: [routerTransition()]
})
export class MaintenancePlanComponent implements OnInit {
    maintenanceplans: Array<MaintenancePlan>;
    editMode: [number, boolean];

    constructor(
        private maintenancePlanService: MaintenancePlanService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) {
        this.maintenanceplans = [];
        this.editMode = [ 0, false ];
    }

    ngOnInit() {
        this.spinner.show();
        this.maintenancePlanService.findAll().subscribe(
            data => {
                console.log("Zones Data: ", data);
                this.maintenanceplans = data;
                this.spinner.hide();
            },
            error => {
                console.log("error :", error);
                this.spinner.hide();
                this.toastr.error("Erreur de connexion", "Erreur");
            }
        );
        this.maintenancePlanService.maintenancePlanListChanged.subscribe(data => {
            console.log("Data: ", data);
            this.maintenanceplans = data;
        });
    }

    addMaintenancePlan() {
        const maintenancePlan = new MaintenancePlan();
        maintenancePlan.id = 0;
        this.maintenanceplans.push(maintenancePlan);
        console.log("categorie :", maintenancePlan);
    }

    edit(maintenancePlan) {
        this.editMode[maintenancePlan.id] = true;
    }

    save(maintenancePlan) {
        this.maintenancePlanService.set(maintenancePlan);
        this.editMode[maintenancePlan.id] = false;
    }

    delete(catgeory) {
        this.maintenancePlanService.delete(catgeory);
    }
}
