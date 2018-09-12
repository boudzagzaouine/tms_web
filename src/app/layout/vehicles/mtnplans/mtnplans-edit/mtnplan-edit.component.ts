import { Component, OnInit, Input } from "@angular/core";
import {
    Vehicle,
    MaintenanceState,
    TypeMaintenance,
    MaintenancePlan
} from "../../../../shared/models";
import {
    MaintenancePlanService,
    VehicleService,
    MaintenanceStateService,
    TypeMaintenanceService,
    DateAdapterService
} from "../../../../shared/services";
import { routerTransition } from "../../../../router.animations";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-mtnplan",
    templateUrl: "./mtnplan-edit.component.html",
    styleUrls: ["./mtnplan-edit.component.scss"],
    animations: [routerTransition()],
    providers: [
        MaintenancePlanService,
        MaintenanceStateService,
        TypeMaintenanceService,
        VehicleService,
        DateAdapterService
    ]
})
export class MtnPlanEditComponent implements OnInit {
    editMode: boolean;
    selectedPlan: MaintenancePlan;
    planForm: FormGroup;
    formReady: boolean = false;

    currentState: MaintenanceState;
    states: Array<MaintenanceState> = [];
    currentVehicle: Vehicle;
    vehicles: Array<Vehicle> = [];
    currentType: TypeMaintenance;
    types: Array<TypeMaintenance> = [];

    constructor(
        private planService: MaintenancePlanService,
        private stateService: MaintenanceStateService,
        private typeService: TypeMaintenanceService,
        private vehicleService: VehicleService,
        private dateAdapter: DateAdapterService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    async ngOnInit() {
        this.spinner.show();
        await this.makeCurrentPlan();
        try {
            await Promise.all([
                this.loadStates(),
                this.loadVehicles(),
                this.loadTypes()
            ]);
        } catch (error) {
            this.toastr.error("Erreur de connexion", "Erreur");
        }
        this.initForm();
        this.formReady = true;
        this.spinner.hide();
    }

    async makeCurrentPlan() {
        let params = await this.getRouteQueries();
        console.log("params :", params);
        let id = Number(params["id"]);
        console.log("id :", id);
        if (isNaN(id)) {
            this.selectedPlan = null;
        } else {
            let plans = await this.planService.findAll().toPromise();
            this.selectedPlan = plans.find(d => d.id === id);
        }
    }

    getRouteQueries() {
        return new Promise((resolve, reject) => {
            this.route.queryParams.subscribe(
                params => {
                    resolve(params);
                },
                error => reject(error)
            );
        });
    }

    async loadStates() {
        this.states = await this.stateService.findAll().toPromise();
        console.log("this.states :", this.states);
        this.currentState = this.states[0] || new MaintenanceState();
    }

    async loadTypes() {
        this.types = await this.typeService.findAll().toPromise();
        console.log("this.types :", this.types);
        this.currentType = this.types[0] || new TypeMaintenance();
    }

    async loadVehicles() {
        this.vehicles = await this.vehicleService.findAll().toPromise();
        console.log("this.vehicles :", this.vehicles);
        this.currentVehicle = this.vehicles[0] || new Vehicle();
    }

    initForm() {
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

    private onSubmit() {
        let form = this.planForm.value;
        console.log("form :", form);

        if (!this.selectedPlan) {
            this.selectedPlan = new MaintenancePlan();
        }

        for (const prop of ["code", "descriptif", "title"]) {
            this.selectedPlan[prop] = form[prop];
        }
        this.selectedPlan.state = this.currentState;
        this.selectedPlan.vehicle = this.currentVehicle;
        this.selectedPlan.typeMaintenance = this.currentType;
        this.selectedPlan.upDateDate = new Date(Date.now());
        this.selectedPlan.date = this.dateAdapter.toDate(form["date"]);

        console.log("this.selectedPlan :", this.selectedPlan);
        this.planService.set(this.selectedPlan);
    }
}
