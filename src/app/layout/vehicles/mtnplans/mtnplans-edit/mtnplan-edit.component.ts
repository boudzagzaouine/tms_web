import { Component, OnInit, Input } from "@angular/core";
import {
    VehicleCategory,
    MaintenanceState,
    TypeMaintenance
} from "../../../../shared/models";
import { MaintenancePlanService } from "../../../../shared/services/http";
import { routerTransition } from "../../../../router.animations";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { FormControl, FormGroup, NgForm } from "@angular/forms";

@Component({
    selector: "app-mtnplan",
    templateUrl: "./mtnplan-edit.component.html",
    styleUrls: ["./mtnplan-edit.component.scss"],
    animations: [routerTransition()]
})
export class MtnPlanEditComponent implements OnInit {
    editMode: boolean;
    selectedPlan: VehicleCategory;
    planForm: FormGroup;

    currentState: MaintenanceState;
    states: Array<MaintenanceState> = [];
    currentType: TypeMaintenance;
    types: Array<TypeMaintenance> = [];

    constructor(
        private planService: MaintenancePlanService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        if (!this.editMode) {
            this.selectedPlan = new VehicleCategory();
            // this.selectedDriver.deliveryAddress.country = 'Maroc';
        } else {
            /*console.log('Card number : ' );
            console.log(this.selectedDriver != null && this.selectedDriver.cards != null
             && this.selectedDriver.cards.length
            ? this.selectedDriver.cards[this.selectedDriver.cards.length - 1].code
            : 'null');*/
        }

        this.planForm = new FormGroup({
            code: new FormControl(
                !!this.selectedPlan ? this.selectedPlan.code : ""
            ),
            descriptif: new FormControl(
                !!this.selectedPlan ? this.selectedPlan.descriptif : ""
            ),
            date: new FormControl(
                !!this.selectedPlan ? this.selectedPlan.date : ""
            ),
            title: new FormControl(
                !!this.selectedPlan ? this.selectedPlan.title : ""
            )
        });
    }

    private onSubmit() {}
}
