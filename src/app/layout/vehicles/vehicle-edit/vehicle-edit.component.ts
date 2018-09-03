import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { Vehicle, VehicleCategory, DoorType, Traffic } from "../../../shared/models";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { VehicleService } from "../../../shared/services/http/vehicle.service";
import { CategoryService } from "../../../shared/services/http/category.service";
import { TrafficService } from "../../../shared/services/http/traffic.service";
import { TrafficEditComponent } from "../traffic-edit/traffic-edit.component";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { DriverEditComponent } from "../../drivers/driver-edit/driver-edit.component";
import { BadgeType } from "../../../shared/models/badgeType";

@Component({
    selector: "app-vehicle-edit",
    templateUrl: "./vehicle-edit.component.html",
    styleUrls: ["./vehicle-edit.component.scss"],
    providers: [CategoryService]
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

    category:VehicleCategory;
    vehicles:Array<Vehicle>=[];
    currentTraffic:Traffic = new Traffic();
    currentBadgeType:BadgeType = new BadgeType();

    badgeTypes: Array<BadgeType> = [];
    categories: Array<VehicleCategory> = [];

    constructor(
        private vehicleService: VehicleService,
        private categoryService: CategoryService,
        private modalService: NgbModal,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.spinner.show();
        this.vehicleService.findAll().subscribe(
            data => {
                console.log("Categorie: ", data);
                this.vehicles = data;
                this.spinner.hide();
            },
            error => {
                this.spinner.hide();
                this.toastr.error("Erreur de connexion", "Erreur");
            }
        );
        this.initForm();
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
                !!this.selectedVehicle ? this.selectedVehicle.registrationNumber : ""
            ),
            technicalVisit: new FormControl(
                !!this.selectedVehicle ? this.selectedVehicle.technicalVisit: ""
            ),
            traffic: new FormGroup({
                active: new FormControl(
                    this.currentTraffic.active
                ),
                date: new FormControl(
                    this.currentTraffic.date
                )
            })
        });

    }

    private onSubmit() {
        /*if (!this.editMode) {

            this.selectedDriver = new Driver();

            this.selectedDriver.contact = new Contact();

            this.selectedDriver.deliveryAddress = new Address();

        } else {
            if (this.selectedDriver.deliveryAddress == null) {

                this.selectedDriver.deliveryAddress = new Address();
            }
            if (this.selectedDriver.contact == null) {

                this.selectedDriver.contact = new Contact();
            }
        }

        this.selectedDriver.code = this.driverForm.value['code'];
        this.selectedDriver.name = this.driverForm.value['name'];
       // this.selectedDriver.email = this.driverForm.value['mail'];
        this.selectedDriver.active = this.driverForm.value['active'];
        this.selectedDriver.contact.email = this.driverForm.value['contact']['contactEmail'];
        this.selectedDriver.contact.tel1 = this.driverForm.value['contact']['contactTel'];
        this.selectedDriver.deliveryAddress.line1 = this.driverForm.value['address']['addressLine1'];
        this.selectedDriver.deliveryAddress.line2 = this.driverForm.value['address']['addressLine2'];
        this.selectedDriver.deliveryAddress.zip = this.driverForm.value['address']['addressZip'];
        this.selectedDriver.deliveryAddress.city = this.driverForm.value['address']['addressCity'];
        this.selectedDriver.deliveryAddress.country = this.driverForm.value['address']['addressCountry'];
        console.log(this.driverForm.value['contact']['contactEmail']);
        if (!this.editMode) {
            this.selectedDriver.contact.name = this.selectedDriver.name;
            this.selectedDriver.contact.surName = this.selectedDriver.name;
            this.selectedDriver.deliveryAddress.code =  this.selectedDriver.deliveryAddress.city +  (new Date()).getMilliseconds();
        }
            this.driverService.add(this.selectedDriver);*/
    }

    addVehicle() {
        const vehicle = new Vehicle();
        vehicle.id = 0;
        vehicle.registrationNumber = "Nouveau vehicule";
        this.vehicles.push(vehicle);
        console.log("vehicule :", vehicle);
    }

    public addTraffic() {
        let traffic = new Traffic();
        traffic.active.valueOf.toString +"Nouveau";
    }

    private openBadgeModal(traffic) {
        let modal = this.modalService.open(TrafficEditComponent, {
            centered: true,
            backdrop: true
        });
        modal.result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    public selectTraffic(traffic:Traffic) {
        if (traffic) {
            this.currentTraffic =traffic;
        }
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return "by pressing ESC";
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return "by clicking on a backdrop";
        } else {
            return `with: ${reason}`;
        }
    }

    edit(vehicle) {
        this.editMode[vehicle.id] = true;
    }

    save(vehicle) {
        this.vehicleService.set(vehicle);
        this.editMode[vehicle.id] = false;
    }

    delete(vehicle) {
        this.vehicleService.delete(vehicle);
    }
}
