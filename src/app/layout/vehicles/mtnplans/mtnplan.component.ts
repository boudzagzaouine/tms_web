import { Component, OnInit, Input } from "@angular/core";
import { MaintenancePlan } from "../../../shared/models";
import { MaintenancePlanService } from "../../../shared/services";
import { routerTransition } from "../../../router.animations";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-mtnplan",
    templateUrl: "./mtnplan.component.html",
    styleUrls: ["./mtnplan.component.scss"],
    animations: [routerTransition()]
})
export class MtnPlanComponent implements OnInit {
    planList: Array<MaintenancePlan>;
    editMode: [number, boolean];

    constructor(
        private maintenancePlanService: MaintenancePlanService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) {
        this.planList = [];
        this.editMode = [ 0, false ];
    }

    ngOnInit() {
        this.spinner.show();
        this.maintenancePlanService.findAll().subscribe(
            data => {
                console.log("MtnPlan Data: ", data);
                this.planList = data;
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
            this.planList = data;
        });
    }
}
