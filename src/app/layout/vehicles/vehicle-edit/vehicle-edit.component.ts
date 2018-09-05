import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { Vehicle, VehicleCategory, Traffic } from "../../../shared/models";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { BadgeType } from "../../../shared/models/badgeType";
import { ActivatedRoute, Router } from "@angular/router";
import {
    BadgeTypeService,
    VehicleService,
    CategoryService
} from "../../../shared";
import { DateAdapterService } from "../../../shared/services/dateAdapter.service";

@Component({
    selector: "app-vehicle-edit",
    templateUrl: "./vehicle-edit.component.html",
    styleUrls: ["./vehicle-edit.component.scss"],
    providers: [CategoryService, BadgeTypeService, DateAdapterService]
})
export class VehicleEditComponent implements OnInit {
    vehicleForm: FormGroup;
    trafficForm: FormGroup;
    formReady: boolean = false;
    selectedVehicle: Vehicle;
    currentCategory: VehicleCategory;
    currentTraffic: Traffic = new Traffic();
    currentBadgeType: BadgeType = new BadgeType();
    badgeTypes: Array<BadgeType> = [];
    categories: Array<VehicleCategory> = [];

    constructor(
        private vehicleService: VehicleService,
        private categoryService: CategoryService,
        private badgeTypeService: BadgeTypeService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private dateAdapter: DateAdapterService
    ) {}

    async ngOnInit() {
        this.spinner.show();
        await this.makeCurrentVehicle();
        try {
            await Promise.all([this.loadCategories(), this.loadBadgeTypes()]);
        } catch (error) {
            this.toastr.error("Erreur de connexion", "Erreur");
        }
        this.initForm();
        this.spinner.hide();
    }

    async makeCurrentVehicle() {
        let params = await this.getRouteQueries();
        console.log("params :", params);
        let id = Number(params["id"]);
        console.log("id :", id);
        if (isNaN(id)) {
            this.selectedVehicle = null;
        } else {
            let vehicles = await this.vehicleService.findAll().toPromise();
            this.selectedVehicle = vehicles.find(d => d.id === id);
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

    async loadCategories() {
        this.categories = await this.categoryService.findAll().toPromise();
        console.log("this.categories :", this.categories);
        this.currentCategory = this.categories[0] || new VehicleCategory();
    }

    async loadBadgeTypes() {
        this.badgeTypes = await this.badgeTypeService.findAll().toPromise();
        console.log("this.badgeTypeService :", this.badgeTypeService);
        this.currentBadgeType = this.badgeTypes[0] || new BadgeType();
    }

    initForm() {
        this.vehicleForm = new FormGroup({
            registrationNumber: new FormControl(
                !!this.selectedVehicle
                    ? this.selectedVehicle.registrationNumber
                    : ""
            ),
            technicalVisit: new FormControl(
                !!this.selectedVehicle
                    ? this.selectedVehicle.technicalVisit
                    : ""
            ),
            traffic: new FormGroup({
                active: new FormControl(this.currentTraffic.active),
                date: new FormControl(this.currentTraffic.date)
            })
        });
        this.formReady = true;
    }

    private onSubmit() {
        let form = this.vehicleForm.value;
        console.log("form :", form);

        if (!this.selectedVehicle) {
            this.selectedVehicle = new Vehicle();
        }
        this.selectedVehicle.registrationNumber = form["registrationNumber"];
        this.selectedVehicle.technicalVisit = this.dateAdapter.toDate(
            form["technicalVisit"]
        );
        let traffic = new Traffic();
        traffic.active = form["traffic"]["active"] === "true";
        traffic.date = this.dateAdapter.toDate(form["traffic"]["date"]);
        this.selectedVehicle.drivingLicence = traffic;
        this.selectedVehicle.vehicleCategory = this.currentCategory;
        this.selectedVehicle.badgeType = this.currentBadgeType;
        this.selectedVehicle.upDateDate = new Date(Date.now());

        console.log('this.currentBadgeType :', this.currentBadgeType);
        console.log('this.currentCategory :', this.currentCategory);
        console.log('this.selectedVehicle :', this.selectedVehicle);
        this.vehicleService.set(this.selectedVehicle);
    }
}
