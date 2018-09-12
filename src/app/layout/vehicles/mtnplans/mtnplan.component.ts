import { NgForm } from "@angular/forms";
import { Component, OnInit, Input } from "@angular/core";
import { MaintenancePlan } from "../../../shared/models";
import { MaintenancePlanService } from "../../../shared/services";
import { routerTransition } from "../../../router.animations";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
    selector: "app-mtnplan",
    templateUrl: "./mtnplan.component.html",
    styleUrls: ["./mtnplan.component.scss"],
    animations: [routerTransition()]
})
export class MtnPlanComponent implements OnInit {
    planList: Array<MaintenancePlan> = [];
    pageNumber = 1;
    pageSize = 20;
    collectionSize: number;
    search = "";

    constructor(
        private maintenancePlanService: MaintenancePlanService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private router: Router
    ) {
    }


    ngOnInit() {
        this.onPageChanged();
        this.maintenancePlanService.maintenancePlanListChanged.subscribe(data => {
            console.log("Data: ", data);
            this.planList = data;
        });
    }

    onPageChanged() {
        this.spinner.show();
        this.maintenancePlanService
            .size()
            .subscribe(data => (this.collectionSize = data));
        this.maintenancePlanService
            .findAllPagination(this.pageNumber - 1, this.pageSize)
            .subscribe(
                data => {
                    console.log("Data: ", data);
                    this.planList = data;
                    this.spinner.hide();
                },
                error => {
                    this.spinner.hide();
                    this.toastr.error("Erreur de connexion", "Erreur");
                }
            );
    }

    onSearchChanged(f: NgForm) {
        this.spinner.show();
        const driverCode = f.value["searchQuery"] as string;
        if (driverCode !== "") {
            this.search = "name~" + driverCode;
            this.onPageChanged();
        } else {
            this.search = "";
            this.onPageChanged();
        }
    }

    editPage(plan: MaintenancePlan) {
        this.router.navigate(["/mtnplans-edit"], {
            queryParams: { id: plan.id }
        });
    }
}
