import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { Vehicle, VehicleCategory, Traffic } from "../../../shared/models";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { BadgeType } from "../../../shared/models/badgeType";
import {
    BadgeTypeService,
    VehicleService,
    CategoryService
} from "../../../shared";

@Component({
    selector: "app-vehicle-edit",
    templateUrl: "./vehicle-edit.component.html",
    styleUrls: ["./vehicle-edit.component.scss"],
    providers: [CategoryService, BadgeTypeService]
})
export class VehicleEditComponent implements OnInit {
    closeResult: string;
    vehicleForm: FormGroup;
    trafficForm: FormGroup;
    isCollapsed = false;
    cardValid: string;
    @Input()
    selectedVehicle: Vehicle;
    @Input()
    editMode: boolean;

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
        private toastr: ToastrService
    ) {}

    async ngOnInit() {
        this.initForm();
        this.spinner.show();
        try {
            await Promise.all([
                this.loadCategories(),
                this.loadBadgeTypes()
            ]);
        } catch (error) {
            this.toastr.error("Erreur de connexion", "Erreur");
        }
        this.spinner.hide();
    }

    loadCategories() {
        return new Promise((resolve, reject) => {
            this.categoryService.findAll().subscribe(
                data => {
                    console.log("Categorie: ", data);
                    this.categories = data;
                    resolve();
                },
                error => {
                    reject(error);
                }
            );
        });
    }

    loadBadgeTypes() {
        return new Promise((resolve, reject) => {
            this.badgeTypeService.findAll().subscribe(
                data => {
                    console.log("BadgeTypes: ", data);
                    this.badgeTypes = data;
                    resolve();
                },
                error => {
                    reject(error);
                }
            );
        });
    }

    initForm() {
        if (!this.editMode) {
            this.selectedVehicle = new Vehicle();
            // this.selectedDriver.deliveryAddress.country = 'Maroc';
        } else {
            /*console.log('Card number : ' );
            console.log(this.selectedDriver != null && this.selectedDriver.cards != null
             && this.selectedDriver.cards.length
            ? this.selectedDriver.cards[this.selectedDriver.cards.length - 1].code
            : 'null');*/
        }

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
    }

    private onSubmit() {}
}
